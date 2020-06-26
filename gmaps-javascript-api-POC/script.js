// A POC for visualization created using Maps JavaScript API

var map = null;
var heatmap = null;
var markers = {};
var locations = {}
var markerClusterer = null;
var heatmapLayer = null;
var currentMonth = null;
var currentHeatmapMonth = null;
var months = {
1:"January", 
2:"February", 
3:"March", 
4:"April", 
5:"May", 
6:"June", 
7:"July", 
8:"August", 
9:"September",
10:"October", 
11:"November", 
12:"December"
};
var center = {
lat: 25, 
lng:80
};
var iconbase = "http://maps.google.com/mapfiles/kml/paddle/";

function updateMap(month)
{
    currentMonth = month;
    document.getElementById("output").innerHTML = "Month displaying: "+months[month];
    
    if(markerClusterer)
    {
        markerClusterer.clearMarkers();
    }

    markerClusterer = new MarkerClusterer(
        map, 
        markers[month], 
        {
            imagePath: "images/m"
        }
    );

    markerClusterer.setAverageCenter(true);
}

function updateHeatmap(month)
{
    currentHeatmapMonth = month;

    if(heatmapLayer)
    {
        heatmapLayer.setMap(null);
    }
    document.getElementById("output2").innerHTML = "Month displaying: "+months[month];

    heatmapLayer = new google.maps.visualization.HeatmapLayer(
        {
            data: locations[month]
        }
    );

    heatmapLayer.setMap(heatmap);
}

function setCategoryMarkers()
{
    document.getElementById("su").innerHTML = "<img src="+iconbase+"ylw-circle.png>   Supermarket"; 
    document.getElementById("st").innerHTML = "<img src="+iconbase+"grn-circle.png>   Stationary"; 
    document.getElementById("ph").innerHTML = "<img src="+iconbase+"pink-circle.png>   Pharmacy"; 
    document.getElementById("b").innerHTML = "<img src="+iconbase+"blu-circle.png>   Bakery"; 
}

function initMap() {

    setCategoryMarkers()

    map = new google.maps.Map(
        document.getElementById("map"), 
        {
            zoom:4, 
            center: center,
            mapTypeId: 'roadmap'
        }
    );

    heatmap = new google.maps.Map(
        document.getElementById("heatmap"),
        {
            zoom:4, 
            center: center,
            mapTypeId: 'satellite'
        }
    );

    for(var i=1; i<=12; i++)
    {
        markers[i] = []
        locations[i] = []
    }

    for(var i=0; i< data.locations.length; i++)
    {
        var location = data.locations[i];
        var type = location["type"]
        var month = location["month"]

        var marker = new google.maps.Marker(
            {
                position: new google.maps.LatLng(
                    location["lat"],
                    location["lng"]
                )
            }
        );

        locations[month].push(new google.maps.LatLng(location["lat"],location["lng"]));

        if(type == "bakery")
        {
            marker.setIcon(iconbase+"blu-circle.png");
        }
        else if(type == "pharmacy")
        {
            marker.setIcon(iconbase+"pink-circle.png");
        }
        else if(type == "supermarket")
        {
            marker.setIcon(iconbase+"ylw-circle.png");
        }
        else
        {
            marker.setIcon(iconbase+"grn-circle.png");
        }

        markers[month].push(marker);
    }

    updateMap(document.getElementById("myRange").value);

    updateHeatmap(document.getElementById("myRange2").value);
}