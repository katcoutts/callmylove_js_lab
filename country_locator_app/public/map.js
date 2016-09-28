var Map = function(container, coords, zoom){

 this.googleMap = new google.maps.Map(container, {
   center: coords,
   zoom: zoom
 });

 var infoWindow = new google.maps.InfoWindow({
   content: "Imagine a great description!"
 });

 this.addMarker = function(coords){
   var marker = new google.maps.Marker({
     position: coords,
     map: this.googleMap,
     animation: google.maps.Animation.BOUNCE,
     icon: "heart.png"
   });

   infoWindow.setPosition(coords);
   infoWindow.setContent("This has a latitude of:" +coords["lat"]+ " and a longitude of"+coords["lng"]+"");

   marker.addListener('click', function(){
     infoWindow.open(this.googleMap,marker);
   })
   
 }

 this.addClickEvent = function(){
   google.maps.event.addListener(this.googleMap, 'click', function(event){

     var position = { lat: event.latLng.lat() , lng: event.latLng.lng() }
     this.addMarker(position)
   }.bind(this))

 };

 this.addListener = function(coords){
  this.googleMap.panTo(coords);
  this.googleMap.setCenter(coords);
  this.addMarker(coords);

};




}