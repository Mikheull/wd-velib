import React, {Component, useRef, useEffect, useState} from 'react';
import axios from 'axios'
import moment from 'moment';
import 'moment/locale/fr';

// Components
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header';

// Styles
import '../public/styles/meteo.module.css'

class Meteo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      temp: 0,
      icon: 'false'
    }
  }
    
  componentDidMount() {
    var self = this;

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${process.env.METEO_ACCESS_TOKEN}&lang=fr&units=metric`)
      .then(function (response) {
        console.log(response);
          self.setState({temp: response.data.main.temp});
          self.setState({icon: response.data.weather[0].icon});
      }).catch(err => {
          console.log(err);
      });
  }

  componentWillUnmount() {
  }

  render() {
      const img = `https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${this.state.icon}.png`;
      return (
        <div className="container">
        
          <Head>
            <title>Velib x Waze - Météo</title>
            <link rel="icon" href="/favicon.ico" />
            <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
          </Head>
    
          <div className="meteo_container">
            <Header />
            <div className="meteo">
              {/* <Link href="./">
                <a  className="back_button"><img src="images/icons/next.svg"></img></a>
              </Link> */}
              <a href="./" className="back_button"><img src="images/icons/next.svg"></img></a>
              
              <div className="header">
                <div className="temp">{this.state.temp} °C</div>
                <div className="icon"><img src={img}></img></div>
              </div>
              <div className="date">{moment().format('DD/MM/YY')}</div>
              <div className="day">{moment().format('dddd')}</div>
            </div>
          </div>
        </div>
      );
  }
}

export default Meteo;