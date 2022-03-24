/* global window, document, _, $, mapboxgl */
/* eslint no-var: "off", prefer-arrow-callback: "off", no-unused-vars: "off" */
//use this path
let path= "C:/Users/maike/Desktop/degreeproj-haider"

const maps = {};
let table_route_id=null;

function formatRoute(route) {
  const html = route.route_url
    ? $('<a>').attr('href', route.route_url)
    : $('<div>');

  html.addClass('route-item text-sm mb-2');

  if (route.route_color) {
    $('<div>')
      .addClass('route-color-swatch mr-2 flex-shrink-0')
      .css('backgroundColor', route.route_color)
      .appendTo(html);
  }

  $('<span>')
    .text(`${route.route_short_name} `) //${route.route_long_name} for full name
    .appendTo(html);

  return html.prop('outerHTML');
}

function formatStopPopup(feature) {
  const routes = JSON.parse(feature.properties.routes);
  const html = $('<div>');

  $('<div>')
    .addClass('popup-title')
    .text(feature.properties.stop_name)
    .appendTo(html);

  if (feature.properties.stop_code ?? false) {
    $('<label>').addClass('mr-1').text('Stop Code:').appendTo(html);

    $('<strong>').text(feature.properties.stop_code).appendTo(html);
  }

  $('<div>').text('Routes Served:').appendTo(html);

  $(html).append(routes.map((route) => formatRoute(route)));

  return html.prop('outerHTML');
}

function formatRoutePopup(features) {
  const html = $('<div>');

  if (features.length > 1) {
    $('<div>').addClass('popup-title').text('Routes').appendTo(html);
  }

  $(html).append(features.map((feature) => formatRoute(feature.properties)));

  return html.prop('outerHTML');
}

function getBounds(geojson) {
  const bounds = new mapboxgl.LngLatBounds();
  for (const feature of geojson.features) {
    if (feature.geometry.type === 'Point') {
      bounds.extend(feature.geometry.coordinates);
    } else if (feature.geometry.type === 'LineString') {
      for (const coordinate of feature.geometry.coordinates) {
        bounds.extend(coordinate);
      }
    }
  }

  return bounds;
}

