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
                            <li><img src="images/icons/arrow-right-circle.svg" alt=""/> <Link href="./">Trouver un vélo</Link></li>
                            <li><img src="images/icons/arrow-right-circle.svg" alt=""/> <Link href="./meteo">Ma météo</Link></li>
                            <li><img src="images/icons/arrow-right-circle.svg" alt=""/> <Link href="./cgu">CGU / RGPD</Link></li>
                            <li><a href="https://github.com/Mikheull/" target="_blank">Github</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;