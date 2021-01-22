import React, {Component, useRef, useEffect, useState} from 'react';

// Components
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header';

// Styles
import '../public/styles/cgu.module.css'

class CGU extends Component {

  constructor(props) {
    super(props);
  }
    
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="container">
      
        <Head>
          <title>Velib x Waze - CGU / RGPD</title>
          <link rel="icon" href="/favicon.ico" />
          <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" /> 
        </Head>
  
        <div className="cgu_container">
          <Header />
          <div className="cgu">
            
            <div className="wrapper">
              <h2>CGU</h2>
              <h3>Article 1</h3>
              <div className="paragraph">
                <h4>Lorem ipsum dolor sit</h4>
                <p>Cras vitae odio leo. Duis sit amet aliquam tellus, nec hendrerit magna. Sed tempus enim quis mauris consequat accumsan. Aenean fermentum sit amet risus vitae sodales. In hac habitasse platea dictumst. Aenean in mauris mauris. Mauris auctor, sapien non vulputate porta, erat nibh facilisis massa, nec efficitur nisi diam nec sapien.</p>
              </div>
              <div className="paragraph">
                <h4>Donec consequat</h4>
                <p>Cras molestie sagittis dolor condimentum fringilla. Donec consequat est fermentum nibh consequat, sed ornare quam sodales. Donec semper mi tellus, quis dignissim lacus congue vel. Aliquam blandit et dolor a fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis felis at risus placerat dictum. Donec elementum leo id nisl tempor luctus. Maecenas ultrices nulla sed tellus pharetra gravida. Maecenas eget luctus odio. Nam semper augue magna, at facilisis neque tincidunt ac. Nulla vitae leo convallis, posuere lacus sit amet, molestie est. Aenean nec elit ante. Quisque in tincidunt felis. Mauris sed sem commodo, varius diam sed, tempus nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec rhoncus sem eget nunc placerat, nec lacinia sem hendrerit.</p>
              </div>

              <h3>Article 2</h3>
              <div className="paragraph">
                <h4>Donec consequat est fermentum</h4>
                <p>Phasellus sit amet est vel enim eleifend rhoncus ac non nibh. Donec id sagittis urna. Mauris arcu velit, facilisis ac libero a, ullamcorper finibus elit. In sit amet lorem nunc. </p>
              </div>
            </div>

            <div className="wrapper">
              <h2>RGPD</h2>
              <div className="paragraph">
                <h4>Suspendisse eget interdum</h4>
                <p>Cras molestie, est non consequat aliquam, orci ipsum convallis sapien, sed interdum libero risus sit amet lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec tempor eleifend purus vitae tristique. Aliquam auctor risus justo, id ultricies erat faucibus vel. Curabitur tincidunt turpis et semper consequat. Etiam a elit viverra, commodo mi sed, posuere justo. Sed rhoncus tellus et dignissim lobortis. Integer auctor tempus mi, vel efficitur massa sollicitudin eget. Sed iaculis sem ut sem posuere, non sollicitudin eros pretium. Morbi id facilisis lacus, sit amet molestie sem. Aliquam interdum augue nec interdum euismod. Nam vestibulum arcu ac justo scelerisque, ut pretium orci aliquet. Proin vitae sollicitudin est. Etiam tempor vehicula augue nec efficitur.</p>
              </div>
              <div className="paragraph">
                <p>Vivamus libero orci, ornare ac neque non, pellentesque consectetur mi. Curabitur fermentum metus vel metus varius aliquet. Aliquam erat volutpat. Sed a laoreet massa. Curabitur elementum viverra eros, ac euismod lectus mollis eu. Pellentesque tincidunt ex massa, non posuere urna lobortis efficitur. Donec eget erat quam. Praesent vel quam pharetra, euismod nulla et, tempor nisi. Praesent sodales, nisi tincidunt pharetra accumsan, libero dolor ornare arcu, vel posuere lacus ipsum sed arcu. Sed lorem ante, venenatis sit amet risus ut, pulvinar convallis nisl. Sed sit amet ex non metus malesuada vehicula sit amet vel augue. Duis lectus lectus, placerat quis eros dignissim, faucibus pulvinar nunc. Mauris ultrices leo ut euismod vestibulum.</p>
              </div>
              <div className="paragraph">
                <h4>Orci varius natoque penatibus</h4>
                <p>Cras nibh arcu, condimentum in felis sed, suscipit lobortis neque. Aenean gravida augue vehicula dui venenatis euismod. Donec imperdiet ipsum in fermentum imperdiet. In ultrices orci at vestibulum venenatis. Duis hendrerit urna dapibus, vehicula lectus ut, pulvinar eros. Pellentesque volutpat urna nulla, sit amet molestie est mattis vitae. Morbi euismod eget mauris et fermentum. Aliquam erat volutpat. Mauris sit amet ipsum non metus maximus aliquet a molestie sapien. Nulla dapibus porttitor turpis quis suscipit. Proin scelerisque, ipsum sed vulputate suscipit, felis velit eleifend enim, a euismod erat diam a eros. Proin at eros magna. In vitae eleifend urna, sagittis dignissim erat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CGU;