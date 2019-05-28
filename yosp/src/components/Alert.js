/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import 'uikit/dist/css/uikit.min.css';

class Alert extends PureComponent {

    state = {
        type: "primary",
        message: "Missing alert text"
    }

    render() {
        const { alertText } = this.props
        return (
            <div className="alert-wrapper">
                <div className="uk-alert-danger" data-uk-alert>

                    <a className="uk-alert-close" data-uk-close></a>
                    <h3>Notice</h3>
                    <p>{alertText}</p>
                </div>
            </div>


        );
    }
}

export default Alert;