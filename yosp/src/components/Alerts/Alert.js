/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { deleteAlert } from '../../reducer/alerts';
import 'uikit/dist/css/uikit.min.css';

class Alert extends PureComponent {
    handleDeleteAlert = (alert) => {
        const { deleteAlert } = this.props;
        setTimeout(() => {
            deleteAlert(alert);
        }, 100);
    }

    returnAlertClass = (type) => {
        switch (type) {
            case "danger":
                return "uk-alert-danger";
            case "success":
                return "uk-alert-success";
            case "warning":
                return "uk-alert-warning";
            default:
                return "uk-alert-primary";
        }
    }

    render() {
        const { incommingAlert } = this.props
        return (
            <div className="alert-wrapper">
                <div className={this.returnAlertClass(incommingAlert.type)} data-uk-alert>
                    <a className="uk-alert-close" data-uk-close onClick={() => this.handleDeleteAlert(incommingAlert)} ></a>
                    {/* <h3  className="alert-wrapper__headline" >Notice</h3> */}
                    <p className="alert-wrapper__alert-text">{incommingAlert.text}</p>
                </div>
            </div>


        );
    }
}
const mapDispatchToProps = {
    deleteAlert,
};

export default connect(null, mapDispatchToProps)(Alert);