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
import { setCurrentPage } from '../../../reducer/ui';
import { getId } from '../../../utils';
import { selectProject } from '../../../reducer/projects';
import {
    required, maxLengthTitle, maxLengthOverview
} from '../../../components/Special/validation';

class EditProject extends Component {
    state = {
        operationSuccessfull: false,
    }
    componentDidMount() {
        document.title = 'YoSP: Edit Project';
        const { setCurrentPage } = this.props;
        setCurrentPage("project")
      }

    sendProjectToBack = (values) => {
        let { user, addAlert } = this.props;
        let { pathname } = this.props.location;
        fetch(`${GLOBAL_CONFIG.backendUrl}/projects/update?token=${user.token}`, {
            method: 'post',
            body: JSON.stringify({
                "project": {
                    "id": getId(pathname),
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
                console.log(answer);
                if (answer.status === 200) {
                    addAlert("success", "Project is edited successfully");
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

            <div className="edit-project-proxy-form-wrapper">

                <h2 className="edit-project-form__headline">Edit settings</h2>

                <form onSubmit={handleSubmit(this.sendProjectToBack)}>

                    <div className="edit-project-form__input">
                        <Field
                            name="name"
                            label="Project name"
                            type="text"
                            component={InputField}
                            validate={[required, maxLengthTitle]}
                        />
                    </div>

                    <div className="edit-project-form__input">
                        <Field
                            name="description"
                            label="Description"
                            type="text"
                            component={TextArea}
                            validate={[required,  maxLengthOverview]}
                        />
                    </div>

                    <div className="edit-project-form__input">
                        <Field
                            name="target"
                            label="Target website"
                            type="text"
                            component={InputField}
                            validate={[required]}
                        />
                    </div>

                    <div className="edit-project-form__input">
                        <Field
                            name="scandepth"
                            label="Scan depth"
                            type="text"
                            component={ScanDepth}
                            validate={[required]}
                        />
                    </div>
                    <div className="edit-project-form__input">
                        <Field
                            name="searchengines"
                            label="Search Engines"
                            type="text"
                            component={SearchEngine}
                            validate={[required]}
                             />
                    </div>
                     <div className="edit-project-form__input">
                        <Field
                            name="location"
                            label="Location"
                            type="text"
                            component={Location}
                            validate={[required]}
                        />
                    </div>



                    <div className="edit-project-form__button-wrapper">
                        <button type="submit" className="add-project-form__button uk-button uk-button-default" > Save </button>
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
    formData: getFormValues('EditProject')(state),
    user: selectUser(state),
    project: selectProject(state),
    initialValues: { 
                    "id": selectProject(state).id,
                    "name":selectProject(state).name,
                    "description": selectProject(state).description,
                    "target": selectProject(state).target_website,
                    "scandepth": selectProject(state).scandepth,
                    "searchengines": selectProject(state).searchengines,
                    "location": selectProject(state).location
 },
});

const mapDispatchToProps = {
    addAlert,
    setCurrentPage
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'EditProject',
        // initialValues:{
        //     "name":project.name,
        // },
        enableReinitialize: true,
    })
)(EditProject);