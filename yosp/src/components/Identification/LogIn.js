import React, { PureComponent } from 'react';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputField from '../Special/InputField';
import Spiner from '../Special/Spiner'
import GLOBAL_CONFIG from '../../config';
import { loadUser } from '../../reducer/user';
import { addAlert } from '../../reducer/alerts';
import 'uikit/dist/css/uikit.min.css';
import Cookies from 'universal-cookie';
import {
  Redirect, Link
} from 'react-router-dom';


class LogIn extends PureComponent {

  componentDidMount() {
    document.title = 'YoSP: Login';
  }

  state = {
    showSpiner: false,
    authorisationSucceed: false,
  }
  loginFunction = (values) => {
    const cookies = new Cookies();
    let { loadUser, addAlert } = this.props;
    this.setState({ showSpiner: true })
    fetch(`${GLOBAL_CONFIG.backendUrl}/user/auth?email=${values.email}&password=${values.password}`)
      .then(result => result.text())
      .then(result => {
        let user = JSON.parse(result);
        if (user.name) {
          loadUser(user);
          cookies.set('user', user, { path: '/' });
          this.setState({ showSpiner: false })
          this.setState({ authorisationSucceed: true });
        }
        if (user.error) {
          addAlert("warning", user.error);
          this.setState({ showSpiner: false })
        }
      }).catch(() => {
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
            {/* <Link className="uk-button uk-button-default" to="/registration">Registration</Link> */}
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
  formData: getFormValues('LogInForm')(state)
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