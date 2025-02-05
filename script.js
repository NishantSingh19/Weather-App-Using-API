let input = document.getElementById("input");
let image = document.getElementById("img");
let description = document.getElementById("description");
let windSpeed = document.getElementById("windSpeed");
let humidity = document.getElementById("humidity");
let search = document.querySelector(".fa-solid");
let temperature = document.querySelector("#temperature");
let city = document.querySelector("#location");

const apiKey = `7c913ce734c7db3538d8f8ab20f52a97`;

function getWeather() {
  if (input.value == "") {
    input.style.border = "2px solid red";
    input.style.transition = "border 0.25s";
    input.placeholder = "Please enter city name";
    setTimeout(() => {
      input.style.border = "none";
      input.placeholder = "Enter City Name";
    }, 2000);
  } else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        city.innerHTML = `<i class="fa-solid fa-location-dot"></i>${data.name}`;
        temperature.innerHTML = `<i class="fa-solid fa-temperature-half"></i>${(
          data.main.temp - 273
        ).toFixed(1)} °C`;
        windSpeed.innerHTML = `<i class="fa-solid fa-wind"></i>${data.wind.speed} Km/h <span>Wind Speed</span>`;
        humidity.innerHTML = `<i class="fa-solid fa-droplet"></i>${data.main.humidity}%<span>Humidity</span>`;
        description.innerHTML = data.weather[0].description;

        if (description.innerHTML == "clear sky") {
          document.title = "Weather :   Clear Sky"
          image.src = "sun.png";
        } else if (description.innerHTML == "rain") {
          image.src = "rain.png";
          document.title = "Weather : Rain";
        } else if (
          description.innerHTML == "cloud" ||
          description.innerHTML == "overcast clouds"
        ) {
          image.src = "cloudy.png";
          document.title = "Weather : Cloud";
        } else if (description.innerHTML == "haze") {
          image.src = "haze.png";
          document.title = "Weather : Haze";
        } else {
          image.src = "windy.png";
          document.title = "Weather : Windy";
        }
      });
    input.value = "";
  }
}

search.addEventListener("click", () => {
  getWeather();
});

input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    getWeather();
  }
});
