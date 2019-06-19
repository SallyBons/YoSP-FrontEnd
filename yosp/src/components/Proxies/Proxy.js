import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';



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
        const {toggleDeleteButton, id} = this.props;
        toggleDeleteButton(id);
      }

    render() {
        const { incomingProxy } = this.props;
        return (
            <div className="proxy-element-wrapper">
                <div className="status-indicator">
                    <div className={`indicator ${this.returnIndicatorClass(incomingProxy.status)}`} ></div>
                </div>
                <div className="server-info">
                    <span> IP:{incomingProxy.ip}</span>
                    <span> Port:{incomingProxy.port}</span>
                </div>
                <div className="user-info">
                    <span> User:{incomingProxy.user}</span>
                    <span>Password:{incomingProxy.password}</span>

                </div>
                <div className="additional-info">
                    <span> Added:{incomingProxy.added}</span>
                    <span> Updated:{incomingProxy.updated}</span>
                </div>
                <div className="proxy-buttons-wrapper">
                    {/* <Link to="/proxies/edit" incomingProxy={incomingProxy}>Edit</Link> */}
                    {/* <Link className="uk-button uk-button-default" to={{ pathname: "/proxies/edit", incomingProxy:  incomingProxy  }}>Edit</Link> */}

                    <button className="uk-button uk-button-default" onClick={this.handleDeleteButton}>Delete</button>
                </div>


            </div>


        );
    }
}



export default (Proxy);