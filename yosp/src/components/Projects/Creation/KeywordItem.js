import React, { Component } from 'react';
import '../styles.css'; 



class KeywordItem extends Component {

    state = {
        groupName: '',
        keywords: []
    }

    passValuesToParent = () => {
        const { input } = this.props;
        const { groupName, keywords } = this.state;

        if (groupName.length !== 0 && keywords.length !== 0) {
            console.log('Fired');
            console.log(input)
            input.onChange({
                "group_name": groupName,
                "keywords": [...keywords]
            });
        }
    }

    inputOnChange = (event) => {
        this.setState({
            groupName: event.target.value
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

    render() {
        
        return (

            <div className="add-keywords-form-wrapper">
                <form className="add-keywords-form__form">
                    <div className="add-keywords-form__label">
                        <p>Group name</p>
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

export default (KeywordItem);