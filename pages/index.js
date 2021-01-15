import Head from 'next/head'
import { useRef, useEffect, useState } from "react";

import data from '../public/data/stations.json';
import mapStyles from '../public/styles/map.module.css'

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");


export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [lng, setLng] = useState(2.3797426);
  const [lat, setLat] = useState(48.8960154);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    setPageIsMounted(true);
  }, []);

  useEffect(() => {
    if (pageIsMounted) {
      mapboxgl.accessToken = "pk.eyJ1IjoibWlraGV1bGwiLCJhIjoiY2ppa24wbnVmMjAxZzNxcXAzbGxvcHdwcSJ9.PRr0Bp0Y-i2xUrJ5cBvbPw";

      // Init
      const map = new mapboxgl.Map({
        container: "map-container",
        style: "mapbox://styles/mapbox/light-v10",
        center: [lng, lat],
        zoom: zoom,
      });

      // Geolocalisation
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
      
      // Search input
      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
        })
      );

      // Load stations
      map.on('load', function () {
      
        map.addSource('points', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': data.features
          },
          'cluster': true,
          'clusterMaxZoom': 12,
          'clusterRadius': 50,
          'clusterProperties': {
            'sum': ["+", 1],
          },
        });
        
        // Add a symbol layer
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "points",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": "rgb(229, 36, 59)",
            "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
            "circle-opacity": 0.75,
            "circle-stroke-width": 4,
            "circle-stroke-color": "#fff",
            "circle-stroke-opacity": 0.5,
          },
        });
      
        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "points",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{sum}",
            "text-font": ["Open Sans Bold"],
            "text-size": 16,
          },
          paint: {
            "text-color": "white",
          },
        });
      
        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "points",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": ["step", ["get", "event_count"], 20, 100, 30, 750, 40],
            "circle-color": "rgb(229, 36, 59)",
            "circle-opacity": 0.75,
            "circle-stroke-width": 4,
            "circle-stroke-color": "#fff",
            "circle-stroke-opacity": 0.5,
          },
        });

        map.on("mouseenter", "clusters", function () {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "clusters", function () {
          map.getCanvas().style.cursor = "";
        });

        // Récupérer les données d'une station
        map.on("click", "unclustered-point", function (e) {
          console.log('click', e.features);
        });

        // Récupérer les données d'une station
        map.on("click", "clusters", function (e) {
          map.flyTo({center: e.features[0].geometry.coordinates, zoom: map.getZoom() + 1 });
        });

      });
        
    }
  }, [pageIsMounted]);

  return (
    <div className="container">
      
      <Head>
        <title>Velib</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
        <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js"></script>
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css" type="text/css"/>
        <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
      </Head>

      <div id="map-container" className={mapStyles.map} style={{ height: "100vh", width: "100vw" }} />
    </div>
  )
}
