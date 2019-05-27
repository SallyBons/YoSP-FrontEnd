import React, { PureComponent } from 'react';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputField from './InputField';
import Spiner from '../components/Spiner'
import {
  required, email
} from '../components/validation';
import GLOBAL_CONFIG from '../config';
import { loadUser } from '../reducer/user';
import 'uikit/dist/css/uikit.min.css';


class LogIn extends PureComponent {
  state = {
    showSpiner: false,
  }
  loginFunction = (values) => {
    let { loadUser } = this.props;
    this.setState({ showSpiner: true })
    fetch(`${GLOBAL_CONFIG.backendUrl}/user/auth?email=${values.email}&password=${values.password}`)
      .then(result => result.text())
      .then(result => {
        let user = JSON.parse(result);
        if (user.name) {
          loadUser(user);
        }
        this.setState({ showSpiner: false })
      });
  }

  render() {
    const { handleSubmit, invalid } = this.props;
    const { showSpiner } = this.state;
    return (

      <div className="login-form-wrapper">
        <form onSubmit={handleSubmit(this.loginFunction)}>

          <div className="">
            <Field
              name="email"
              label="E-mail"
              type="text"
              component={InputField}
              validate={[email, required]}
            />
          </div>


          <div>
            <Field
              name="password"
              label="Password"
              type="text"
              component={InputField}
              validate={[required]}
            />
          </div>




          <div className="uk-margin">
            <button type="submit" className="uk-button uk-button-default" disabled={invalid}>Login</button>
          </div>

          {showSpiner ?
            <Spiner />
            :
            ''
          }

        </form>
      </div>


    );
  }
}

const selector = formValueSelector('LogInForm');

const mapStateToProps = state => ({
  name: selector(state, 'email', 'password'),
  formData: getFormValues('LogInForm')(state)
});

export default compose(
  connect(null, { mapStateToProps, loadUser }),
  reduxForm({
    form: 'LogInForm',
    enableReinitialize: true,
  })
)(LogIn);