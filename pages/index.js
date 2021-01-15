import Head from 'next/head'
import { useRef, useEffect, useState } from "react";
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

      const map = new mapboxgl.Map({
        container: "map-container",
        style: "mapbox://styles/mapbox/light-v10",
        center: [lng, lat],
        zoom: zoom,
      });
    }
  }, [pageIsMounted]);

  return (
    <div className="container">
      
      <Head>
        <title>Velib</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
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
