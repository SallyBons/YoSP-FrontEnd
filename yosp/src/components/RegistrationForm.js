import React, { PureComponent } from 'react';
import {
    Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputField from './InputField.js';
// import { 
//     required, minLengthOverview, matchesPassword, email
// } from './validation';
 import { addNewUser} from '../components/auth/auth';

 import { loadUser } from '../reducer/user';

import './styles.css';

class RegistrationForm extends PureComponent {

    render() {
        const { handleSubmit, invalid } = this.props;
        return (


            <form onSubmit={handleSubmit}>

                <Field
                    name="name"
                    label="Name"
                    type="text"
                    component={InputField}
                // validate={[required, minLengthOverview]}
                />

                <Field
                    name="surname"
                    label="Surname"
                    type="text"
                    component={InputField}
                // validate={[required, minLengthOverview]}
                />
                <Field
                    name="email"
                    label="E-mail"
                    type="text"
                    component={InputField}
                // validate={[required, email, validateUserEmailRegistraion]}
                />

                <Field
                    name="password"
                    label="Password"
                    type="text"
                    component={InputField}
                // validate={[required, minLengthOverview]}
                />


                <Field
                    name="confirmPassword"
                    label="Confirm Password"
                    type="text"
                    component={InputField}
                // validate={[required, matchesPassword]}
                />






                <div className="form__button--wrapper">
                    <button type="submit" className="form__button send" disabled={invalid}>Confirm registration</button>
                </div>

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
    connect(null, { mapStateToProps,loadUser}),
    reduxForm({
        form: 'RegistrationForm',
        enableReinitialize: true,
        onSubmit: (values, props, state) => {
            const user = addNewUser(values.name, values.surname, values.password, values.email);
            state.loadUser(user);
        }
    })
)(RegistrationForm);
