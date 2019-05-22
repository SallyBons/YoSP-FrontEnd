import React, {PureComponent} from 'react';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';



class LogIn extends PureComponent {

    render() {
    const {handleSubmit, invalid} = this.props;

    return (
     
     <form onSubmit={handleSubmit}>

         
            <Field
              name="textarea1"
              label="TA 1"
              type="text"
              component="textarea"
              />
         

          
            <Field
              name="textarea2"
              label="TA 2"
              type="text"
              component="textarea"
              />
          

          

            <button type="submit" className="form__button send" disabled={invalid}>Confirm</button>
        

        </form>
      
    );
  }
}

const selector = formValueSelector('UserAgent');

const mapStateToProps = state => ({
  name: selector(state, 'textarea1', 'textarea2'),
  formData: getFormValues('UserAgent')(state)
});

export default compose(
  connect(null, {mapStateToProps}),
  reduxForm({
    form: 'UserAgent',
    enableReinitialize: true,
    onSubmit: (values, props, state) => {
      
    }
  })
)(LogIn);