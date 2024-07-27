// // to get city name from a form
// const citySearch = document.querySelector('#city-search') 
// const result = document.querySelector('#result')
// let city = 'Vancouver'
// document.querySelector('#button').addEventListener('click', function() {
//   city.textContent = citySearch.value //city's name
// }, false)









async function getCity(city) {
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
  const data = await res.json()
  return data.results[0]
} 


async function getWeather(lat, lon) {
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`)
  const data = await res.json()
  return data
}

function buildHtml(city, weather) {
  const cityName = document.querySelector('.city-name')
  const temperature = document.querySelector('.city-temperature') 
  const country = document.querySelector('.country')
  const timezone = document.querySelector('.timezone')
  const population = document.querySelector('.population')
  const high = document.querySelector('.high')
  const low = document.querySelector('.low')
  const body = document.querySelector('body')
  const input = document.querySelectorAll('.input')
  const image = document.querySelector('.image-section')


  cityName.append(city.name)
  temperature.append(`${weather.current.temperature_2m} ${weather.current_units.temperature_2m}`)
  country.append(city.country)
  timezone.append(city.timezone)
  population.append(city.population)
  high.append(`High:${weather.daily.temperature_2m_max}${weather.current_units.temperature_2m} `)
  low.append(`Low:${weather.daily.temperature_2m_min}${weather.current_units.temperature_2m}`)
  if(weather.current.is_day === 0){
    body.classList.add('dark-mode')
    input.forEach(item => item.classList.add('dark-mode-input'))
    image.classList.add('dark-mode-image')
  }
  getWeather(lat, lon)
}







const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')
searchBtn.addEventListener('click', async () => {
  const city = await getCity(searchInput.value)
  const weather = await getWeather(city.latitude, city.longitude)
  console.log(weather)
  buildHtml(city, weather)
})



//%city
// {id: 6173331, name: 'Vancouver', latitude: 49.24966, longitude: -123.11934, elevation: 70, …}
// admin1
// : 
// "British Columbia"
// admin1_id
// : 
// 5909050
// admin2
// : 
// "Greater Vancouver Regional District"
// admin2_id
// : 
// 5965814
// country
// : 
// "Canada"
// country_code
// : 
// "CA"
// country_id
// : 
// 6251999
// elevation
// : 
// 70
// feature_code
// : 
// "PPL"
// id
// : 
// 6173331
// latitude
// : 
// 49.24966
// longitude
// : 
// -123.11934
// name
// : 
// "Vancouver"
// population
// : 
// 600000
// timezone
// : 
// "America/Vancouver"



//%weather
// app.js:54 
// {latitude: 49.242813, longitude: -123.105095, generationtime_ms: 0.03898143768310547, utc_offset_seconds: -25200, timezone: 'America/Vancouver', …}
// current
// : 
// {time: '2024-07-26T16:00', interval: 900, temperature_2m: 21.9, is_day: 1, rain: 0, …}
// current_units
// : 
// {time: 'iso8601', interval: 'seconds', temperature_2m: '°C', is_day: '', rain: 'mm', …}
// daily
// : 
// {time: Array(1), temperature_2m_max: Array(1), temperature_2m_min: Array(1)}
// daily_units
// : 
// {time: 'iso8601', temperature_2m_max: '°C', temperature_2m_min: '°C'}
// elevation
// : 
// 73
// generationtime_ms
// : 
// 0.03898143768310547
// latitude
// : 
// 49.242813
// longitude
// : 
// -123.105095
// timezone
// : 
// "America/Vancouver"
// timezone_abbreviation
// : 
// "PDT"
// utc_offset_seconds
// : 
// -25200

async function resetData() {
  const data = document.querySelector('.')
  data.reset()
}