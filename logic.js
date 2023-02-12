//setting the main coordinates for our map
var map = L.map('map').setView([37.528649, 33.43450], 11);

//adding attribution to openstreetmaps
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//grabbing data
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
//var link ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

//read in the data
d3.json(link).then(function (data) {

    L.geoJson(data, {
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer,
    }).addTo(map)





})
function onEachFeature(feature, layer) {
    var place = feature.properties.place;
    var popup = "<div>" + place + "</div>";
    layer.bindPopup(popup);
}
function pointToLayer(feature, latlng) {
    console.log(feature)
    return L.circleMarker(latlng, {
        opacity: .2,
        color: "green"
    });
}
// //adding a marker
// var marker = L.marker([37.528649,33.43450]).addTo(map);

// //add popup to our marker 
// marker.bindPopup("hello")

// // adding legend
// var map = L.map("map").setView([55.67, 12.57], 7);
// L.tileLayer(
//   "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
// ).addTo(map);

/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'infolegend');
    var grades = [1.0, 2.5, 4.0, 5.5, 8.0];
    var labels = [];
    var legendInfo = "<h4>Magnitude</h4>";
    console.log(labels)
    div.innerHTML = legendInfo;

    function chooseColor(grade) {
        if (grade >= 8)
            return 'red';
        if (grade >= 5)
            return 'pink';
        if (grade >= 4)
            return 'blue';
        if (grade >= 2.5)
            return 'green';
        return 'yellow';

    }

    // go through each magnitude item to label and color the legend
    // push to labels array as list item
    for (var i = 0; i < grades.length; i++) {
        labels.push('<li style="background-color:' + chooseColor(grades[i] + 1) + '"> <span>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '' : '+') + '</span></li>');
    }
    console.log(labels)
    // add each label list item to the div under the <ul> tag
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
};

legend.addTo(map);
