import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import {
    Redirect
} from 'react-router-dom';
import { compose } from 'redux';
import InputField from '../Special/InputField';
import { selectProxy, loadProxy } from '../../reducer/proxies';
import { addAlert } from '../../reducer/alerts';
import './styles.css';
import GLOBAL_CONFIG from '../../config';
import { selectUser } from '../../reducer/user';


class EditProxy extends Component {
    state = {
        emptyProxyFlag: null,
        oldProxy: {}
    }
    componentDidMount() {
        const { incomingProxy } = this.props.location;
        if (incomingProxy) {
            this.setState({
                emptyProxyFlag: false,
                oldProxy: {
                    ip: incomingProxy.ip,
                    port: incomingProxy.port,
                    login: incomingProxy.login,
                    password: incomingProxy.password,
                }
            });
            this.props.change('ip', incomingProxy.ip);
            this.props.change('port', incomingProxy.port);
            this.props.change('user', incomingProxy.login);
            this.props.change('password', incomingProxy.password);
        } else {
            this.setState({ emptyProxyFlag: true });
        }
    }
    updateProxyOnBack = (values) => {
        let { user, addAlert } = this.props;
        let { oldProxy } = this.state;
        fetch(`${GLOBAL_CONFIG.backendUrl}/proxies/update?token=${user.token}`, {
            method: 'post',
            body: JSON.stringify({
                "old_proxy": `${oldProxy.login}:${oldProxy.password}@${oldProxy.ip}:${oldProxy.port}`,
                "new_proxy": `${values.user}:${values.password}@${values.ip}:${values.port}`,
            })
        })//endpoint to proxies
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                 if (answer.status === 200) {
                    addAlert("success", "Proxies are successfully updated");
                    this.setState({ emptyProxyFlag: true });
                } else {
                    addAlert("warning", answer.error)
                }
                
            }).catch(() => {
                addAlert("danger", "Server is not responding. Something went wrong");
              });;
    }


    render() {

        const { handleSubmit } = this.props;
        const { emptyProxyFlag } = this.state;
        return (

            <div className="edit-proxy-form-wrapper">

                {emptyProxyFlag ? <Redirect to="/proxies" /> : true}

                <h2 className="edit-proxy-form__headline">Edit proxies</h2>

                <form onSubmit={handleSubmit(this.updateProxyOnBack)}>

                    <div className="edit-proxy-form__input">
                        <Field
                            name="ip"
                            label="IP"
                            type="text"
                            component={InputField}
                        />
                    </div>

                    <div className="edit-proxy-form__input">
                        <Field
                            name="port"
                            label="Port"
                            type="text"
                            component={InputField}
                        />
                    </div>

                    <div className="edit-proxy-form__input">
                        <Field
                            name="user"
                            label="User"
                            type="text"
                            component={InputField}
                        />
                    </div>

                    <div className="edit-proxy-form__input">
                        <Field
                            name="password"
                            label="Password"
                            type="text"
                            component={InputField}
                        />
                    </div>



                    <div className="add-proxy-form__button-wrapper">
                        <button type="submit" className="edit-proxy-form__button uk-button uk-button-default" >Edit </button>
                    </div>

                </form>

            </div>
        );

    }

    
}

const mapStateToProps = state => ({
    formData: getFormValues('EditProxy')(state),
    proxy: selectProxy(state),
    user: selectUser(state),
});

const mapDispatchToProps = {
    loadProxy,
    addAlert,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'EditProxy',
        enableReinitialize: true,
         })
)(EditProxy);