var map = null
var markers = {}
var locations = {}
var markerClusterer = null
var months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}
var currentMonth = null
var center = { lat: 25, lng: 80 }

var iconbase = 'http://maps.google.com/mapfiles/kml/paddle/'

function updateMap (month) {
  currentMonth = month
  document.getElementById('output').innerHTML =
    'Month displaying: ' + months[month]
  if (markerClusterer) {
    markerClusterer.clearMarkers()
  }
  markerClusterer = new MarkerClusterer(map, markers[month], {
    imagePath: 'images/m'
  })
  markerClusterer.setAverageCenter(true)
}

function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: center,
    mapTypeId: 'roadmap'
  })

  for (var i = 1; i <= 12; i++) {
    markers[i] = []
    locations[i] = []
  }

  for (var i = 0; i < data.locations.length; i++) {
    var location = data.locations[i]
    var type = location['type']
    var month = location['month']

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(location['lat'], location['lng'])
    })
    locations[month].push(
      new google.maps.LatLng(location['lat'], location['lng'])
    )
    if (type == 'bakery') {
      marker.setIcon(iconbase + 'blu-circle.png')
    } else if (type == 'pharmacy') {
      marker.setIcon(iconbase + 'pink-circle.png')
    } else if (type == 'supermarket') {
      marker.setIcon(iconbase + 'ylw-circle.png')
    } else {
      marker.setIcon(iconbase + 'grn-circle.png')
    }
    markers[month].push(marker)
  }

  updateMap(document.getElementById('myRange').value)
}
