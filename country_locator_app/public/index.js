// https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

var countries;
var map;


var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  var country = function(countryName){
  for (var country of countries){
    if (country.name === countryName){
      return country;
    }
  }
  }
  var callingCode = country(countryName).callingCodes;
  var timeZone = country(countryName).timezones;
  printCallingCode(callingCode);
  printTimeZone(timeZone);
  var container = document.getElementById('map');
  laT = country(countryName).latlng[0];
  lnG = country(countryName).latlng[1];
  var center = { lat: laT, lng: lnG };
  var zoom = 3;
  map = new Map (container, center, zoom);
  map.addMarker(center); 
  setYourLocation();  
}

var setYourLocation = function(){
  navigator.geolocation.getCurrentPosition(function(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    map.addMarker({lat: position.coords.latitude, lng: position.coords.longitude});
    getDistances(laT, lnG, latitude, longitude);
  });
}

var getDistances = function(lat1, long1, lat2, long2){
    var distance = getDistance({lat: lat1, lng: long1}, {lat: lat2, lng: long2});
    var km = distance/1000;
    var miles = Math.round((km / 1.6) * 100) / 100;
    var distanceBox = document.getElementById('distance');
    distanceBox.innerText = "You are " + miles + " miles apart!";  
}

var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

var printCallingCode = function(callingCode){
  var callingCodeText = document.getElementById('calling-code');
  callingCodeText.innerText = callingCode;
}

var printTimeZone = function(timeZone){
  var timeZoneText = document.getElementById('time-zone');
  timeZoneText.innerText = timeZone;
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}


var app = function(){
  var url = "http://localhost:5000";
  var button = document.querySelector('button');
  button.onclick = function(){
    var input = document.getElementById('inputText').value;
    countryName = input;
    makeRequest(url, requestComplete)
  } 


}

window.onload = app;



