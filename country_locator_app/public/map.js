var Map = function(container, coords, zoom){

 this.googleMap = new google.maps.Map(container, {
   center: coords,
   zoom: zoom
 });

 this.addMarker = function(coords){
   var marker = new google.maps.Marker({
     position: coords,
     map: this.googleMap,
     animation: google.maps.Animation.BOUNCE,
     icon: "heart.png"
   });   
 }



}