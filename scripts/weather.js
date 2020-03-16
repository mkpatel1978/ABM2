var xhr = new XMLHttpRequest();
var wdata = new XMLHttpRequest();
var city;
xhr.open('GET', "https://ipinfo.io/json", true);
xhr.send();
xhr.addEventListener("readystatechange", processRequest, false);
xhr.onreadystatechange = processRequest;

// Identify the location
function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    // time to partay!!!
    var response = JSON.parse(xhr.responseText);
    //alert(response.city);
    // document.getElementById("Location").innerHTML = response.country + " , " + response.region + " , " + response.city;
    city = response.city;

    //Live Weather data

    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + response.city + "&appid=0688d3ec2934ba3120cc1cd777a255c3&units=metric";
    wdata.open('GET', url, true);

    wdata.send();
    wdata.addEventListener("readystatechange", processWeather, false);
    wdata.onreadystatechange = processWeather;

  }
}

// Find the current Temprature based on location identified
function processWeather(e) {
  if (wdata.readyState == 4 && wdata.status == 200) {
    // time to partay!!!
    var response = JSON.parse(wdata.responseText);
    document.getElementById("Location").innerHTML = city+": " + response.main.temp + " ℃" + '<img src="http://openweathermap.org/img/wn/'+response.weather[0].icon+'@2x.png" alt="">' ;
  }
}
