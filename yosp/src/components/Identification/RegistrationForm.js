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
    Redirect, Link
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
                    addAlert("success", "Registration successful");
                }
            }).catch(() => {
                addAlert("danger", "BackEnd connection lost. Please, check your network ");
            });
    };

    render() {
        const { handleSubmit, invalid } = this.props;
        const { showSpiner, registrationSucceed, } = this.state;
        return (
            <div>
                <div className="registration-form-wrapper">
                <h2 className="registration-form__headline">Let’s create new YoSP account </h2>
                    <form className="registration-form__form" onSubmit={handleSubmit(this.addNewUser)} >
                        <div className="registration-form__input">
                            <Field
                                name="name"
                                label="Enter your name"
                                type="text"
                                placeholder="Example: Jason"
                                component={InputField}
                                validate={[required, maxLengthName, specialSymbols]}
                            />
                        </div>

                        <div className="registration-form__input">
                            <Field
                                name="surname"
                                label="Enter your surname"
                                type="text"
                                placeholder="Example: Bourne"
                                component={InputField}
                                validate={[required, maxLengthSurname, specialSymbols]}
                            />
                        </div>
                        <div className="registration-form__input">
                            <Field
                                name="email"
                                label="Enter your email address"
                                type="text"
                                placeholder="Example: jason.bourne@cia.gov"
                                component={InputField}
                                validate={[required, email]}
                            />
                        </div>
                        <div className="registration-form__input">
                            <Field
                                name="password"
                                label="Your password"
                                type="text"
                                placeholder="***********************"
                                component={InputField}
                                validate={[required, passwordMax, passwordMin]}
                            />
                        </div>
                        <div className="registration-form__input">

                            <Field
                                name="confirmPassword"
                                label="Confirm password"
                                type="text"
                                placeholder="***********************"
                                component={InputField}
                                validate={[required, matchesPassword]}
                            />
                        </div>






                        <div className="registration-form__button-wrapper">
                            <button type="submit" className=" registration-form__button" disabled={invalid}>Create new account</button>
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
                    <div className="registration__link-wrapper">
                        <h2 className="registration__link-headline">Already have an account?</h2>
                        <Link className="registration__link" to="/login">Sign in!</Link>
                    </div>
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
