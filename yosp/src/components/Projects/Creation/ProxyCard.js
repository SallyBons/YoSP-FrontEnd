import React, { PureComponent } from 'react';


class ProxyCard extends PureComponent {

    state = {
        isButtonActive: false
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

    returnTooltipText = (type) => {
        switch (type) {
            case "active":
                return "Proxy is alive";
            case "suspended":
                return "Proxy is suspended";
            case "pending":
                return "Check is pending";
            default:
                return "Proxy is down";
        }
    }

    selection = () => {
        const { isButtonActive } = this.state;
        this.setState({ isButtonActive: !isButtonActive });
    }

    render() {
        const { incomingProxy } = this.props;
        const { isButtonActive } = this.state;
        return (
            <div className={`proxy-card-wrapper ${isButtonActive === true ? 'active ' : ''}`} onClick={this.selection} >
                <div className="proxy-card__status-indicator-wrapper">
                    <div className={`proxy-card__status-indicator ${this.returnIndicatorClass(incomingProxy.status)}`} data-uk-tooltip={`${this.returnTooltipText(incomingProxy.status)}`}></div>
                </div>
                <div className="proxy-card__server-info">
                    <span> IP:{incomingProxy.ip}</span>
                    <span> Port:{incomingProxy.port}</span>
                </div>
                <div className="proxy-card__user-info">
                    <span> User:{incomingProxy.login}</span>
                    <span>Password:{incomingProxy.password}</span>

                </div>
                <div className="proxy-card__additional-info">
                    <span> Added:{incomingProxy.added}</span>
                    <span> Updated:{incomingProxy.updated}</span>
                </div>
            </div>


        );
    }
}



export default (ProxyCard);