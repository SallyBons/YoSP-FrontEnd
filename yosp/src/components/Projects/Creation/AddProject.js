import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputField from '../../Special/InputField';
import TextArea from '../../Special/TextArea';
import ScanDepth from './ScanDepth';
import SearchEngine from './SearchEngine';
import Location from './Location';
import '../styles.css';
import GLOBAL_CONFIG from '../../../config';
import { addAlert } from '../../../reducer/alerts';
import { selectUser } from '../../../reducer/user';
import {
    Redirect
} from 'react-router-dom';

class AddProject extends Component {
    state = {
        operationSuccessfull: false,
    }

    sendProjectToBack = (values) => {
        let { user, addAlert } = this.props;
        fetch(`${GLOBAL_CONFIG.backendUrl}/projects/add?token=${user.token}`, {
            method: 'post',
            body: JSON.stringify({
                "project": values.project.split('\n'),
            })
        })
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                if (answer.status === 200) {
                    addAlert("success", "Project are added successfully");
                    this.setState({ operationSuccessfull: true });
                } else {
                    addAlert("warning", answer.error);
                }
            });
    }
    render() {

        const { handleSubmit } = this.props;
        const { operationSuccessfull } = this.state;
        return (

            <div className="add-project-proxy-form-wrapper">

                <h1 className="add-project-form__headline">Create new project</h1>

                <form onSubmit={handleSubmit(this.sendProjectToBack)}>

                    <div className="add-project-form__input">
                        <Field
                            name="name"
                            label="Project name"
                            type="text"
                            component={InputField}
                        />
                    </div>

                    <div className="add-project-form__input">
                        <Field
                            name="description"
                            label="Description"
                            type="text"
                            component={TextArea}
                        />
                    </div>

                    <div className="add-project-form__input">
                        <Field
                            name="target"
                            label="Target website"
                            type="text"
                            component={InputField}
                        />
                    </div>

                    <div className="add-project-form__input">
                        <Field
                            name="scandepth"
                            label="Scan depth"
                            type="text"
                            component={ScanDepth}
                        />
                    </div>
                    <div className="add-project-form__input">
                        <Field
                            name="searchengines"
                            label="Search Engines"
                            type="text"
                            component={SearchEngine}
                        />
                    </div>
                    {/* <div className="add-project-form__input">
                        <Field
                            name="proxies"
                            label="Proxies"
                            type="text"
                            component={InputField}
                        />
                    </div> */}
                    <div className="add-project-form__input">
                        <Field
                            name="location"
                            label="Location"
                            type="text"
                            component={Location}
                        />
                    </div>



                    <div className="add-project-form__button-wrapper">
                        <button type="submit" className="add-project-form__button uk-button uk-button-default" >Add </button>
                        <button type="submit" className="add-project-form__button uk-button uk-button-default" >Cancel </button>
                    </div>
                    {operationSuccessfull ?
                        <Redirect to="/projects" />
                        :
                        ''
                    }
                </form>

            </div>
        );

    }


}

const mapStateToProps = state => ({
    formData: getFormValues('AddProject')(state),
    user: selectUser(state),
});

const mapDispatchToProps = {
    addAlert
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'AddProject',
        enableReinitialize: true,
    })
)(AddProject);