import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    Redirect
} from 'react-router-dom';

import '../styles.css';

import GLOBAL_CONFIG from '../../../config';

import { addAlert } from '../../../reducer/alerts';
import { selectUser } from '../../../reducer/user';
import { setCurrentPage } from '../../../reducer/ui';

import InputField from '../../Special/InputField';
import TextArea from '../../Special/TextArea';
import ScanDepth from './ScanDepth';
import SearchEngine from './SearchEngine';
import Location from './Location';
import {
    required, maxLengthTitle, maxLengthOverview
} from '../../../components/Special/validation';


class AddProject extends Component {
    state = {
        operationSuccessfull: false,
    }
    componentDidMount() {
        document.title = 'YoSP: Add Project';
        const { setCurrentPage } = this.props;
        setCurrentPage("projects")
    }
    sendProjectToBack = (values) => {
        let { user, addAlert } = this.props;
        fetch(`${GLOBAL_CONFIG.backendUrl}/projects/add?token=${user.token}`, {
            method: 'post',
            body: JSON.stringify({
                "new_project": {
                    "name": values.name,
                    "description": values.description,
                    "target_website": values.target,
                    "scan_depth": values.scandepth,
                    "search_engines": values.searchengines,
                    "location": values.location
                },
            })
        })
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                if (answer.status === 200) {
                    addAlert("success", "Project is added successfully");
                    this.setState({ operationSuccessfull: true });
                } else {
                    addAlert("warning", answer.error);
                }
            }).catch(() => {
                addAlert("danger", "Server is not responding. Something went wrong");
            });;
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
                            validate={[required, maxLengthTitle]}
                        />
                    </div>
                    <div className="add-project-form__input">
                        <Field
                            name="description"
                            label="Description"
                            type="text"
                            component={TextArea}
                            validate={[required, maxLengthOverview]}
                        />
                    </div>
                    <div className="add-project-form__input">
                        <Field
                            name="target"
                            label="Target website"
                            type="text"
                            component={InputField}
                            validate={[required]}
                        />
                    </div>
                    <div className="add-project-form__input">
                        <Field
                            name="scandepth"
                            label="Scan depth"
                            type="text"
                            component={ScanDepth}
                            validate={[required]}
                        />
                    </div>
                    <div className="add-project-form__input">
                        <Field
                            name="searchengines"
                            label="Search Engines"
                            type="text"
                            component={SearchEngine}
                            validate={[required]}
                        />
                    </div>
                    <div className="add-project-form__input">
                        <Field
                            name="location"
                            label="Location"
                            type="text"
                            component={Location}
                            validate={[required]}
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
    addAlert,
    setCurrentPage,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'AddProject',
        enableReinitialize: true,
    })
)(AddProject);