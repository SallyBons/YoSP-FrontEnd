import React, {PureComponent} from 'react';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import InputField from './InputField';
import Spiner from '../components/Spiner'
import {
  required, email
} from '../components/validation';
import GLOBAL_CONFIG from '../config';
import {loadUser} from '../reducer/user';


class LogIn extends PureComponent {
  state = {
    showSpiner: false,
}
loginFunction=(values)=>{
  let {loadUser} = this.props;
  this.setState({showSpiner:true})
   fetch(`${GLOBAL_CONFIG.backendUrl}/user/auth?email=${values.email}&password=${values.password}`)
  .then(result => result.text())
  .then(result => {
      let user = JSON.parse(result);
      if (user.name) {
        loadUser(user); 
      }
      this.setState({showSpiner:false})
  });
}

    render() {
    const {handleSubmit, invalid} = this.props;
    const { showSpiner } = this.state;
    return (
     
     <form onSubmit={handleSubmit(this.loginFunction)}>

         
            <Field
              name="email"
              label="E-mail"
              type="text"
              component={InputField}
              validate={[email, required]}
            />
         

          
            <Field
              name="password"
              label="Password"
              type="text"
              component={InputField}
             validate={[required]}
            />
          

          

            <button type="submit" className="form__button send" disabled={invalid}>Login</button>
            {showSpiner ? 
                   <Spiner />
                : 
                    ''
                }

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
     })
)(LogIn);