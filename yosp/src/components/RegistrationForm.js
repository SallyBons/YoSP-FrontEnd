import React, { PureComponent } from 'react';
import {
    Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputField from './InputField.js';
import {
    required, maxLengthName, maxLengthSurname, specialSymbols, matchesPassword, email, passwordMax, passwordMin,
} from './validation';

import { loadUser } from '../reducer/user';
import GLOBAL_CONFIG from '../config';
import Spiner from '../components/Spiner'
import './styles.css';
import { setTimeout } from 'timers';

class RegistrationForm extends PureComponent {
    state = {
        showSpiner: false,
    }

    addNewUser = (values) => {
        this.setState({showSpiner:true})
        fetch(`${GLOBAL_CONFIG.backendUrl}/user/add?name=${values.name}&surname=${values.surname}&email=${values.email}&password=${values.password}`)
            .then(result => result.text())
            .then(result => {
                console.log(JSON.parse(result));
                this.setState({showSpiner:false})
            });
    };

    render() {
        const { handleSubmit, invalid } = this.props;
        const { showSpiner } = this.state;
        return (

            <form onSubmit={handleSubmit(this.addNewUser)} test="test">

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

                <div className="form__button--wrapper">
                    <button type="submit" className="form__button send" disabled={invalid}>Confirm registration</button>
                </div>

                {showSpiner ? 
                   <Spiner />
                : 
                    ''
                }

            </form>
        );
    }
}

const selector = formValueSelector('RegistrationForm');

const mapStateToProps = state => ({
    name: selector(state, 'name', 'surname'),
    formData: getFormValues('RegistrationForm')(state)
});

export default compose(
    connect(null, { mapStateToProps, loadUser }),
    reduxForm({
        form: 'RegistrationForm',
        enableReinitialize: false,
        // onSubmit: (values, props, state) => {
        //     console.log(state);
        //     // addNewUser(values.name, values.surname, values.email, values.password)
        //     setTimeout(() => {
        //         console.log("hello")
        //     }, 1);
        // }
    })
)(RegistrationForm);
