// DOM HOOKS
const temp = document.querySelector('.temp')
const switchBtn = document.querySelector('.switch')
const img = document.querySelector('img')
const tempfeel = document.querySelector('.tempfeel')
const city = document.querySelector('.city')
const country = document.querySelector('.country')
const wind = document.querySelector('.wind')
const uv = document.querySelector('.uv')
const rain = document.querySelector('.rain')
const humidity = document.querySelector('.humid')
const input = document.querySelector('#search')
const searchBtn = document.querySelector('#searchBtn')
const errorMsg = document.querySelector('.errorMsg')

const cel = document.querySelector('.cel')
const far = document.querySelector('.far')

// Fetch object containing weather info



let defaultCountry = 'Madagascar'

const weatherInfo = async ()=>{
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=94ad843ccb4048b4a4e103723233103&q=${defaultCountry}`)
        const weatherData = await response.json();
        return weatherData
        
        
    } catch (error){
        errorMsg.textContent = 'No results found.'
    }
}



let defmet = 'celcius'

switchBtn.addEventListener('click', () =>{
    isCelcius()
    displayData.update()
})

const isCelcius = ()=>{
    if(defmet == 'celcius'){
        defmet = 'far'
        
    } else{
        defmet = 'celcius'
        
    }
    cel.classList.toggle('active')
    far.classList.toggle('active')
    
}


// Synthesis data

const displayData = (()=>{
    const update = async ()=>{
        const allWeatherData = await weatherInfo()
        console.log(allWeatherData)
        img.src = allWeatherData.current.condition.icon
        temp.textContent = defmet == 'celcius' ? allWeatherData.current.temp_c+"°C" : allWeatherData.current.temp_f+"°F"
        tempfeel.textContent = `Feels like ${defmet == `celcius` ? allWeatherData.current.feelslike_c+`°C ` : allWeatherData.current.feelslike_f+`°F `} | ${allWeatherData.current.condition.text}`
        city.textContent = allWeatherData.location.name+','
        country.textContent = allWeatherData.location.country
        wind.textContent = `${defmet == 'celcius' ? allWeatherData.current.wind_kph+' km/h': allWeatherData.current.wind_mph+' mp/h'}`
        uv.textContent = allWeatherData.current.uv
        rain.textContent = `${defmet == 'celcius' ? allWeatherData.current.precip_mm+' mm' : allWeatherData.current.precip_in+' in'}`
        humidity.textContent = allWeatherData.current.humidity+" %"
    }   
    return {update}
}
)();

// Search bar

function executeSearch (){
    if(!input.value == ''){
        if(!(input.value.length < 3)){
            defaultCountry = input.value
            console.log(defaultCountry)
            changeBackground();
            displayData.update();
            errorMsg.textContent = ""
            input.value = ""
            
        } else{
            errorMsg.textContent = "Your search needs to be longer than 3 characters."
        }
        

    } else {errorMsg.textContent = "You can't leave the search bar empty"}
}

searchBtn.addEventListener('click', executeSearch)

document.addEventListener('keydown', event =>{
    event.key === 'Enter' ? executeSearch() : null;
})

function changeBackground() {
    var colors = ['#f9c5d1',
    '#f0e2c0',
    '#d3e0dc',
    '#ede6e3',
    '#ffeedf',
    '#f9dcc4',
    '#c7ceea',
    '#f4e8c1',
    '#d4afcd',
    '#c5d6d8'];
    var randomIndex = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor = colors[randomIndex];
  }
changeBackground();
  

displayData.update();
