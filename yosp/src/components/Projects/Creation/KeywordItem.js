import React, { Component } from 'react';
import '../styles.css';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../../reducer/ui';



class KeywordItem extends Component {

    state = {
        title: '',
        keywords: []
    }
    componentDidMount() {
        document.title = 'YoSP: Keywords groups';
        const { setCurrentPage } = this.props;
        setCurrentPage("projects")
      }

    passValuesToParent = () => {
        const { input } = this.props;
        const { title, keywords } = this.state;

        if (title.length !== 0 && keywords.length !== 0) {
             input.onChange({
                "title": title,
                "keywords": [...keywords]
            });
        }
    }

    inputOnChange = (event) => {
        this.setState({
            title: event.target.value
        })
        this.passValuesToParent()
    }

    textareaOnChange = (event) => {
        const keywords = event.target.value.split('\n')
        this.setState({
            keywords: [...keywords]
        })
        this.passValuesToParent()
    }
    handleDeleteButton = () => {
        const { toggleDeleteButton} = this.props;
        const {name} = this.props.input;
        toggleDeleteButton(name);
    }

    render() {
      
        return (

            <div className="add-keywords-form-wrapper">
                <form className="add-keywords-form__form">
                    <div className="add-keywords-form__label">
                        <p>Group name</p>
                        <button type="button" className="uk-button uk-button-default add-keywords-form__button-remove" onClick={this.handleDeleteButton}> Remove </button>
                    </div>
                    <div className="add-keywords-form__input">
                        <input className="uk-input" onChange={event => this.inputOnChange(event)}></input>
                    </div>
                    <div className="add-keywords-form__label">
                        <p>Keywords</p>
                    </div>
                    <div className="add-keywords-form__input">
                        <textarea className="uk-input" onChange={event => this.textareaOnChange(event)}></textarea>
                    </div>
                </form>
            </div>
        );

    }
}
const mapDispatchToProps = {
    setCurrentPage,
};

export default connect(null, mapDispatchToProps) (KeywordItem);