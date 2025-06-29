let currentWeather = {};
let day2weather = {};
let day3weather = {};

async function getWeather() {
  try {
    let location = searchLocation()?searchLocation():"Cairo";
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=594da0905b3a4f7091c114439252706&q=${location}&days=3`
    );
    // let forecast = await fetch("https://api.weatherapi.com/v1/forecast.json?key=594da0905b3a4f7091c114439252706&q=amazon&")
    // console.log("FROECAST: ",await forecast.json())
    let responseJson = await response.json();
    console.log(responseJson);
    let date = new Date(responseJson.location.localtime);
    currentWeather.date = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
    });
    currentWeather.location = responseJson.location.name;
    currentWeather.isDay = responseJson.current.is_day;
    currentWeather.temp = responseJson.current.temp_c;
    currentWeather.windspeed = responseJson.current.wind_mph;
    currentWeather.windDirection = responseJson.current.wind_dir;
    currentWeather.rain =
      responseJson.forecast.forecastday[0].day.daily_chance_of_rain;
    currentWeather.weekday = date.toLocaleDateString("en-US", {
      weekday: "long",
    });
    currentWeather.condition = responseJson.current.condition.text;
    currentWeather.conditionIcon = responseJson.current.condition.icon;

    day2weather.conditionIcon =
      responseJson.forecast.forecastday[1].day.condition.icon;
    day2weather.max = responseJson.forecast.forecastday[1].day.maxtemp_c;
    day2weather.min = responseJson.forecast.forecastday[1].day.mintemp_c;
    day2weather.condition =
      responseJson.forecast.forecastday[1].day.condition.text;
    let day2 = new Date(responseJson.forecast.forecastday[1].date);
    day2weather.day = day2.toLocaleDateString("en-GB", { weekday: "long" });

    day3weather.conditionIcon =
      responseJson.forecast.forecastday[2].day.condition.icon;
    day3weather.max = responseJson.forecast.forecastday[2].day.maxtemp_c;
    day3weather.min = responseJson.forecast.forecastday[2].day.mintemp_c;
    day3weather.condition =
      responseJson.forecast.forecastday[2].day.condition.text;
    let day3 = new Date(responseJson.forecast.forecastday[2].date);
    day3weather.day = day3.toLocaleDateString("en-GB", { weekday: "long" });
    
  } catch {}
}

const weatherToIdMap = {
  weekday: "today",
  date: "todayDate",
  location: "location",
  temp: "todayTemperature",
  condition: "todayCondition",
  rain: "rain",
  windspeed: "wind",
  windDirection: "direction",
};

async function displayWeather() {
  await getWeather();
  for (let [key, id] of Object.entries(weatherToIdMap)) {
    const value = currentWeather[key];
    document.getElementById(id).innerHTML =
      key == "temp"
        ? value + "°C"
        : key == "windspeed"
        ? value + " mph"
        : key == "rain"
        ? value + "%"
        : value;
  }
  document.getElementById("todayForecastIcon").src =
    currentWeather.conditionIcon;

  document.getElementById("day2max").innerHTML = day2weather.max + "°C";
  document.getElementById("day2min").innerHTML = day2weather.min + "°C";
  document.getElementById("day2condition").innerHTML = day2weather.condition;
  document.getElementById("day2date").innerHTML = day2weather.day;
  document.getElementById("day2icon").src = day2weather.conditionIcon;

  document.getElementById("day3max").innerHTML = day3weather.max + "°C";
  document.getElementById("day3min").innerHTML = day3weather.min + "°C";
  document.getElementById("day3condition").innerHTML = day3weather.condition;
  document.getElementById("day3date").innerHTML = day3weather.day;
  document.getElementById("day3icon").src = day3weather.conditionIcon;
}


function searchLocation() {
  let location = document.getElementById("search").value;
  console.log(location);
  
  return encodeURIComponent(location);
}

document.getElementById("search").addEventListener("keyup", displayWeather);

displayWeather();