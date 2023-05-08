const apiKey = "636f30d60f77dc2fce33af4e7e4be986"; // replace with your API key

const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const pollutionDisplay = document.querySelector('#weather');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const location = searchInput.value;

  // get lat and lon for the given location
  const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const locationResponse = await fetch(locationUrl);
  const locationData = await locationResponse.json();
  const lat = locationData[0].lat;
  const lon = locationData[0].lon;

  // get air pollution data for the given location
  const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const pollutionResponse = await fetch(pollutionUrl);
  const airPollutionData = await pollutionResponse.json();
  const co = airPollutionData.list[0].components.co;
  const no = airPollutionData.list[0].components.no;
  const no2 = airPollutionData.list[0].components.no2;
  const o3 = airPollutionData.list[0].components.o3;
  const so2 = airPollutionData.list[0].components.so2;
  const pm2_5 = airPollutionData.list[0].components.pm2_5;
  const pm10 = airPollutionData.list[0].components.pm10;

  // display the co value
  pollutionDisplay.innerHTML = 
  `<div class="container dataContainer">
    <div class="dataCard">
    <h2>Air Pollution Data</h2>
    <p>CO: ${co} µg/m³</p>
    <p>NO: ${no} µg/m³</p>
    <p>NO2: ${no2} µg/m³</p>
    <p>O3: ${o3} µg/m³</p>
    <p>SO2: ${so2} µg/m³</p>
    <p>PM2.5: ${pm2_5} µg/m³</p>
    <p>PM10: ${pm10} µg/m³</p>
    </div>
    <h1 class="tableh1">Air Quality Index</h1>
    <table>
      <thead>
        <tr>
          <th>Qualitative name</th>
          <th>Index</th>
          <th>SO2</th>
          <th>NO2</th>
          <th>PM10</th>
          <th>PM2.5</th>
          <th>O3</th>
          <th>CO</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Good</td>
          <td>1</td>
          <td>0-20</td>
          <td>0-40</td>
          <td>0-20</td>
          <td>0-10</td>
          <td>0-60</td>
          <td>0-4400</td>
        </tr>
        <tr>
          <td>Fair</td>
          <td>2</td>
          <td>20-80</td>
          <td>40-70</td>
          <td>20-50</td>
          <td>10-25</td>
          <td>60-100</td>
          <td>4400-9400</td>
        </tr>
        <tr>
          <td>Moderate</td>
          <td>3</td>
          <td>80-250</td>
          <td>70-150</td>
          <td>50-100</td>
          <td>25-50</td>
          <td>100-140</td>
          <td>9400-12400</td>
        </tr>
        <tr>
          <td>Poor</td>
          <td>4</td>
          <td>250-350</td>
          <td>150-200</td>
          <td>100-200</td>
          <td>50-75</td>
          <td>140-180</td>
          <td>12400-15400</td>
        </tr>
        <tr>
          <td>Very Poor</td>
          <td>5</td>
          <td>&gt;350</td>
          <td>&gt;200</td>
          <td>&gt;200</td>
          <td>&gt;75</td>
          <td>&gt;180</td>
          <td>&gt;15400</td>
        </tr>
      </tbody>
    </table>
  </div>`;
});
