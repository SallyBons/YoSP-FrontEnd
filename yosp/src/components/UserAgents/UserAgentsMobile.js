import React, { PureComponent } from 'react';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextArea from '../Special/TextArea';
import GLOBAL_CONFIG from '../../config';
import { selectUser } from '../../reducer/user';



class UserAgentsMobile extends PureComponent {

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>


          <Field
            name="textarea2"
            label="Mobile useragents"
            type="text"
            component={TextArea}
          />
          <div className='form__button--wrapper'>
            <button className="uk-button uk-button-default">load Defaults</button>
            <button type="submit" className="uk-button uk-button-default">save</button>
          </div>


        </form>


      </div>


    );
  }
}

const selector = formValueSelector('UserAgentMobile');

const mapStateToProps = state => ({
  name: selector(state, 'textarea2'),
  formData: getFormValues('UserAgentMobile')(state),
  user: selectUser(state)
});
const getDataToBackEnd = (values, user) => {
  // let { addAlert} = this.props;
  fetch(`${GLOBAL_CONFIG.backendUrl}/useragents/add?token=${user.token}&useragent_type=mobile&useragent=${values.textarea2}`)
    .then(result => result.text())
    .then(result => {
      console.log(result);
    });


}

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'UserAgentDefault',
    enableReinitialize: true,
    onSubmit: (values, state, props) => {
      const textAreaInputValue = values.textarea2;
      const lines = textAreaInputValue.split('\n');
      props.setStatistics(lines.length, 'mobile');
      getDataToBackEnd(values, props.user);
    }
  })
)(UserAgentsMobile);