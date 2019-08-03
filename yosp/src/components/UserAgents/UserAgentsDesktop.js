import React, { PureComponent } from 'react';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextArea from '../Special/TextArea';
import GLOBAL_CONFIG from '../../config';
import { addAlert } from '../../reducer/alerts';
import { selectUser } from '../../reducer/user';



class UserAgentsDesktop extends PureComponent {
  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize() {
    setTimeout(() => {
      let { user } = this.props;
      this.getDataFromBackEnd(user)
    }, 1);
  }

  getDataFromBackEnd = (user) => {
    fetch(`${GLOBAL_CONFIG.backendUrl}/useragents/get?token=${user.token}&useragent_type=desktop`)
      .then(result => result.text())
      .then(result => {
        let answer = JSON.parse(result);
        if (answer.useragents) {
          let parsedUserAgents = JSON.parse(answer.useragents);
          
          

          // this.props.change('textarea1', parsedUserAgents.join('\n'));
        }
      });
  }

  render() {
    const { handleSubmit} = this.props;

    return (
      <div className="user-agent-desktop-form-wrapper">
        <form  className="user-agent-desktop-form__form" onSubmit={handleSubmit}>
          <div className="user-agent-desktop-form__input">
          <Field
            name="textarea1"
            label="Desktop  useragents"
            type="text"
            component={TextArea}
          />
          </div>
         
          <div className="user-agent-desktop-form__button-wrapper">
            <button className="user-agent-desktop-form__button uk-button uk-button-default">load Defaults</button>
            <button type="submit" className="user-agent-desktop-form__button uk-button uk-button-default">save</button>
          </div>

          {/* onClick={()=>getDataFromBackEnd(user)} */}

        </form>
      </div>
    );
  }
}

const selector = formValueSelector('UserAgentDesktop');

const setDataToBackEnd = (values, user, props) => {
  fetch(`${GLOBAL_CONFIG.backendUrl}/useragents/add?token=${user.token}`, {
    method: 'post',
    body: JSON.stringify({
      "useragents": {
        "useragent_type": "desktop",
        "useragents": values.textarea1.split('\n')
      }    
    })
  }).then(result => result.text())
    .then(result => {
      let answer = JSON.parse(result);
      if (answer.status === 200) {
        props.addAlert("success", "Useragents are successfully added")
      }
    }).catch(() => {
      addAlert("danger", "Server is not responding. Something went wrong");
    });;
    
};

const mapStateToProps = state => ({
  name: selector(state, 'textarea1'),
  formData: getFormValues('UserAgentDesktop')(state),
  user: selectUser(state),
});

const mapDispatchToProps = {
  addAlert
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'UserAgentDefault',
    enableReinitialize: true,
    onSubmit: (values, state, props) => {
      const textAreaInputValue = values.textarea1;
      const lines = textAreaInputValue.split('\n');
      props.setStatistics(lines.length, 'desktop');
      setDataToBackEnd(values, props.user, props);
    }
  })
)(UserAgentsDesktop);