import React, {Component} from 'react';

// Components
import Link from 'next/link'

// Styles
import '../public/styles/global.css';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="pageHeader">
                <nav role="navigation">
                    <div id="menuToggle">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>

                        <ul id="menu">
                            {/* <li><Link href="./"><a>Map</a></Link></li>
                            <li><Link href="./meteo"><a>Météo</a></Link></li>
                            <li><Link href="./help"><a>Aide</a></Link></li>
                            <li><Link href="./cgu"><a>CGU / RGPD</a></Link></li> */}
                            <li><a href="./">Map</a></li>
                            <li><a href="./meteo">Météo</a></li>
                            <li><a href="./help">Aide</a></li>
                            <li><a href="./cgu">CGU / RGPD</a></li>
                            <a href="https://github.com/Mikheull/" target="_blank"><li>Github</li></a>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;