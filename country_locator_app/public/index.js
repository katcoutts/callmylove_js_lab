var countries;
var countryName;

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
  makeRequest(url, requestComplete);
}

window.onload = app;