function createSystemMap(id, geojson) {
  const defaultRouteColor = '#FF4728';
  const routeLayerIds = [];
  const routeBackgroundLayerIds = [];

  if (!geojson || geojson.features.length === 0) {
    $('#' + id).hide();
    return false;
  }

  const bounds = getBounds(geojson);
  const map = new mapboxgl.Map({
    container: id,
    style: 'mapbox://styles/mapbox/light-v10',
    center: bounds.getCenter(),
    zoom: 12,
  });
  const routes = {};

  for (const feature of geojson.features) {
    routes[feature.properties.route_id] = feature.properties;
  }

  map.scrollZoom.enable();
  map.addControl(new mapboxgl.NavigationControl());

  map.on('load', () => {
    map.fitBounds(bounds, {
      padding: 20,
      duration: 0,
    });

    // Find the index of the first symbol layer in the map style
    let firstSymbolId;
    for (const layer of map.getStyle().layers) {
      if (layer.type === 'symbol') {
        firstSymbolId = layer.id;
        break;
      }
    }

    // Add white outlines to routes first
    for (const routeId of Object.keys(routes)) {
      routeBackgroundLayerIds.push(`${routeId}outline`);
      map.addLayer(
        {
          id: `${routeId}outline`,
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson,
          },
          paint: {
            'line-color': '#FFFFFF',
            'line-opacity': 1,
            'line-width': 6,
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          filter: ['==', 'route_id', routeId],
        },
        firstSymbolId
      );
    }

    // Add route lines next
    for (const routeId of Object.keys(routes)) {
      routeLayerIds.push(routeId);
      const routeColor = routes[routeId].route_color || defaultRouteColor;
      map.addLayer(
        {
          id: routeId,
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson,
          },
          paint: {
            'line-color': routeColor,
            'line-opacity': 1,
            'line-width': 2,
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          filter: ['==', 'route_id', routeId],
        },
        firstSymbolId
      );
    }

    map.on('mousemove', (event) => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: [...routeLayerIds, ...routeBackgroundLayerIds],
      });
      if (features.length > 0) {
        map.getCanvas().style.cursor = 'pointer';
        highlightRoutes(
          _.uniq(features.map((feature) => feature.properties.route_id))
        );
      } else {
        map.getCanvas().style.cursor = '';
        unHighlightRoutes();
      }
    });

    map.on('click', (event) => {
      // Set bbox as 5px reactangle area around clicked point
      const bbox = [
        [event.point.x - 5, event.point.y - 5],
        [event.point.x + 5, event.point.y + 5],
      ];
      const features = map.queryRenderedFeatures(bbox, {
        layers: routeLayerIds,
      });

      if (!features || features.length === 0) {
        return;
      }

      const routeFeatures = _.orderBy(
        _.uniqBy(features, (feature) => feature.properties.route_short_name),
        (feature) => Number.parseInt(feature.properties.route_short_name, 10)
      );

      new mapboxgl.Popup()
        .setLngLat(event.lngLat)
        .setHTML(formatRoutePopup(routeFeatures))
        .addTo(map);
    });

    function highlightRoutes(routeIds, zoom) {
      for (const layerId of routeBackgroundLayerIds) {
        const color = routeIds.includes(layerId.replace(/outline/, ''))
          ? '#FFFD7E'
          : '#FFFFFF';
        const width = routeIds.includes(layerId.replace(/outline/, ''))
          ? 12
          : 6;
        map.setPaintProperty(layerId, 'line-color', color);
        map.setPaintProperty(layerId, 'line-width', width);
      }

      const highlightedFeatures = geojson.features.filter((feature) =>
        routeIds.includes(feature.properties.route_id)
      );

      if (highlightedFeatures.length === 0) {
        return;
      }

      if (zoom) {
        const zoomBounds = getBounds({
          features: highlightedFeatures,
        });
        map.fitBounds(zoomBounds, {
          padding: 20,
        });
      }
    }

    function unHighlightRoutes(zoom) {
      for (const layerId of routeBackgroundLayerIds) {
        map.setPaintProperty(layerId, 'line-color', '#FFFFFF');
        map.setPaintProperty(layerId, 'line-width', 6);
      }

      if (zoom) {
        map.fitBounds(bounds);
      }
    }

    // On table hover, highlight route on map
    $(() => {
      $('.overview-list a').hover((event) => {
        const routeIdString = $(event.target).parents('a').data('route-ids');
        if (routeIdString) {
          const routeIds = routeIdString.toString().split(',');
          highlightRoutes(routeIds, true);
        }
      });

      $('.overview-list').hover(
        () => {},
        () => unHighlightRoutes(true)
      );
    });
    

  

    //switch routes and tables
    $(() => {
      $('.overview-list a').click(function() {
   
        
        var id = $(this).attr("id");
        console.log(id);
        
        if ("b_allroutes" == id.toString()){
          $("#switchscreen").load("routes");
        }

        else{
          table_route_id=id;
          var s_Type = $("#sched_box").find(":selected").val();
          console.log(s_Type);
          var fileName= id+s_Type;
          console.log(fileName);

          var pathName= path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/sched/" +fileName+".csv";
          data= routeTable(pathName);
          //console.log(data);
          
          Promise.all([data]).then(function(results){
        
            makeTable(results[0]);
            
          });
          //switch map to zoomed in version
          $("#system_map").load(id);
  
          //Upload();

        }
       
    });
    });
  });

  maps[id] = map;
}



