import React, {Component} from 'react';

// Styles
import '../public/styles/map.module.css';

class StationDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let items = [];
        for (let i = 0; i <= 23; i++) {
            items.push(<div key={i} className="item_timeline">
                <p>{i}:00</p>
                <div>
                    <div className="bar_mechanical bar"></div>
                    <div className="bar_electric bar"></div>
                    <div className="bar_place bar"></div>
                </div>
            </div>)
          }
          
        return (
            <section className={"station_details " + (this.props.visible ? 'show' : 'hidden')}>
                <div className="header">
                    <span className="close" onClick={this.props.closeMethod}><img src="images/icons/close.svg" alt=""/></span>
                    <h2 className="title">{this.props.data.name}</h2>
                    <div className="affluence">
                        <span><img src="images/icons/affluence_1.svg" alt=""/></span>
                        <span><img src="images/icons/affluence_1.svg" alt=""/></span>
                        <span><img src="images/icons/affluence_1.svg" alt=""/></span>
                        <span><img src="images/icons/affluence_1.svg" alt=""/></span>
                        <span><img src="images/icons/affluence_0.svg" alt=""/></span>
                        <p>Très affluente aujourd'hui</p>
                    </div>
                </div>
                
                <div className="body">
                    <div className="wrapper">
                        <div className="title">Description <span className="code">#{this.props.data.stationcode}</span></div>
                        <p className="desc">Cette station situé à {this.props.data.nom_arrondissement_communes} peut contenir jusqu'à {this.props.data.capacity} vélos. La station est actuellement {(this.props.data.is_installed == 'OUI' && this.props.data.is_returning == 'OUI') ? 'ouverte' : 'fermée'}. Vous {(this.props.data.is_renting == 'OUI') ? 'pouvez' : 'ne pouvez pas'} prendre un abonnement directement sur place via la borne !</p>
                        
                        <div className="separator"></div>
                    
                        <div className="details">
                            <div className="item_details mechanical">
                                <p>{this.props.data.mechanical}</p>
                                <img src="images/icons/mechanical.svg" alt=""/>
                            </div>
                            <div className="item_details electric">
                                <p>{this.props.data.ebike}</p>
                                <img src="images/icons/electric.svg" alt=""/>
                            </div>
                            <div className="item_details place">
                                <p>{this.props.data.numdocksavailable}</p>
                                <img src="images/icons/place.svg" alt=""/>
                            </div>
                        </div>
                        <button className="button">Y aller</button>
                        <div className="separator"></div>
                    </div>
                    
                    <div className="wrapper_prediction">
                        <div className="title">Quand avoir un vélo ?</div>
                    
                        <div className="timeline">{items}</div>
                    </div>
                </div>
            </section>
        )
    }
}

export default StationDetails;