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

                <h1 className="add-keywords-form__headline">Keyword groups</h1>
                <div className="add-keywords-form__button-wrapper">
                    <button type="submit" className="add-keywords-form__button uk-button uk-button-default" onClick={this.handleAddClick}> Add </button>
                </div>
                <div className="add-keywords-form__content">
                    {keywordGroups.map(keyword => (
                        // <KeywordItem
                        //     key={Math.random()}
                        //     incomingKeyword={keyword}
                        //     {...keyword}
                        // />
                        <Field
                            // TODO: Check this code later. Looks like shit.
                            name={keyword["group_id"]}
                            key={keyword["group_id"]}
                            // name="test"
                            label="Group name"
                            type="text"
                            component={KeywordItem}
                        />
                    ))}
                </div>
            </div>
        );

    }
}


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