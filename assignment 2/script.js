const API_KEY = "0133cc5316757ac730cc46ae342334e4";

const form = document.querySelector("#weather_form");
const weatherInfo = document.querySelector(".info");
const cityInput = document.querySelector("#city");
const historyDiv = document.querySelector("#history");
const eventLog = document.querySelector("#eventLog");

let searchHistory = JSON.parse(localStorage.getItem("history")) || [];

renderHistory();

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;

    logEvent("Sync Start");
    logEvent("Async Start (fetching)");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );

        const weatherData = await response.json();

        if (weatherData.cod !== 200) {
            weatherInfo.innerHTML = `<p style="color:red;">City not found</p>`;
            return;
        }

        logEvent("Async Data Received");

        displayWeather(weatherData);
        saveToHistory(city);

    } catch (error) {
        weatherInfo.innerHTML = `<p style="color:red;">Error fetching data</p>`;
    }

    logEvent("Sync End");
});

function displayWeather(data) {
    weatherInfo.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temp:</strong> ${(data.main.temp - 273.15).toFixed(1)} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].main}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
    `;
}

function logEvent(message) {
    const p = document.createElement("div");
    p.textContent = message;
    eventLog.appendChild(p);
}

function saveToHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem("history", JSON.stringify(searchHistory));
        renderHistory();
    }
}

function renderHistory() {
    historyDiv.innerHTML = "";
    searchHistory.forEach(city => {
        const btn = document.createElement("button");
        btn.textContent = city;
        btn.onclick = () => {
            cityInput.value = city;
            form.dispatchEvent(new Event("submit"));
        };
        historyDiv.appendChild(btn);
    });
}