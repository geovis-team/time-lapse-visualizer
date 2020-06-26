var mapboxAccessToken =
  'pk.eyJ1IjoibWFsbGlrYTIwMTEiLCJhIjoiY2thbnExM2VrMDczejJybnlzaHN6bXowcSJ9.B5-rmmfvWVvIACNEIakmtQ'
var map = L.map('mapid', {
  // center: [51.505, -0.09],
  center: [0, 0],
  zoom: 2,
  maxBoundsViscosity: 1.0
})
map.setMaxBounds(map.getBounds())
L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' +
    mapboxAccessToken,
  {
    id: 'mapbox/light-v9',
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,'+' <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,'+' Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 2,
    maxZoom: 16,
    noWrap: true
  }
).addTo(map)

console.log('in month', month)
if (document.getElementById('myslider').value == 1) {
  L.geoJson(statesData2).addTo(map)
} else {
  L.geoJson(statesData).addTo(map)
}
map.setMaxBounds(map.getBounds())

var info = L.control()

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info')
  this.update()
  return this._div
}

info.update = function (props) {
  this._div.innerHTML =
    '<h4>India Covid-19 Cases</h4>' +
    (props
      ? '<b>' + props.NAME_1 + '</b><br />' + props.cases + ' cases'
      : 'Hover over a state')
}

info.addTo(map)

function getColor (d) {
  return d > 15000
    ? '#800026'
    : d > 5000
    ? '#BD0026'
    : d > 1000
    ? '#E31A1C'
    : d > 500
    ? '#FC4E2A'
    : d > 250
    ? '#FD8D3C'
    : d > 100
    ? '#FEB24C'
    : d > 50
    ? '#FED976'
    : '#FFEDA0'
}

function style (feature) {
  return {
    fillColor: getColor(feature.properties.cases),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  }
}

function highlightFeature (e) {
  var layer = e.target

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  })

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront()
  }

  info.update(layer.feature.properties)
}

function resetHighlight (e) {
  geojson.resetStyle(e.target)
  info.update()
}

function zoomToFeature (e) {
  map.fitBounds(e.target.getBounds())
}

function onEachFeature (feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  })
}

var geojson
if (document.getElementById('myslider').value == 2)
  geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map)
else
  geojson = L.geoJson(statesData2, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map)

// map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

var legend = L.control({ position: 'bottomright' })

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 50, 100, 250, 500, 1000, 5000, 15000],
    labels = [],
    from,
    to

  for (var i = 0; i < grades.length; i++) {
    from = grades[i]
    to = grades[i + 1]

    labels.push(
      '<i style="background:' +
        getColor(from + 1) +
        '"></i> ' +
        from +
        (to ? '&ndash;' + to : '+')
    )
  }

  div.innerHTML = labels.join('<br>')
  return div
}

legend.addTo(map)

mo = {
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

var slider = document.getElementById('myslider')
var output = document.getElementById('demo')
output.innerHTML = mo[slider.value]
var month
slider.oninput = function () {
  map.removeLayer(geojson)
  output.innerHTML = mo[this.value]
  month = mo[this.value]
  console.log(style)
  if (document.getElementById('myslider').value == 2)
    geojson = L.geoJson(statesData, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map)
  else
    geojson = L.geoJson(statesData2, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map)
}
