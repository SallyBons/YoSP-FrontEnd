import React, { PureComponent } from 'react';
import {
    Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputField from './InputField.js';
import {
    required, maxLengthName, maxLengthSurname, specialSymbols, matchesPassword, email, passwordMax, passwordMin
} from './validation';
import {
    Redirect
} from 'react-router-dom';
import GLOBAL_CONFIG from '../config';
import Spiner from '../components/Spiner';
import Alert from '../components/Alert';
import './styles.css';
import 'uikit/dist/css/uikit.min.css';

class RegistrationForm extends PureComponent {
    state = {
        showSpiner: false,
        registrationSucseed: false,
        showAlert: false,
        alertText: ''
    }

    addNewUser = (values) => {
        this.setState({ showSpiner: true })
        fetch(`${GLOBAL_CONFIG.backendUrl}/user/add?name=${values.name}&surname=${values.surname}&email=${values.email}&password=${values.password}`)
            .then(result => result.text())
            .then(result => {
                console.log(JSON.parse(result));
                let answer = JSON.parse(result);
                this.setState({ showSpiner: false });
                if (answer.error) {
                    this.showAlert(answer.error);
                } else {
                    this.setState({ registrationSucseed: true })
                }


            });
    };

    showAlert = (error) => {
        this.setState({
            showAlert: true,
            alertText: error
        })
    }

    render() {
        const { handleSubmit, invalid } = this.props;
        const { showSpiner, registrationSucseed, showAlert, alertText } = this.state;
        return (
            <div>
                <div className="login-form-wrapper">
                    <form onSubmit={handleSubmit(this.addNewUser)} >

                        <Field
                            name="name"
                            label="Name"
                            type="text"
                            component={InputField}
                            validate={[required, maxLengthName, specialSymbols]}
                        />

                        <Field
                            name="surname"
                            label="Surname"
                            type="text"
                            component={InputField}
                            validate={[required, maxLengthSurname, specialSymbols]}
                        />
                        <Field
                            name="email"
                            label="E-mail"
                            type="text"
                            component={InputField}
                            validate={[required, email]}
                        />

                        <Field
                            name="password"
                            label="Password"
                            type="text"
                            component={InputField}
                            validate={[required, passwordMax, passwordMin]}
                        />

                        <Field
                            name="confirmPassword"
                            label="Confirm Password"
                            type="text"
                            component={InputField}
                            validate={[required, matchesPassword]}
                        />

                        <div className="uk-margin">
                            <button type="submit" className="uk-button uk-button-default" disabled={invalid}>Confirm registration</button>
                        </div>

                        {showSpiner ?
                            <Spiner />
                            :
                            ''
                        }
                        {registrationSucseed ?
                            <Redirect to="/login" />
                            :
                            ''
                        }

                    </form>
                </div>
                {showAlert ?
                    <Alert alertText={alertText} />
                    :
                    ''
                }

            </div>


        );
    }
}

const selector = formValueSelector('RegistrationForm');

const mapStateToProps = state => ({
    name: selector(state, 'name', 'surname'),
    formData: getFormValues('RegistrationForm')(state)
});

export default compose(
    connect(null, { mapStateToProps }),
    reduxForm({
        form: 'RegistrationForm',
        enableReinitialize: false,
    })
)(RegistrationForm);