///show map and tops
function createMap(id, geojson) {
  const defaultRouteColor = '#FF4728';

  if (!geojson || geojson.features.length === 0) {
    $('#' + id).hide();
    return false;
  }

  const bounds = getBounds(geojson);
  const map = new mapboxgl.Map({
    container: id,
    style: 'mapbox://styles/mapbox/light-v10',
    center: bounds.getCenter(),
    zoom: 12,
    preserveDrawingBuffer: true,
  });

  map.scrollZoom.enable();
  map.addControl(new mapboxgl.NavigationControl());

  map.on('load', () => {
    map.fitBounds(bounds, {
      padding: {
        top: 40,
        bottom: 40,
        left: 20,
        right: 40,
      },
      duration: 0,
    });

    // Find the index of the first symbol layer in the map style
    let firstSymbolId;
    for (const layer of map.getStyle().layers) {
      if (layer.type === 'symbol') {
        firstSymbolId = layer.id;
        break;
      }
    }

    // Add route line outline first
    map.addLayer(
      {
        id: 'route-line-outline',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson,
        },
        paint: {
          'line-color': '#FFFFFF',
          'line-opacity': 1,
          'line-width': 6,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        filter: ['!has', 'stop_id'],
      },
      firstSymbolId
    );

    map.addLayer(
      {
        id: 'route-line',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson,
        },
        paint: {
          'line-color': ['to-color', ['get', 'route_color'], defaultRouteColor],
          'line-opacity': 1,
          'line-width': 2,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        filter: ['!has', 'stop_id'],
      },
      firstSymbolId
    );

    map.addLayer(
      {
        id: 'stops',
        type: 'circle',
        source: {
          type: 'geojson',
          data: geojson,
        },
        paint: {
          'circle-radius': {
            stops: [
              [9, 2],
              [13, 4],
              [15, 6],
            ],
          },
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
          'circle-color': '#f70707',
        },
        filter: ['has', 'stop_id'],
      },
      firstSymbolId
    );

    map.addLayer(
      {
        id: 'stops-highlighted',
        type: 'circle',
        source: {
          type: 'geojson',
          data: geojson,
        },
        paint: {
          'circle-radius': {
            stops: [
              [9, 3],
              [13, 4],
              [15, 7],
            ],
          },
          'circle-stroke-width': 2,
          'circle-stroke-color': '#666666',
          'circle-color': '#f70707',
        },
        filter: ['==', 'stop_id', ''],
      },
      firstSymbolId
    );

    map.on('mousemove', (event) => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: ['stops'],
      });
      if (features.length > 0) {
        map.getCanvas().style.cursor = 'pointer';
        highlightStop(features[0].properties.stop_id);
      } else {
        map.getCanvas().style.cursor = '';
        unHighlightStop();
      }
    });

    map.on('click', (event) => {
      // Set bbox as 5px rectangle area around clicked point
      const bbox = [
        [event.point.x - 5, event.point.y - 5],
        [event.point.x + 5, event.point.y + 5],
      ];
      const features = map.queryRenderedFeatures(bbox, {
        layers: ['stops'],
      });

      if (!features || features.length === 0) {
        return;
      }

      // Get the first feature and show popup
      const feature = features[0];
      new mapboxgl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setHTML(formatStopPopup(feature))
        .addTo(map);
    });

    function highlightStop(stopId) {
      map.setFilter('stops-highlighted', ['==', 'stop_id', stopId]);
      map.setPaintProperty('stops', 'circle-opacity', 0.5);
      map.setPaintProperty('stops', 'circle-stroke-opacity', 0.5);
    }

    function unHighlightStop() {
      map.setFilter('stops-highlighted', ['==', 'stop_id', '']);
      map.setPaintProperty('stops', 'circle-opacity', 1);
      map.setPaintProperty('stops', 'circle-stroke-opacity', 1);
    }

    // On table hover, highlight stop on map
    $('th, td', $('#' + id + ' table')).hover((event) => {
      let stopId;
      const table = $(event.target).parents('table');
      if (table.data('orientation') === 'vertical') {
        var index = $(event.target).index();
        stopId = $('colgroup col', table).eq(index).data('stop-id');
      } else {
        stopId = $(event.target).parents('tr').data('stop-id');
      }

      if (stopId === undefined) {
        return;
      }

      highlightStop(stopId.toString());
    }, unHighlightStop);
  });

  maps[id] = map;
}


//tables


function Upload() {
  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
          var reader = new FileReader();
          reader.onload = function (e) {
              var table = document.createElement("table");
              var rows = e.target.result.split("\n");
              for (var i = 0; i < rows.length; i++) {
                  var cells = rows[i].split(",");
                  if (cells.length > 1) {
                      var row = table.insertRow(-1);
                      for (var j = 0; j < cells.length; j++) {
                          var cell = row.insertCell(-1);
                          cell.innerHTML = cells[j];
                      }
                  }
              }
              var dvCSV = document.getElementById("dvCSV");
              dvCSV.innerHTML = "";
              dvCSV.appendChild(table);
          }
          reader.readAsText(fileUpload.files[0]);
      } else {
          alert("This browser does not support HTML5.");
      }
  } else {
      alert("Please upload a valid CSV file.");
  }
}

function makeTable(data)
{
  var col = [];
  for (var i = 0; i < data.length; i++) {
      for (var key in data[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
      }
  }
  var table = document.createElement("table");
  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1);                   // TABLE ROW.

  for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");      // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < data.length; i++) {

      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.innerHTML = data[i][col[j]];
      }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("dvCSV");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);


}
 


