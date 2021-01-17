import Head from 'next/head'
import axios from 'axios'

import { useRef, useEffect, useState } from "react";
import '../public/styles/meteo.module.css'

export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
 

  useEffect(() => {
    setPageIsMounted(true);
  }, []);

  useEffect(() => {
    if (pageIsMounted) {
        // Paris to default

        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${process.env.METEO_ACCESS_TOKEN}&lang=fr&units=metric`)
          .then(function (response) {
            console.log(response);
          }).catch(err => {
              console.log(err);
          });
    }
  }, [pageIsMounted]);

  return (
    <div className="meteo_container">

      <Head>
        <title>Météo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
          Météo
      </div>
    </div>
  )
}
