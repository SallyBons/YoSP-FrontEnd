import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    Redirect
} from 'react-router-dom';
import TextArea from '../Special/TextArea';
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
        console.log(values);
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
            }).catch(() => {
                addAlert("danger", "Server is not responding. Something went wrong");
              });;
    }

    render() {
        const { handleSubmit } = this.props;
        const { operationSuccessfull } = this.state;
        return (

            <div className="add-proxy-form-wrapper">

                <h1 className="add-proxy-form__headline">Add new proxies</h1>

                <form  className="add-proxy-form__form"onSubmit={handleSubmit(this.sendProxyToBack)}>
                    <div className="add-proxy-form__input" >
                        <Field
                            name="proxies"
                            label="Proxies"
                            type="text"
                            component={TextArea}
                        />
                    </div>



                    <div className="add-proxy-form__button-wrapper">
                        <button type="submit" className="add-proxy-form__button uk-button uk-button-default" > Add </button>
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