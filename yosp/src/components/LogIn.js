import React, {PureComponent} from 'react';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import InputField from './InputField';
import {authentificateUser, validateUserEmail, validateUserPassword} from '../components/auth/auth';
// import {
//   required, email
// } from './validation';

import {loadUser} from '../reducer/user';


class LogIn extends PureComponent {

    render() {
    const {handleSubmit, invalid} = this.props;

    return (
     
     <form onSubmit={handleSubmit}>

         
            <Field
              name="email"
              label="E-mail"
              type="text"
              component={InputField}
            //   validate={[email, validateUserEmail, required]}
            />
         

          
            <Field
              name="password"
              label="Password"
              type="text"
              component={InputField}
            //   validate={[required, validateUserPassword]}
            />
          

          

            <button type="submit" className="form__button send" disabled={invalid}>Login</button>
        

        </form>
      
    );
  }
}

const selector = formValueSelector('LogInForm');

const mapStateToProps = state => ({
  name: selector(state, 'email', 'password'),
  formData: getFormValues('LogInForm')(state)
});

export default compose(
  connect(null, {mapStateToProps, loadUser}),
  reduxForm({
    form: 'LogInForm',
    enableReinitialize: true,
    onSubmit: (values, props, state) => {
      const user = authentificateUser(values.email, values.password);
      state.loadUser(user);
    }
  })
)(LogIn);