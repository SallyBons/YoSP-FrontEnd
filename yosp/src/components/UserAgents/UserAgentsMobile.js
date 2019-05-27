import React, { PureComponent } from 'react';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextArea from '../TextArea'; 



class UserAgentsMobile extends PureComponent {

  render() {
    const { handleSubmit, invalid } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>


          <Field
            name="textarea2"
            label="TA 2"
            type="text"
            component={TextArea}
          />
          <button type="submit" className="uk-button uk-button-default" disabled={invalid}>Confirm</button>
        </form>

        
      </div>


    );
  }
}

const selector = formValueSelector('UserAgentMobile');

const mapStateToProps = state => ({
  name: selector(state, 'textarea2'),
  formData: getFormValues('UserAgentMobile')(state)
});

export default compose(
  connect(null, { mapStateToProps }),
  reduxForm({
    form: 'UserAgentDefault',
    enableReinitialize: true,
    onSubmit: (values, props, state) => {

    }
  })
)( UserAgentsMobile);