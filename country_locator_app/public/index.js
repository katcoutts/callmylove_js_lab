var countries;
var countryName;
var map;

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  console.log(countries);
  var country = function(countryName){
  for (var country of countries){
    if (country.name === countryName){
      return country;
    }
  }
  }
  console.log(country(countryName));
  var callingCode = country(countryName).callingCodes;
  console.log(callingCode);
  var timeZone = country(countryName).timezones;
  console.log(timeZone);
  var callingCodeText = document.getElementById('calling-code');
  callingCodeText.innerText = callingCode;
  var timeZoneText = document.getElementById('time-zone');
  timeZoneText.innerText = timeZone;

  var container = document.getElementById('map');
  var laT = country(countryName).latlng[0];
  var lnG = country(countryName).latlng[1];
  var center = { lat: laT, lng: lnG };
  var zoom = 3;
  map = new Map (container, center, zoom);
  map.addMarker(center);
  navigator.geolocation.getCurrentPosition(function(position){
    map.addMarker({lat: position.coords.latitude, lng: position.coords.longitude});
  })
}


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}


var app = function(){
  var url = "http://localhost:5000";
  countryName = "Russia";
  var button = document.querySelector('button');
  button.onclick = function(){
    var input = document.getElementById('inputText').value;
    countryName = input;
    console.log(countryName);
    makeRequest(url, requestComplete)
  } 


}

window.onload = app;



// var map;

// var handleArthurButtonClick = function(){
//  var coords = {  lat: 55.945101, lng: -3.162346};
//  map.addListener(coords);
// }

// var handleMyCurrentLocationClick = function(){
//  navigator.geolocation.getCurrentPosition(function(position){
//    map.addListener({lat: position.coords.latitude, lng:position.coords.longitude})
//  });
// }


// var initialize = function(){
//  var container = document.getElementById('map');
//  var center = { lat: 55.945101, lng: -3.162346}
//  var zoom = 15;
//  map = new Map (container, center, zoom);

//  var arthurButton = document.getElementById("take-me-to-the-top-of-edinburgh");
//  arthurButton.onclick = handleArthurButtonClick;

//  var currentLocationButton = document.getElementById("where-am-i");
//  currentLocationButton.onclick = handleMyCurrentLocationClick;

//  map.addMarker(center);
//  map.addClickEvent();
 
// }