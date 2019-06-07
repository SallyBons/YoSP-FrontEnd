import React, { PureComponent } from 'react';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextArea from '../TextArea';



class UserAgentsDesktop extends PureComponent {

  render() {
    const { handleSubmit, invalid } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field
            name="textarea1"
            label="TA 1"
            type="text"
            component={TextArea}
          />
           <button type="submit" className="uk-button uk-button-default">save</button>
          <button type="submit" className="uk-button uk-button-default" disabled={invalid}>load Defaults</button>
        </form>
      </div>
    );
  }
}

const selector = formValueSelector('UserAgentDefault');

const mapStateToProps = state => ({
  name: selector(state, 'textarea1'),
  formData: getFormValues('UserAgentDefault')(state)
});

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'UserAgentDefault',
    enableReinitialize: true,
    onSubmit: (values, state, props) => {
      const textAreaInputValue = values.textarea1;
      const lines = textAreaInputValue.split('\n');
      props.setStatistics(lines.length,'desktop');
    }
  })
)(UserAgentsDesktop);