////Diesel vs Mixed
///Fleet Comparison in Table
////
function Compare(){
  var myID = table_route_id;
  switch(myID) {
    case "route1":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/1_0.csv")
      data1 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/1_1.csv")
      data2 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/1_2.csv")
      data3 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/1_3.csv")
      data4 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/1_4.csv")

      Promise.all([data0,data1,data2,data3,data4]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/1_0.csv")
      data01=routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/1_2.csv")
      data02 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/1_1.csv")
      data03 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/1_3.csv")
      data04 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/1_4.csv")
      Promise.all([data00,data01,data02,data03,data04]).then(function(results){
        combineTable(results,"dvCSV2");
      });

      break;
    case "route2":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/2_0.csv")
      data1 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/2_1.csv")
      data2 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/2_2.csv")      
      Promise.all([data0,data1,data2]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/2_0.csv")
      data01=routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/2_1.csv")
      data02 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/2_2.csv")
      
      Promise.all([data00,data01,data02]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route3c":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/3C_0.csv")
      data1 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/3C_1.csv")
      
      Promise.all([data0,data1]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/3C_0.csv")
      Promise.all([data00]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route3j":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/3J_0.csv")
      data1 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/3J_1.csv")
      
      Promise.all([data0,data1]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/3J_0.csv")
      data01=routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/3J_1.csv")
      Promise.all([data00,data01]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route3m":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/3M_0.csv")
      data1 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/3M_1.csv")
      data2 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/3M_2.csv")
      data3 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/3M_3.csv")

      Promise.all([data0,data1,data2,data3]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/3M_0.csv")
      data01 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/3M_1.csv")
      data02=routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/3M_2.csv")
      data03 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/3M_3.csv")
      Promise.all([data00,data01,data02]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route4":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/4_0.csv")
      data1 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/4_1.csv")

      Promise.all([data0,data1]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/4_0.csv")
      data01=routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/4_1.csv")
      Promise.all([data00,data01]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route5":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/5_0.csv")

      Promise.all([data0]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/5_0.csv")
      Promise.all([data00]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route6":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/6_0.csv")
      
      Promise.all([data0]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/6_0.csv")
      Promise.all([data00]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route7":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/7_0.csv")

      Promise.all([data0]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/7_0.csv")
      
      Promise.all([data00]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route8":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/8_0.csv")
      data1 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/8_1.csv")
      data2 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/8_2.csv")      
      Promise.all([data0,data1,data2]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/8_0.csv")
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/8_1.csv")
      data01=routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/8_2.csv")
      
      Promise.all([data00,data01]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route9":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/9_0.csv")
      data1 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/9_1.csv")
      data2 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/9_2.csv")      
      Promise.all([data0,data1,data2]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/9_0.csv")
      data01=routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/9_1.csv")
      data02 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/9_2.csv")
      
      Promise.all([data00,data01,data02]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route10":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/10_0.csv")
      data1 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/10_1.csv")    
      Promise.all([data0,data1]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/10_0.csv")
      
      Promise.all([data00]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route11":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/11_0.csv")
        
      Promise.all([data0]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/11_0.csv")
      
      
      Promise.all([data00]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route12":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/12_0.csv")
        
      Promise.all([data0]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/12_0.csv")
      
      
      Promise.all([data00]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route13":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/13_0.csv")
        
      Promise.all([data0]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/13_0.csv")
      
      
      Promise.all([data00]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route14":
      data0 = routeTable(path+"v/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/14_0.csv")
      data1 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/14_1.csv")

      Promise.all([data0,data1]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/14_0.csv")
      data01=routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/14_1.csv")
      Promise.all([data00,data01]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;
    case "route16":
      data0 = routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/diesel_only_assignments/schedules/16_0.csv")
        
      Promise.all([data0]).then(function(results){
        combineTable(results,"dvCSV1");
      });
      data00 =routeTable(path+"/Analysis-and-support-tool-for-charging-infrastructure/ENVI_SIM/data/output/mixed_fleet_assignments/schedules/16_0.csv")
      
      
      Promise.all([data00]).then(function(results){
        combineTable(results,"dvCSV2");
      });
      break;

      
    default:
      console.log("I am null...");
  }
}