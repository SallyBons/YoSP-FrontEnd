import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Proxy from './Proxy';
import { connect } from 'react-redux';
import './styles.css';
import 'uikit/dist/css/uikit.min.css';
import GLOBAL_CONFIG from '../../config';
import { selectUser } from '../../reducer/user';
import { addAlert } from '../../reducer/alerts';


class Proxies extends PureComponent {
    state = {
        proxies: [],
    }
    componentDidMount() {
        this.handleInitialize()
    }

    handleInitialize() {
        setTimeout(() => {
            let { user } = this.props;
            this.getListOfProxies(user)//without this we have empty user at props on initialazing
        }, 1);
    }



    handleDeleteProxy = (id, login, password, ip, port) => {
        let { user, addAlert } = this.props;
        // let newProxies = proxies.filter(proxy => proxy.id !== id);
        // this.setState({ proxies: newProxies });
        fetch(`${GLOBAL_CONFIG.backendUrl}/proxies/remove?token=${user.token}`, {
            method: 'post',
            body: JSON.stringify({
                "proxies": [`${login}:${password}@${ip}:${port}`],
            })
        })//endpoint to delete proxies
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                if (answer.status === 200) {
                    addAlert("success", "Proxies are removed successfully");
                    this.getListOfProxies(user);
                } else {
                    addAlert("warning", answer.error);
                }

            })
    }


    getListOfProxies = (user) => {
        let { addAlert } = this.props;
        fetch(`${GLOBAL_CONFIG.backendUrl}/proxies/get?token=${user.token}`)
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                if (answer.error) {
                    addAlert("warning", answer.error);
                } else {
                    this.setState({ proxies: answer.proxies })
                }
            });
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
const mapStateToProps = state => ({
    user: selectUser(state),
});
const mapDispatchToProps = {
    addAlert
};





export default connect(mapStateToProps, mapDispatchToProps)(Proxies)
