import React, { PureComponent } from 'react';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Cookies from 'universal-cookie';
import {
  Redirect, Link
} from 'react-router-dom';

import GLOBAL_CONFIG from '../../config';

import 'uikit/dist/css/uikit.min.css';

import { loadUser } from '../../reducer/user';
import { selectUser } from '../../reducer/user';
import { addAlert } from '../../reducer/alerts';

import InputField from '../Special/InputField';
import Spiner from '../Special/Spiner'









class LogIn extends PureComponent {

  componentDidMount() {
    document.title = 'YoSP: Login';
    this.checkUser();
  }

  state = {
    showSpiner: false,
    authorisationSucceed: false,
  }

  checkUser = () => {
    const { user } = this.props;
    if (user) {
      this.setState({ authorisationSucceed: true });
    }
  }

  loginFunction = (values) => {
    const cookies = new Cookies();
    let { loadUser, addAlert } = this.props;
    this.setState({ showSpiner: true })
    fetch(`${GLOBAL_CONFIG.backendUrl}/user/auth?`, {
      method: 'post',
      body: JSON.stringify({
        "user": {
          "email": values.email,
          "password": values.password
        },
      })
    })
      .then(result => result.text())
      .then(value => {
        let result = JSON.parse(value);
        if ('user' in result) {
          loadUser(result.user);
          cookies.set('user', result.user, { path: '/' });
          this.setState({ showSpiner: false })
          this.setState({ authorisationSucceed: true });
        }
        if ('error' in result) {
          addAlert("warning", result.error);
          this.setState({ showSpiner: false })
        }
      })
      .catch(() => {
        addAlert("danger", "Server is not responding. Something went wrong");
      });
  }

  render() {
    const { handleSubmit, invalid } = this.props;
    const { showSpiner, authorisationSucceed } = this.state;

    if (authorisationSucceed) {
      return <Redirect to="/dashboard" />
    }

    return (

      <div className="login-form-wrapper">
        <h2 className="login-form__headline">Sign In to your YoSP account </h2>
        <form className="login-form__form" onSubmit={handleSubmit(this.loginFunction)}>
          <div className="login-form__input">
            <Field
              name="email"
              label="Enter your email to get started"
              type="text"
              placeholder="Email address"
              component={InputField}
            />
          </div>
          <div className="login-form__input">
            <Field
              name="password"
              label="Your password"
              type="text"
              placeholder="***********************"
              component={InputField}
            />
          </div>
          <div className="login-form__button-wrapper">
            <button type="submit" className="login-form__button" disabled={invalid}>Sign In to Dashboard</button>
          </div>
          {showSpiner ?
            <Spiner />
            :
            ''
          }
        </form>
        <div className="login__link-wrapper">
          <h2 className="login__link-headline">Don’t have an account yet?</h2>
          <Link className="login__link" to="/registration">Get started!</Link>
        </div>
      </div>


    );
  }
}

const selector = formValueSelector('LogInForm');

const mapStateToProps = state => ({
  name: selector(state, 'email', 'password'),
  formData: getFormValues('LogInForm')(state),
  user: selectUser(state),
});
const mapDispatchToProps = {
  addAlert,
  loadUser,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'LogInForm',
    enableReinitialize: true,
  })
)(LogIn);