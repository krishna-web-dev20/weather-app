const apikey = "465c27238c1fd517ca79e71da6e88999";

const input = document.getElementById("cityInput");
const btn = document.getElementById("searchBtn");
const weatherBox = document.getElementById("weatherBox");
const errorMsg = document.getElementById("errorMsg");

async function getWeather(city) {
  weatherBox.classList.add("hidden");
  errorMsg.innerText = "";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      errorMsg.innerText = "City not found ❌";
      return;
    }

    showWeather(data);

  } catch (err) {
    errorMsg.innerText = "Something went wrong ⚠️";
  }
}

function showWeather(data) {
  weatherBox.classList.remove("hidden");

const condition = 
data.weather[0].main.toLowerCase();

if (condition.includes("cloud")){
  document.body.style.background = "gray";
} else if (condition.includes("clear")){
  document.body.style.background = "skyblue";
}else if (condition.includes("rain")){
  document.body.style.background = "darkblue";
}else {
  document.body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
}


  weatherBox.innerHTML = `
    <h2>${data.name}</h2>
    <p>🌡️ Temp: ${data.main.temp}°C</p>
    <p>🌤️ Weather: ${data.weather[0].main}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
  `;
}

btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (!city) return;
  getWeather(city);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btn.click();
});