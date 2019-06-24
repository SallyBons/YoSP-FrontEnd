import React, { PureComponent } from 'react';
 import { Link } from 'react-router-dom';



class Proxy extends PureComponent {


    state = {
        indicatorFlag: "down",
    }
    returnIndicatorClass = (type) => {
        switch (type) {
            case "active":
                return "active";
            case "suspended":
                return "suspended";
            case "pending":
                return "pending";
            default:
                return "down";
        }
    }
    handleDeleteButton = () => {
        const { toggleDeleteButton, id, login, password, ip, port } = this.props;
        toggleDeleteButton(id, login, password, ip, port);
    }

    render() {
        const { incomingProxy } = this.props;
        return (
            <div className="proxy-wrapper">
                <div className="proxy__status-indicator-wrapper">
                    <div className={`proxy__status-indicator ${this.returnIndicatorClass(incomingProxy.status)}`} ></div>
                </div>
                <div className="proxy__server-info">
                    <span> IP:{incomingProxy.ip}</span>
                    <span> Port:{incomingProxy.port}</span>
                </div>
                <div className="proxy__user-info">
                    <span> User:{incomingProxy.login}</span>
                    <span>Password:{incomingProxy.password}</span>

                </div>
                <div className="proxy__additional-info">
                    <span> Added:{incomingProxy.added}</span>
                    <span> Updated:{incomingProxy.updated}</span>
                </div>
                <div className="proxy__buttons-wrapper">
                    {/* <Link className=" proxy__button uk-button uk-button-default" to="/proxies/edit" incomingProxy={incomingProxy}>Edit</Link> */}
                    <Link className="proxy__button uk-button uk-button-default" to={{ pathname: "/proxies/edit", incomingProxy:  incomingProxy  }}>Edit</Link>

                    <button className=" proxy__button uk-button uk-button-default" onClick={this.handleDeleteButton}>Delete</button>
                </div>


            </div>


        );
    }
}



export default (Proxy);