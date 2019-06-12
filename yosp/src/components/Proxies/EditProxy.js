import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputField from '../Special/InputField';
import { selectProxy,loadProxy } from '../../reducer/proxies';
import './styles.css';


class EditProxy extends Component {
    componentDidMount(){
        const {incomingProxy}=this.props.location;
        // console.log(this.props)
        this.props.change('ip',incomingProxy.id);
        this.props.change('port',incomingProxy.port);
        this.props.change('user',incomingProxy.user);
        this.props.change('password',incomingProxy.password);
    }

    render() {
        // console.log(this.props.location.incomingProxy)
        const { handleSubmit } = this.props;
        return (

            <div className="form add-new-movie">

                <h1 className="form__headline">Edit proxies</h1>

                <form onSubmit={handleSubmit}>

                    <div className="form__input title">
                        <Field
                            name="ip"
                            label="IP"
                            type="text"
                            component={InputField}
                        />
                    </div>

                    <div className="form__input overview">
                        <Field
                            name="port"
                            label="Port"
                            type="text"
                            component={InputField}
                        />
                    </div>

                    <div className="form__input poster">
                        <Field
                            name="user"
                            label="User"
                            type="text"
                            component={InputField}
                        />
                    </div>

                    <div className="form__input popularity">
                        <Field
                            name="password"
                            label="Password"
                            type="text"
                            component={InputField}
                        />
                    </div>

                    
                   
                    <div className="form__button--wrapper">
                        <button type="submit"  className="uk-button uk-button-default" >Edit </button>
                    </div>

                </form>

            </div>
        );

    }
}

const mapStateToProps = state => ({
    formData: getFormValues('EditProxy')(state),
    proxy: selectProxy(state)
});

const mapDispatchToProps = {
    loadProxy ,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'EditProxy',
        enableReinitialize: true,
        onSubmit: (values, state, props) => {
            const newProxy = {
                ip:values.ip,
                port:values.port,
                user:values.user,
                password:values.password,
                added:values.added,
                updated:values.updated,
            };

            props.loadProxy ( newProxy);
            props.reset();
        }
    })
)(EditProxy);