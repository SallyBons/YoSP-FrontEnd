import React, { Component } from 'react';
import 'uikit/dist/css/uikit.min.css';
import '../styles.css';

class SearchEngine extends Component {
    state = {
        isButtonActiveDesc: false,
        isButtonActiveMob: false,
    }

    passValuesToParent = () => {
        const { input } = this.props;
        const { isButtonActiveDesc, isButtonActiveMob } = this.state;

        let arrayToReturn = [];

        if (isButtonActiveDesc) {
            arrayToReturn.push('Google Desktop');
        }

        if (isButtonActiveMob) {
            arrayToReturn.push('mobile');
        }

        input.onChange(arrayToReturn);
    }

    setValues = (type) => {

        switch (type) {
            case 'Google Desktop':
                const { isButtonActiveDesc } = this.state;
                this.setState({ isButtonActiveDesc: !isButtonActiveDesc }, () => {
                    this.passValuesToParent()
                })
                break;

            case 'mobile':
                const { isButtonActiveMob } = this.state;
                this.setState({ isButtonActiveMob: !isButtonActiveMob }, () => {
                    this.passValuesToParent()
                })
                break;

            default:
                break;
        }
    }



    render() {
        const { isButtonActiveDesc } = this.state;
        // const { isButtonActiveMob } = this.state;
        const { meta } = this.props;
        return (
            <div className='search-engine-wrapper' >
                <span className='search-engine__header'>Search Engine</span>
                <div className='search-engine__buttons-wrapper'>
                    <div className={`uk-button uk-button-default search-engine__button ${isButtonActiveDesc === true ? 'active ' : ''}`} onClick={() => this.setValues('Google Desktop')} >G Desktop
                </div>
                    {/* <div className={`uk-button uk-button-default search-engine__button ${isButtonActiveMob === true ? 'active ' : ''}`} onClick={() => this.setValues('mobile')} >G Mobile
                </div> */}
                </div>
                {(meta.error && meta.touched) && <span style={{color: 'red'}}>{meta.error}</span>}
            </div>
        );
    }
}




export default SearchEngine;