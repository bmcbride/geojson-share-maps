L.mapbox.accessToken = "pk.eyJ1IjoiYnJ5bWNicmlkZSIsImEiOiJXN1NuOFFjIn0.3YNvR1YOvqEdeSsJDa-JUw";

var titleField, cluster, userFields = [], urlParams = {};

var mapboxOSM = L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token="+L.mapbox.accessToken, {
  maxZoom: 19,
  subdomains: ["a", "b", "c", "d"],
  attribution: 'Basemap <a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a>'
});

var mapboxSat = L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token="+L.mapbox.accessToken, {
  maxZoom: 19,
  subdomains: ["a", "b", "c", "d"],
  attribution: 'Basemap <a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a>'
});

var baseLayers = {
  "Street Map": mapboxOSM,
  "Aerial Imagery": mapboxSat
};

var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true
});

var featureLayer = L.mapbox.featureLayer();

featureLayer.on("ready", function(e) {
  featureLayer.eachLayer(function (layer) {
    $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '"><td class="feature-name">' + getTitle(layer) + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
    layer.on("click", function (e) {
      map.closePopup();
      var content = "<table class='table table-striped table-bordered table-condensed'>";
      if (userFields.length > 0) {
        $.each(userFields, function(index, property) {
          if (e.target.feature.properties[property]) {
            content += "<tr><th>" + property + "</th><td>" + formatProperty(e.target.feature.properties[property]) + "</td></tr>";
          }
        });
      } else {
        $.each(e.target.feature.properties, function(index, property) {
          if (property) {
            content += "<tr><th>" + index + "</th><td>" + formatProperty(property) + "</td></tr>";
          }
        });
      }
      content += "<table>";
      $("#feature-title").html(getTitle(e.target));
      $("#feature-info").html(content);
      $("#featureModal").modal("show");
      $("#share-btn").click(function() {
        var link = location.toString() + "&id=" + L.stamp(e.target);
        $("#share-hyperlink").attr("href", link);
        $("#share-twitter").attr("href", "https://twitter.com/intent/tweet?url=" + encodeURIComponent(link));
        $("#share-facebook").attr("href", "https://facebook.com/sharer.php?u=" + encodeURIComponent(link));
      });
    });
  });

  if (urlParams.title && urlParams.title.length > 0) {
    var title = decodeURI(urlParams.title);
    $("[name='title']").html(title);
  }
  if (urlParams.sort && urlParams.sort == "desc") {
    sortOrder = "desc";
  }
  else {
    sortOrder = "asc";
  }
  var featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order: sortOrder});
  markerClusters.clearLayers().addLayer(featureLayer);
});

featureLayer.once("ready", function(e) {
  /* Update navbar & layer title from URL parameter */
  if (urlParams.title && urlParams.title.length > 0) {
    var title = decodeURI(urlParams.title);
    $("[name='title']").html(title);
  }
  /* Add navbar logo from URL parameter */
  if (urlParams.logo && urlParams.logo.length > 0) {
    $("#navbar-title").prepend("<img src='" + urlParams.logo + "'>");
  }
  /* If id param passed in URL, zoom to feature, else fit to cluster bounds or fitWorld if no data */
  if (urlParams.id && urlParams.id.length > 0) {
    var id = parseInt(urlParams.id);
    zoomToFeature(id);
  } else {
    if (featureLayer.getLayers().length === 0) {
      map.fitWorld();
    } else {
      map.fitBounds(this.getBounds(), {
        maxZoom: 17
      });
    }
  }
});

var map = L.map("map", {
  zoom: 10,
  layers: [mapboxOSM]
}).fitWorld();
map.attributionControl.setPrefix("");

var layerControl = L.control.layers(baseLayers, null, {
  collapsed: document.body.clientWidth <= 767 ? true : false
}).addTo(map);

var locateControl = L.control.locate({
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: false,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-crosshairs",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

function fetchData() {
  $("#loading").show();
  featureLayer.clearLayers();
  $("#feature-list tbody").empty();
  if (urlParams.src.indexOf(".topojson") > -1) {
    omnivore.topojson(decodeURIComponent(urlParams.src), null, featureLayer).on("ready", function(layer) {
      $("#loading").hide();
    });
  }
  else {
    featureLayer.loadURL(decodeURIComponent(urlParams.src)).on("ready", function(layer) {
      $("#loading").hide();
    });
  }
}

function getTitle(layer) {
  if (urlParams.title_field) {
    titleField = decodeURI(urlParams.title_field);
  }
  if (titleField && layer.feature.properties[titleField]) {
    return layer.feature.properties[titleField];
  }
  else {
    if (userFields.length > 0) {
      return layer.feature.properties[userFields[0]];
    }
    else {
      return layer.feature.properties[Object.keys(layer.feature.properties)[0]];
    }
  }
}

function formatProperty(value) {
  if (typeof value == "string" && (value.indexOf("http") === 0 || value.indexOf("https") === 0)) {
    return "<a href='" + value + "' target='_blank'>" + value + "</a>";
  } else {
    return value;
  }
}

function zoomToFeature(id) {
  var layer = featureLayer.getLayer(id);
  if (layer instanceof L.Marker) {
    map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  }
  else {
    map.fitBounds(layer.getBounds());
  }
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

if (location.search) {
  var parts = location.search.substring(1).split("&");
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split("=");
    if (!nv[0]) continue;
    urlParams[nv[0]] = nv[1] || true;
  }
}

if (urlParams.fields) {
  fields = urlParams.fields.split(",");
  $.each(fields, function(index, field) {
    field = decodeURI(field);
    userFields.push(field);
  });
}

if (urlParams.cluster && (urlParams.cluster === "false" || urlParams.cluster === "False" || urlParams.cluster === "0")) {
  cluster = false;
} else {
  cluster = true;
}

if (urlParams.attribution) {
  var attribution = decodeURI(urlParams.attribution);
  map.attributionControl.setPrefix(attribution);
}

if (cluster === true) {
  map.addLayer(markerClusters);
  layerControl.addOverlay(markerClusters, "<span name='title'>GeoJSON Data</span>");
} else {
  map.addLayer(featureLayer);
  layerControl.addOverlay(featureLayer, "<span name='title'>GeoJSON Data</span>");
}

$("#refresh-btn").click(function() {
  fetchData();
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#auto-refresh").click(function() {
  if ($(this).prop("checked")) {
    autoRefresh = window.setInterval(fetchData, 60 * 1000);
    fetchData();
  } else {
    clearInterval(autoRefresh);
  }
});

$("#full-extent-btn").click(function() {
  map.fitBounds(featureLayer.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $("#sidebar").hide();
  map.invalidateSize();
});

$(document).ready(function() {
  fetchData();
  $("#download").attr("href", urlParams.src);
});

$(document).on("click", ".feature-row", function(e) {
  zoomToFeature(parseInt($(this).attr("id"), 10));
});
