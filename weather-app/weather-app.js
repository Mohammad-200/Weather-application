const apiKey = "4642c14719f4cf579a9dd6c1dadd4260";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;


const inputEl = document.getElementById("input");
const searchEl = document.getElementById("search-img");
const cityEl = document.querySelector(".city");
const weatherEl = document.querySelector(".weather-temp");
const humidityEl = document.getElementById("humidity-num");
const windSpeedEl = document.getElementById("wind-speed");
const weatherImageEl = document.getElementById("weather-image");


searchEl.addEventListener("click", () => {
  const city = inputEl.value;
  checkWeather(city);
});

inputEl.addEventListener('keypress', (event) => {
    if(event.key === "Enter") {
        const city = inputEl.value;

        checkWeather(city);
    }
})

async function checkWeather(city) {
   document.querySelector(".weather").style.display = "block";
  try {
    const response = await fetch(apiUrl + city);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();
    console.log(data);

    cityEl.innerHTML = data.name;
    weatherEl.innerHTML = Math.round(data.main.temp) + "°C";
    humidityEl.innerHTML = data.main.humidity + "%";
    windSpeedEl.innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main === "Clouds") {
      weatherImageEl.src = "./images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherImageEl.src = "./images/clear.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherImageEl.src = "./images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherImageEl.src = "./images/mist.png";
    } else if (data.weather[0].main === "Rain") {
      weatherImageEl.src = "./images/rain.png";
    } else if (data.weather[0].main === "Wind") {
      weatherImageEl.src = "./images/wind.png";
    } else if (data.weather[0].main === "Snow") {
      weatherImageEl.src = "./images/snow.png";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}








