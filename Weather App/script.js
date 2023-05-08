const apiKey = "636f30d60f77dc2fce33af4e7e4be986";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
  
const weatherUrl = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; 
const forecastUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${apiKey}`;

async function getWeatherByLocation(city){
     
    const resp = await fetch(weatherUrl(city), {
        origin: "cros" 
    });
    const respData = await resp.json();

    const forecastResp = await fetch(forecastUrl(respData.coord.lat, respData.coord.lon), {
        origin: "cros" 
    });
    const forecastData = await forecastResp.json();

    addWeatherToPage(respData, forecastData.hourly);
}

function addWeatherToPage(data, hourlyData){
    const temp = Ktoc(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
      <h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" />
        ${temp}°C
      </h2>
      <small>${data.weather[0].main}</small>
      <h4>Hourly Forecast</h4>
      <ul class="weather-list">
        ${hourlyData.map(item => `
          <li>
                  <div class="date">${formatDate(item.dt)}</div>
            <div class="time">${formatTime(item.dt)}</div>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" />
            <div class="temp">${Ktoc(item.temp)}°C</div>
            <div class="description">${item.weather[0].description}</div>
          </li>
        `).join('')}
      </ul>`;

    main.innerHTML= "";
    main.appendChild(weather);
};

function formatTime(timestamp) {
    const date = new Date(timestamp * 3000);
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  }  

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const dayNum = date.getDate();
    return `${day}, ${month} ${dayNum}`;
  }
  
function Ktoc(K){
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const city = search.value;

    if(city){
        getWeatherByLocation(city)
    }
}); 
