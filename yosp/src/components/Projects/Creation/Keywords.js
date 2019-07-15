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
    handleDeleteKeywords = (key) => {
        console.log(key);
        const { keywordGroups} = this.state;
        this.setState({keywordGroups:keywordGroups.filter(group => group.group_id !== key)});
    }

    render() {
        const { keywordGroups } = this.state;
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
                        <div className="add-keywords-form__field" key={keyword["group_id"]}>
                            <Field
                                name={keyword["group_id"]}
                                type="text"
                                component={KeywordItem}
                                toggleDeleteButton={this.handleDeleteKeywords}
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