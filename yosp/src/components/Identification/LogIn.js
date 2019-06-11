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
  Redirect
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
        <form onSubmit={handleSubmit(this.loginFunction)}>

          <div className="">
            <Field
              name="email"
              label="E-mail"
              type="text"
              component={InputField}
            />
          </div>


          <div>
            <Field
              name="password"
              label="Password"
              type="text"
              component={InputField}
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