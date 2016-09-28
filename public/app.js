


var app = function(){
  var url = "https://restcountries.eu/rest/v1";
  makeRequest(url, requestComplete);
}

window.onload = app;