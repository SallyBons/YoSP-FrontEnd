import React, { PureComponent } from 'react';
import {
    Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputField from '../Special/InputField';
import {
    required, maxLengthName, maxLengthSurname, specialSymbols, matchesPassword, email, passwordMax, passwordMin
} from '../../components/Special/validation';
import {
    Redirect
} from 'react-router-dom';
import GLOBAL_CONFIG from '../../config';
import Spiner from '../Special/Spiner';
import { addAlert } from '../../reducer/alerts';
import './styles.css';
import 'uikit/dist/css/uikit.min.css';

class RegistrationForm extends PureComponent {

    componentDidMount() {
        document.title = 'YoSP: Registration';
    }


    state = {
        showSpiner: false,
        registrationSucceed: false,

    }

    addNewUser = (values) => {
        this.setState({ showSpiner: true })
        const { addAlert } = this.props;
        fetch(`${GLOBAL_CONFIG.backendUrl}/user/add?name=${values.name}&surname=${values.surname}&email=${values.email}&password=${values.password}`)
            .then(result => result.text())
            .then(result => {
                console.log(result);
                let answer = JSON.parse(result);
                
                this.setState({ showSpiner: false });
                if (answer.error) {
                    addAlert("warning", answer.error);
                } else {
                    this.setState({ registrationSucceed: true });
                    addAlert("success","Registration successful");
                }
            }).catch(() => {
                addAlert("danger", "BackEnd connection lost. Please, check your network or get your provider pizdi");
               });
    };

    render() {
        const { handleSubmit, invalid } = this.props;
        const { showSpiner, registrationSucceed, } = this.state;
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
                        {registrationSucceed ?
                            <Redirect to="/login" />
                            :
                            ''
                        }

                    </form>
                </div>

            </div>


        );
    }
}

const selector = formValueSelector('RegistrationForm');

const mapStateToProps = state => ({
    name: selector(state, 'name', 'surname'),
    formData: getFormValues('RegistrationForm')(state)
});
const mapDispatchToProps = {
    addAlert,
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'RegistrationForm',
        enableReinitialize: false,
    })
)(RegistrationForm);
