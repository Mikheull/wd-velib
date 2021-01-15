import Head from 'next/head'
import { useRef, useEffect, useState } from "react";

import data from '../public/data/stations.json';

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
      mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

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
      
        map.loadImage( '/images/pin.png',
          function (error, image) {
            if (error) throw error;
            map.addImage('custom-marker', image);
  
            map.addSource('points', {
              'type': 'geojson',
              'data': {
                'type': 'FeatureCollection',
                'features': data.features
              }
            });
            
            // Add a symbol layer
            map.addLayer({
              'id': 'symbols',
              'type': 'symbol',
              'source': 'points',
              'layout': {
                'icon-image': 'custom-marker'
              },
              'filter': ['==', '$type', 'Point']
            });
          }
        );
  
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

      <div id="map-container" style={{ height: "100vh", width: "100vw" }} />

      <style jsx>{`
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
