const API_KEY = "7b42ca138d47fd73fc2f3535cd44b23e";

const onGeoOk = position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        const weatherData = data.weather[0].main;
        const weatherBox = document.querySelector("#weather");
        const weatherIcon = document.createElement("i");
        if (weatherData == "Clear") {
            weatherIcon.classList.add("fa-solid", "fa-sun", "fa-lg");
        } else if (weatherData == "Clouds") {
            weatherIcon.classList.add("fa-solid", "fa-cloud", "fa-lg");
        } else if (weatherData == "Rain") {
            weatherIcon.classList.add("fa-solid", "fa-cloud-rain", "fa-lg");
        } else if (weatherData == "Mist") {
            weatherIcon.classList.add("fa-solid", "fa-smog", "fa-lg");
        } else if (weatherData == "Snow") {
            weatherIcon.classList.add("fa-solid", "fa-cloud-meatball", "fa-lg");
        } else {
            weatherIcon.classList.add("fa-solid", "fa-cloud-sun", "fa-lg");
        }
        weatherIcon.classList.add("weather-icon");
        weatherBox.insertBefore(weatherIcon, weatherBox.firstChild);
        weather.innerText = `${data.main.temp}°`;
    });
};
const onGeoError = err => {
    alert("Can't find you. No weather for you.");
    console.warn(`ERROR(${err.code}): ${err.message}`);
};
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
