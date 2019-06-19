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
            this.getListOfProxies(user)
        }, 1);
    }

    // componentDidMount() {

    //     this.setState({
    //         proxies: [{
    //             id: '123',
    //             status: 'down',
    //             ip: '1.45.65.78',
    //             port: '404',
    //             user: 'Sally',
    //             password: '111',
    //             added: '01.01.2019',
    //             updated: '01.04.2019'
    //         }]
    //     })
    // }

    handleDeleteProxy = (id) => {
        const { proxies } = this.state;
        let newProxies = proxies.filter(proxy => proxy.id !== id);
        this.setState({ proxies: newProxies });
    }


    getListOfProxies = (user) => {
        let { addAlert } = this.props;
        fetch(`${GLOBAL_CONFIG.backendUrl}/proxies/get?token=${user.token}`)
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                console.log(answer);
                if (answer.error){
                    addAlert("warning", answer.error);
                }else{
                    this.setState({proxies:answer.proxies})
                }
                // if (answer.useragents) {
                //   let parsedUserAgents = JSON.parse(answer.useragents);



                //   this.props.change('textarea1',parsedUserAgents.join('\n'));
                // }
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





export default connect(mapStateToProps,mapDispatchToProps)(Proxies)
