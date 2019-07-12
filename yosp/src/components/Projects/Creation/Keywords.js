import React, { Component } from 'react';

import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import '../styles.css';
import KeywordItem from './KeywordItem'


class Keywords extends Component {

    state = {
        keywordGroups: [],
    }

    handleAddClick = () => {
        const { keywordGroups } = this.state;

        keywordGroups.push({
            "group_id": this.generateFieldName(),
        })

        this.setState({
            keywordGroups: keywordGroups
        })
    }

    generateFieldName = () => {
        const value = Math.random().toString(36).substring(2);
        return value
    }

    render() {
        const { keywordGroups } = this.state;
        console.log(this.generateFieldName)
        return (

            <div className="add-keywords-form-wrapper">
                <div className="add-keywords-form__header">
                    <h1 className="add-keywords-form__headline">Keyword groups</h1>
                    <div className="add-keywords-form__button-wrapper">
                        <button type="submit" className="uk-button uk-button-default add-keywords-form__button" onClick={this.handleAddClick}> Add </button>
                        <button type="submit" className="uk-button uk-button-default add-keywords-form__button"> Save </button>
                    </div>
                </div>

                <div className="add-keywords-form__content">
                    {keywordGroups.map(keyword => (
                        <div className="add-keywords-form__field">
                            <Field
                                name={keyword["group_id"]}
                                key={keyword["group_id"]}
                                type="text"
                                component={KeywordItem}
                            />
                        </div>


                    ))}
                </div>
                <div className="add-keywords-form__button-wrapper">

                </div>
            </div>
        );

    }
}
//3457

// export default
//     // connect(mapStateToProps, mapDispatchToProps),
//     (Keywords);

const mapStateToProps = state => ({
    formData: getFormValues('Keywords')(state),
});

export default compose(
    connect(mapStateToProps),
    reduxForm({
        form: 'Keywords',
    })
)(Keywords);