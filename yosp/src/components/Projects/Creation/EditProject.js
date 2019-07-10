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

class EditProject extends Component {
    state = {
        operationSuccessfull: false,
    }

    // sendProjectToBack = (values) => {
    //     let { user, addAlert } = this.props;
    //     fetch(`${GLOBAL_CONFIG.backendUrl}/projects/add?token=${user.token}`, {
    //         method: 'post',
    //         body: JSON.stringify({
    //             "new_project": {
    //                 "project_name": values.name,
    //                 "project_description": values.description,
    //                 "target_website": values.target,
    //                 "scan_depth": values.scandepth,
    //                 "search_engines": values.searchengines,
    //                 "location": values.location
    //             },
    //         })
    //     })
    //         .then(result => result.text())
    //         .then(result => {
    //             let answer = JSON.parse(result);
    //             console.log(answer);
    //             if (answer.status === 200) {
    //                 addAlert("success", "Project are added successfully");
    //                 this.setState({ operationSuccessfull: true });
    //             } else {
    //                 addAlert("warning", answer.error);
    //             }
    //         }).catch(() => {
    //             addAlert("danger", "Server is not responding. Something went wrong");
    //           });;
    // }
    render() {

        const { handleSubmit } = this.props;
        const { operationSuccessfull } = this.state;
        return (

            <div className="edit-project-proxy-form-wrapper">

                <h1 className="edit-project-form__headline">Edit project</h1>

                <form>

                    <div className="edit-project-form__input">
                        <Field
                            name="name"
                            label="Project name"
                            type="text"
                            component={InputField}
                           
                        />
                    </div>

                    <div className="edit-project-form__input">
                        <Field
                            name="description"
                            label="Description"
                            type="text"
                            component={TextArea}
                            
                        />
                    </div>

                    <div className="edit-project-form__input">
                        <Field
                            name="target"
                            label="Target website"
                            type="text"
                            component={InputField}
                            
                        />
                    </div>

                    <div className="edit-project-form__input">
                        <Field
                            name="scandepth"
                            label="Scan depth"
                            type="text"
                            component={ScanDepth}
                            
                        />
                    </div>
                    <div className="edit-project-form__input">
                        <Field
                            name="searchengines"
                            label="Search Engines"
                            type="text"
                            component={SearchEngine}
                           
                             />
                    </div>
                     <div className="edit-project-form__input">
                        <Field
                            name="location"
                            label="Location"
                            type="text"
                            component={Location}
                            
                        />
                    </div>



                    <div className="edit-project-form__button-wrapper">
                        <button type="submit" className="add-project-form__button uk-button uk-button-default" >Edit </button>
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
});

const mapDispatchToProps = {
    addAlert
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'EditProject',
        enableReinitialize: true,
    })
)(EditProject);