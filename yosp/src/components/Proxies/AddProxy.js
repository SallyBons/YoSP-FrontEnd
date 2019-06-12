import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextArea from '../Special/TextArea';
import { selectProxy } from '../../reducer/proxies';
import GLOBAL_CONFIG from '../../config';
import { addAlert } from '../../reducer/alerts';
import './styles.css';


class AddProxy extends Component {

    render() {
        const { handleSubmit } = this.props;
        return (

            <div className="form add-new-movie">

                <h1 className="form__headline">Add new proxies</h1>

                <form onSubmit={handleSubmit}>

                    <Field
                        name="proxies"
                        label="Proxies"
                        type="text"
                        component={TextArea}
                    />


                    <div className="form__button--wrapper">
                        <button type="submit" className="uk-button uk-button-default" > Add </button>
                    </div>

                </form>

            </div>
        );

    }
}

const mapStateToProps = state => ({
    formData: getFormValues('AddProxy')(state),
    proxy: selectProxy(state)
});

const mapDispatchToProps = {
    addAlert
};
const sendProxyToBack = (values, props) => {
    fetch(``)//endpoint to proxies
        .then(result => result.text())
        .then(result => {
            let answer = JSON.parse(result);
            if (answer.status === 200) {
                props.addAlert("success", "Proxies are successfully updated")
            }
        });
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'AddProxy',
        enableReinitialize: true,
        onSubmit: (values, state, props) => {

            sendProxyToBack(values.proxies.split('\n'))

            props.reset();
        }
    })
)(AddProxy);