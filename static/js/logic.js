function createMap(earthquakeLocations) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Earthquake Locations": earthquakeLocations
    };
  
    // Create the map object with options
    var map = L.map("mapid", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [lightmap, earthquakeLocations]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "stations" property off of response.data
    var locations = response.data.stations;
    var magnitude = 
  
    // Initialize an array to hold bike markers
    var earthquakeMarkers = [];
  
    // Loop through the stations array
    for (var index = 0; index < locations.length; index++) {
      var locations = locations[index];
  
      // For each station, create a marker and bind a popup with the station's name
      var earthquakeMarker = L.marker([location.lat, locations.lon])
        .bindPopup("<h3>" + location.name + "<h3><h3>Capacity: " + location.capacity + "</h3>");
  
      // Add the marker to the bikeMarkers array
      earthquakeMarkers.push(earthquakeMarker);
    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(earthquakeMarkers));
  }
  
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
  