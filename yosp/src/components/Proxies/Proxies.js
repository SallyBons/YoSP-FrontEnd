import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import Proxy from './Proxy'
import './styles.css';
import 'uikit/dist/css/uikit.min.css';


class Proxies extends PureComponent {
    state = {

    }



    render() {
        const proxy ={
            id:'123',
            status:'down',
            ip:'1.45.65.78',
            port:'404',
            user:'Sally',
            password:'111',
            added:'01.01.2019',
            updated: '01.04.2019'
        }
        return (
            <div className="proxy-wrapper">
                <div className="proxy-header">
                    <h2 className="proxy-main-header"> Proxies</h2>
                    <div className="add-button-wrapper" >
                        <NavLink className="uk-button uk-button-default" to="/proxies/add">ADD</NavLink>
                    </div>
                   

                </div>
                <div className="proxy-content-wrapper">
                        <Proxy incomingProxy= {proxy}/>
                    </div>
            </div>


        );
    }
}



export default (Proxies);