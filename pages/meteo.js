import Head from 'next/head'
import axios from 'axios'
import moment from 'moment';

import { useRef, useEffect, useState } from "react";
import '../public/styles/meteo.module.css'
import 'moment/locale/fr';

export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [temp, setTemp] = useState(Number)
  const [icon, setIcon] = useState(String)

  useEffect(() => {
    setPageIsMounted(true);
  }, []);

  useEffect(() => {
    if (pageIsMounted) {

      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${process.env.METEO_ACCESS_TOKEN}&lang=fr&units=metric`)
        .then(function (response) {
          // console.log(response);

          setTemp(response.data.main.temp)
          setIcon(response.data.weather[0].main)
          
        }).catch(err => {
            console.log(err);
        });
    }
  }, [pageIsMounted]);

  return (
    <div className="container">

      <Head>
        <title>Météo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="meteo_container">

        <div className="meteo">
          <a href="../" className="back_button"><img src="images/icons/next.svg"></img></a>
          <div className="header">
            <div className="temp">{temp} °C</div>
            <div className="icon"><img src="images/icons/Clear.svg"></img></div>
          </div>
          <div className="date">{moment().format('DD/MM/YY')}</div>
          <div className="day">{moment().format('dddd')}</div>
        </div>
      </div>

    </div>
  )
}
