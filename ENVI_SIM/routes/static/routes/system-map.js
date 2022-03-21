/* global window, document, _, $, mapboxgl */
/* eslint no-var: "off", prefer-arrow-callback: "off", no-unused-vars: "off" */

const maps = {};

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
    .text(`${route.route_short_name} ${route.route_long_name}`)
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
    

  

    //switch routes
    $(() => {
      $('.overview-list a').click(function() {
   
        
        var id = $(this).attr("id");
        console.log(id)
        if ("b_allroutes" == id.toString()){
          //window.location.pathname = "routeOne";
          $("#switchscreen").load("routes");
        }
        $("#system_map").load(id);

        
        // if ("r2" == id.toString()){
        //   //window.location.pathname = "routeOne";
        //   $("#system_map").load("routeTwo");
        // }
        // if ("r3c" == id.toString()){
        //   //window.location.pathname = "routeOne";
        //   $("#system_map").load("route3c");
        // }
        // if ("r3m" == id.toString()){
        //   //window.location.pathname = "routeOne";
        //   $("#system_map").load("route3m");
        // }
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
          'circle-stroke-color': '#363636',
          'circle-color': '#363636',
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
          'circle-color': '#888888',
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


