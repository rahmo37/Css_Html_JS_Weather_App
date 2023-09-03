// ! Lets learn a little bit about the async function, await keyword, fetch() method
// async Function: An async function always returns a promise. Whether you explicitly return a promise or not, it will wrap the returned value in a promise. If you throw an error inside the function, the returned promise will be rejected with that error.

// The await keyword can only be used inside an async function. It pauses the execution of the function until the promise on its right-hand side is settled (either resolved or rejected). It doesn't block the entire JavaScript thread, just the flow inside the async function. When the promise resolves, the function resumes execution, and the value of the await expression is the resolved value of the promise.

// The fetch() method is used to make network requests in JavaScript, and it returns a promise. This promise resolves with a Response object when the initial network operation is complete (when headers are received), but it doesn't mean that the entire content has been downloaded. To access the content (e.g., in JSON format), we call the .json() method on the Response object, which also returns a promise. This is why you often see await used twice with fetch: once to wait for the network operation and once to wait for reading and parsing the content.

// When you use fetch() to make a network request, it returns a promise. When this promise resolves, it provides a Response object as its resolved value. This Response object contains various properties and methods to inspect and process the results of the request.

// response.json(): Interprets the response body as JSON and returns a promise that resolves with the parsed JSON data.

// By using await in both places, you make sure that each asynchronous operation is completed before moving on to the next step, making your asynchronous code look and behave much more like traditional synchronous code.

// response.json() takes the raw JSON string from the response body and transforms it into a usable JavaScript object

const apiKey = "eedbe108c9321236f1c01d83f7567020";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
let data;
let isValidCity;

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.getElementById("err").style.display = "block";
    isValidCity = false;
  } else {
    isValidCity = true;
    document.getElementById("err").style.display = "none";
    data = await response.json();
    console.log(data);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value).then(() => {
    if (isValidCity) {
      placeDataInElements(createWeatherObj());
    } else {
      document.querySelector(".city").innerHTML = "N/A";
      document.querySelector(".temp").innerHTML = "N/A";
      document.querySelector(".humidity").innerHTML = "N/A";
      document.querySelector(".wind").innerHTML = "N/A";
      document.querySelector(".weather-icon").src = `images/noImage.png`;
    }
  });
});

function createWeatherObj() {
  return {
    cityName: data.name,
    temperature: Math.round(data.main.temp) + "°c",
    humidity: data.main.humidity + "%",
    windSpeed: Math.round(data.wind.speed) + " km/h",
    weatherCondition: data.weather[0].main,
  };
}

function placeDataInElements(weatherObj) {
  console.log(weatherObj);
  document.querySelector(".city").innerHTML = weatherObj.cityName;
  document.querySelector(".temp").innerHTML = weatherObj.temperature;
  document.querySelector(".humidity").innerHTML = weatherObj.humidity;
  document.querySelector(".wind").innerHTML = weatherObj.windSpeed;
  document.querySelector(
    ".weather-icon"
  ).src = `images/${weatherObj.weatherCondition.toLowerCase()}.png`;
}
