const apiKey = "166a433c57516f51dfab1f7edaed8413";
const weatherSite = "https://api.openweathermap.org/data/2.5/forecast/daily?cnt=5&appid=" + apiKey + "&q=";
const uvSite = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey;
const forecastSite = "https://api.openweathermap.org/data/2.5/forecast/daily?cnt=5&appid=166a433c57516f51dfab1f7edaed8413&q=";
const imgDir = "./images/";


// Icons https://openweathermap.org/weather-conditions
// forecast https://api.openweathermap.org/data/2.5/forecast/daily?q=kansas+city&cnt=5&appid=166a433c57516f51dfab1f7edaed8413
// UV https://samples.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37&appid=b6907d289e10d714a6e88b30761fae22
var city = "kansas+city"
getWeather(city);
getForecast(city);


function forecastWeather(forecastArr) {
  console.log(forecastArr);
}
///////////////////////////////
//gets 5 day forecast from api, and call forecastWeather() and passes the array of days
function getForecast(city) {
  let forecast = $.ajax({
    url: forecastSite + city,
    method: "GET"
  })
    .then(function (response) {
      forecastWeather(response.list);
    });
}
////////////////////////////////////////
// this sets the currentWeather div only, and is called from getWeather()
///////////////////////////////////
function currentWeather(weatherObj) {
  let city = weatherObj.city.name;
  let lat = weatherObj.city.coord.lat;
  let long = weatherObj.city.coord.lon;
  let fahrTemp = kelvToFahr(weatherObj.list[0].temp.day);
  let humidity = weatherObj.list[0].humidity;
  let wind = weatherObj.list[0].speed;
  let icon = "./images/" + weatherObj.list[0].weather[0].icon + ".png";
  let dateObj = new Date(weatherObj.list[0].dt * 1000);
  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();

  $("#city").text(city);
  $("#date").text(month + "/" + day + "/" + year);
  $("#icon").attr("src", icon);
  $("#temp").append(fahrTemp + " &#8457;");
  $("#humidity").append(humidity + "%");
  $("#wind").append(wind + " MPH");
  //$("#uv").append("followUp");
  console.log(city + " " + lat + " " + long + " " + fahrTemp + " " + humidity + " " + month + "/" + day + "/" + year);
  let uvObj = getUv(lat, long);
  uvObj.then(uvIndex => $("#uv").append(uvIndex.value));
  //console.log(promis.then);
  //$("#uv").append(getUv(lat, long));
  return [lat, long];
}
/////////////////////////////////////
//This returns the promise of the called uv site
function getUv(lat, lon) {
  let site = uvSite + "&lat=" + lat + "&lon=" + lon;
  console.log(site);
  return $.ajax({
    url: site,
    method: "GET"
  });
}
/////////////////////////////////////
//convert kelvin to Fahrenheit, and return to 1 decimal point
function kelvToFahr(kelvTemp) {
  fahrTemp = kelvTemp * 1.8 - 459.67;
  return fahrTemp.toFixed(1);
}
/////////////////////////////////////
//main function to get current weather
function getWeather(city) {
  let weather = $.ajax({
    url: weatherSite + city,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      console.log(response);
      var latL = currentWeather(response);
    })

}