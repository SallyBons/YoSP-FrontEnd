import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Proxy from './Proxy'
import './styles.css';
import 'uikit/dist/css/uikit.min.css';


class Proxies extends PureComponent {
    state = {
        proxies: [],
    }

    handleDeleteProxy = (id) => {
        const { proxies } = this.state;
        let newProxies = proxies.filter(proxy => proxy.id !== id);
        this.setState({ proxies: newProxies });
    }

    componentDidMount() {
        this.setState({
            proxies: [{
                id: '123',
                status: 'down',
                ip: '1.45.65.78',
                port: '404',
                user: 'Sally',
                password: '111',
                added: '01.01.2019',
                updated: '01.04.2019'
            }]
        })
    }


    render() {
        let { proxies } = this.state;

        return (
            <div className="proxy-wrapper">
                <div className="proxy-header">
                    <h2 className="proxy-main-header"> Proxies</h2>
                    <div className="add-button-wrapper" >
                        <Link className="uk-button uk-button-default" to="/proxies/add">ADD</Link>
                    </div>
                </div>
                <div className="proxy-content-wrapper">
                    {/* <Proxy incomingProxy={proxy}/> */}
                    {proxies.map(proxy => (
                        <Proxy
                            key={proxy.id}
                            toggleDeleteButton={this.handleDeleteProxy}
                            incomingProxy={proxy}
                            {...proxy}
                        />
                    ))}
                </div>
            </div>


        );
    }
}



export default (Proxies);