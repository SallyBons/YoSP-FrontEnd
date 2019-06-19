import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    Redirect
} from 'react-router-dom';
import TextArea from '../Special/TextArea';
import { selectProxy } from '../../reducer/proxies';
import GLOBAL_CONFIG from '../../config';
import { addAlert } from '../../reducer/alerts';
import './styles.css';
import { selectUser } from '../../reducer/user';


class AddProxy extends Component {
    
    state = {
        operationSuccessfull: false,
    }

    sendProxyToBack = (values) => {
        let { user, addAlert } = this.props;
        fetch(`${GLOBAL_CONFIG.backendUrl}/proxies/add?token=${user.token}`, {
            method: 'post',
            body: JSON.stringify({
                "proxies": values.proxies.split('\n'),
            })
        })//endpoint to proxies
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                if (answer.status === 200) {
                    addAlert("success", "Proxies are added successfully");
                    this.setState({ operationSuccessfull: true });
                } else {
                    addAlert("warning", answer.error);
                }
            });
    }

    render() {
        const { handleSubmit } = this.props;
        const { operationSuccessfull } = this.state;
        return (

            <div className="form add-new-movie">

                <h1 className="form__headline">Add new proxies</h1>

                <form onSubmit={handleSubmit(this.sendProxyToBack)}>

                    <Field
                        name="proxies"
                        label="Proxies"
                        type="text"
                        component={TextArea}
                    />


                    <div className="form__button--wrapper">
                        <button type="submit" className="uk-button uk-button-default" > Add </button>
                    </div>
                    {operationSuccessfull ?
                        <Redirect to="/proxies" />
                        :
                        ''
                    }

                </form>

            </div>
        );

    }
}

const mapStateToProps = state => ({
    formData: getFormValues('AddProxy')(state),
    proxy: selectProxy(state),
    user: selectUser(state),
});

const mapDispatchToProps = {
    addAlert
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'AddProxy',
    })
)(AddProxy);