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

class AddProject extends Component {
    
    render() {

        const { handleSubmit } = this.props;
        return (

            <div className="add-project-proxy-form-wrapper">

                <h1 className="add-project-form__headline">Create new project</h1>

                <form onSubmit={handleSubmit}>

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

                </form>

            </div>
        );

    }


}

const mapStateToProps = state => ({
    formData: getFormValues('AddProject')(state),
});

const mapDispatchToProps = {

};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'AddProject',
        enableReinitialize: true,
    })
)(AddProject);