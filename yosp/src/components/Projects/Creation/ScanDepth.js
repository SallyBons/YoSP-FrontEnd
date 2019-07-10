import React, { Component } from 'react';
import 'uikit/dist/css/uikit.min.css';
import '../styles.css';

class ScanDepth extends Component {
    state = {
        currentValue: 0,
    }

    setValue = (value) => {
        const { input } = this.props;
        this.setState({ currentValue: value })
        input.onChange(value);
    }

    render() {
        const { currentValue } = this.state;
        const { meta } = this.props;
        return (
            <div className='scan-depth-wrapper' >
                <span className='scan-depth__header'>Scan depth</span>
                <div className='scan-depth__buttons-wrapper'>
                    <div className={`uk-button uk-button-default scan-depth__button ${currentValue === 50 ? 'active ' : ''}`} onClick={() => this.setValue(50)} >50</div>
                    <div className={`uk-button uk-button-default scan-depth__button ${currentValue === 100 ? 'active ' : ''}`} onClick={() => this.setValue(100)} >100</div>
                </div>
                {(meta.error && meta.touched) && <span style={{color: 'red'}}>{meta.error}</span>}
            </div>
        );
    }
}




export default ScanDepth;