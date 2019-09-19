import React, { Component } from 'react';

import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GLOBAL_CONFIG from '../../../config';
import '../styles.css';
import KeywordItem from './KeywordItem';
import { setCurrentPage } from '../../../reducer/ui';
import { selectUser } from '../../../reducer/user';
import { selectProject } from '../../../reducer/projects';
import { addAlert } from '../../../reducer/alerts';


class Keywords extends Component {

    state = {
        keywordGroups: [],
    }
    componentDidMount() {
        document.title = 'YoSP: Keywords groups';
        const { setCurrentPage } = this.props;
        setCurrentPage("projects")
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
        const { keywordGroups } = this.state;
        this.setState({ keywordGroups: keywordGroups.filter(group => group.group_id !== key) });
    }

    SendKeywordGroupsToBack = () => {
        let { addAlert, project, user } = this.props;
        let newArray = [];
        for (let element in this.props.formData) {
            newArray.push(this.props.formData[`${element}`])
        }
        fetch(`${GLOBAL_CONFIG.backendUrl}/keyword-groups/add?token=${user.token}`, {
            method: 'post',
            body: JSON.stringify({
                "id": project.id,
                "keyword_groups": [...newArray],
            })
        }).then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                console.log(result)
                if (answer.status === 200) {
                    addAlert("success", "Keywors groups are added succesful")
                }
            }).then(
                this.props.history.push(`/projects/${project.id}`)
            ).catch(() => {
                addAlert("danger", "Server is not responding. Something went wrong");
            });
    }

    render() {
        const { keywordGroups } = this.state;

        return (

            <div className="add-keywords-form-wrapper">
                <div className="add-keywords-form__header">
                    <h2 className="add-keywords-form__headline">Keyword groups</h2>
                    <div className="add-keywords-form__button-wrapper">
                        <button type="submit" className="uk-button uk-button-default add-keywords-form__button" onClick={this.handleAddClick}> Add </button>
                        <button type="submit" className="uk-button uk-button-default add-keywords-form__button" onClick={this.SendKeywordGroupsToBack}> Save </button>
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

const mapStateToProps = state => ({
    formData: getFormValues('Keywords')(state),
    user: selectUser(state),
    project: selectProject(state),
});
const mapDispatchToProps = {
    setCurrentPage,
    addAlert
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'Keywords',
    })
)(Keywords);