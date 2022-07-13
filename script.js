function getWeather(response) {
	console.log(response.data);
	console.log(response.data.coord.latitude);

	let city = response.data.name;
	let temp = Math.round(response.data.main.temp);
	fahrenheitTemp = Math.round(response.data.main.temp);
	let tempMax = Math.round(response.data.main.temp_max);
	let humidity = Math.round(response.data.main.humidity);
	let wind = Math.round(response.data.wind.speed);
	let feelsLike = Math.round(response.data.main.feels_like);
	let description = response.data.weather[0].description;
	let cityElement = document.querySelector("#city");
	cityElement.innerHTML = city;
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);
	let tempElement = document.querySelector("#temperature");
	tempElement.innerHTML = `${temp}`;
	let descriptionElement = document.querySelector("#description");
	descriptionElement.innerHTML = `${description}`;
	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = `Humidity:${humidity}%`;
	let windSpeed = document.querySelector("#wind");
	windSpeed.innerHTML = `Wind:${wind} mph`;
	let display = document.querySelector("#outside");
	display.innerHTML = `Feels like ${feelsLike}°F with a high of ${tempMax}°F`;

	let dayTime = document.querySelector("#time");
	let currentTime = new Date();
	let hour = currentTime.getHours();
	let min = currentTime.getMinutes();
	let days = [
		`Sunday`,
		`Monday`,
		`Tuesday`,
		`Wednesday`,
		`Thursday`,
		`Friday`,
		`Saturday`,
	];
	let day = days[currentTime.getDay()];
	let amPm = "AM";
	if ((hour) => 12) {
		hour = hour - 12;
		amPm = "PM";
	}
	if (min < 10) {
		min = `0${min}`;
	}

	dayTime.innerHTML = `${day}, ${hour}:${min} ${amPm}`;
}
function handleSubmit(event) {
	event.preventDefault();
	let citySearch = document.querySelector("#searchElement");
	let city = citySearch.value;
	searchCity(city);
}
function searchCity(city) {
	let apiKey = "be6fdca8e2e91988e4c676b7fb94a33b";
	let endPoint = "https://api.openweathermap.org/data/2.5/weather";
	let unit = "imperial";
	let apiUrl = `${endPoint}?q=${city}&appid=${apiKey}&units=${unit}`;

	axios.get(apiUrl).then(getWeather);
}
function showPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiKey = "be6fdca8e2e91988e4c676b7fb94a33b";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(getWeather);
}
function getCurrentPosition(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}
function showCelsiusTemp(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	let celsiusTemperature = (fahrenheitTemp - 32) * 0.5556;
	cTemp.classList.add("active");
	fTemp.classList.remove("active");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function showFahrenheitTemp(event) {
	event.preventDefault();
	cTemp.classList.remove("active");
	fTemp.classList.add("active");
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
let form = document.querySelector("#search-input");
form.addEventListener("submit", handleSubmit);

let buttonCurrent = document.querySelector("#current");
buttonCurrent.addEventListener("click", getCurrentPosition);

let dayTime = document.querySelector("#time");
let currentTime = new Date();
let hour = currentTime.getHours();
let min = currentTime.getMinutes();
let days = [
	`Sunday`,
	`Monday`,
	`Tuesday`,
	`Wednesday`,
	`Thursday`,
	`Friday`,
	`Saturday`,
];
let day = days[currentTime.getDay()];
let amPm = "AM";
if (hour > 12) {
	hour = hour - 12;
	amPm = "PM";
}
if (min < 10) {
	min = `0${min}`;
}
if (hour < 12) {
	hour = `${hour}`;
	amPm = "AM";
}

dayTime.innerHTML = `${day}, ${hour}:${min} ${amPm}`;
let fahrenheitTemp = null;

let cTemp = document.querySelector("#cLink");
cTemp.addEventListener("click", showCelsiusTemp);

let fTemp = document.querySelector("#fLink");
fTemp.addEventListener("click", showFahrenheitTemp);

searchCity("New York");
