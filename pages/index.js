import React, {Component, useRef, useEffect, useState} from 'react';
import axios from 'axios'
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

// Components
import Head from 'next/head'
import Link from 'next/link'
import StationDetails from '../components/StationDetails';

// Styles
import '../public/styles/map.module.css';

// Datas
import stations from '../public/data/stations.json';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lng: 2.3797426,
      lat: 48.8960154,
      zoom: 11,
      stationsData: {
        name: null, 
        stationcode: null, 
        nom_arrondissement_communes: null, 
        capacity: null, 
        is_installed: null, 
        is_returning: null, 
        is_renting: null, 
        mechanical: null, 
        ebike: null, 
        numdocksavailable: null
      },
      stationVisibility: false
    }
  }
    
  componentDidMount() {
    var self = this;
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

    // Init
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/light-v10",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
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
    map.on('load', async function () {
      
      // Ajout du fichier source des stations
      map.addSource('points', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': stations
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

      map.addLayer({
        id: "unclustered-point-label",
        type: "symbol",
        source: "points",
        minzoom: 15,
        layout: {
            "text-field": "{name}",
            "text-anchor": "top",
            "text-offset": [0,0.5],
        },
        paint: {
          "text-color": "rgb(229, 36, 59)"
        }
      });
    

      map.on("mouseenter", "unclustered-point", function () {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "unclustered-point", function () {
        map.getCanvas().style.cursor = "";
      });

      // Popin de station
      map.on("click", "unclustered-point", function (e) {
        // Retour API et affichage de la popin
        axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=stationcode%3D${e.features[0].properties.stationcode}`)
          .then((response) => {
            let _data = response.data.records;
            const pre = _data[0].fields;
            self.setState({stationsData: pre});
            self.setState({stationVisibility: true});
          })
        .catch((error)=>{
          console.log(error);
        });
      });

      // Zoom on cluster
      map.on("click", "clusters", function (e) {
        map.flyTo({center: e.features[0].geometry.coordinates, zoom: map.getZoom() + 1 });
      });

    });
  }

  componentWillUnmount() {
  }

  closeStation() {
    this.setState({stationVisibility: false});
  }

  render() {
      return (
        <div className="container">
        
          <Head>
            <title>Velib x Waze</title>
            <link rel="icon" href="/favicon.ico" />
            <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
            <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js"></script>
            <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css" type="text/css"/>
            <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
          </Head>
    
          <div id="map-container"/>
          <StationDetails 
            key="x" 
            data={this.state.stationsData} 
            visible={this.state.stationVisibility}
            closeMethod={() => this.closeStation()} 
            />
        </div>
      );
  }
}

export default Home;