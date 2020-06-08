var map = null;
var markers = {};
var locations = {}
var markerClusterer = null;
var months = {1: "January", 2: "February", 3: "March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"August", 9:"September",10:"October", 11:"November", 12:"December"};
var currentMonth = null;
var center = {lat: 25, lng:80};

var iconbase = "http://maps.google.com/mapfiles/kml/paddle/";

function updateMap(month)
{
  currentMonth = month;
  document.getElementById("output").innerHTML = "Month displaying: "+months[month];
  if(markerClusterer)
  {
    markerClusterer.clearMarkers();
  }
  markerClusterer = new MarkerClusterer(map, markers[month], {imagePath: "images/m"});
  markerClusterer.setAverageCenter(true);
  // console.log(markerClusterer.averageCenter);
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {zoom:4, center: center,mapTypeId: 'roadmap'});
  // var markers = []
  // var markers = {}

  document.getElementById("su").innerHTML = "<img src="+iconbase+"ylw-circle.png>   Supermarket"; 
  document.getElementById("st").innerHTML = "<img src="+iconbase+"grn-circle.png>   Stationary"; 
  document.getElementById("ph").innerHTML = "<img src="+iconbase+"pink-circle.png>   Pharmacy"; 
  document.getElementById("b").innerHTML = "<img src="+iconbase+"blu-circle.png>   Bakery"; 

  for(var i=1; i<=12; i++)
  {
    markers[i] = []
    locations[i] = []
  }

  console.log(data.locations.length);
  for(var i=0; i< data.locations.length; i++)
  {
    var location = data.locations[i];
    var type = location["type"]
    var month = location["month"]
    // var marker = new google.maps.Marker({position: {lat: location["lat"], lng: location["lng"]}});
    var marker = new google.maps.Marker({position: new google.maps.LatLng(location["lat"],location["lng"])});
    locations[month].push(new google.maps.LatLng(location["lat"],location["lng"]));
    if(type == "bakery")
    {
      // marker.setIcon("images/bakery.png");
      // marker.setLabel('B');
      marker.setIcon(iconbase+"blu-circle.png");
    }
    else if(type == "pharmacy")
    {
      // marker.setLabel('Ph');
      marker.setIcon(iconbase+"pink-circle.png");
    }
    else if(type == "supermarket")
    {
      // marker.setLabel('Su');
      marker.setIcon(iconbase+"ylw-circle.png");
    }
    else
    {
      // marker.setLabel('St');
      marker.setIcon(iconbase+"grn-circle.png");
    }
    console.log("marker pushed",i, month)
    // markers.push(marker);
    markers[month].push(marker);
  }

  updateMap(document.getElementById("myRange").value);
  // var markers = data.map(function(location, i) {
  //   return new google.maps.Marker({
  //     position: {lat: location["lat"], lng: location["lng"]}
  //     // label: labels[i % labels.length]
  //   });
  // });
  // var markerClusters = {};

  // for(var i=0; i < data.types.length; i++)
  // {
  //   markerClusters[data.types[i]] = new MarkerClusterer(map, markers[data.types[i]], {imagePath: "images/m"});
  // }

  // var markerCluster = new MarkerClusterer(map, markers, {imagePath: "images/m"});
}