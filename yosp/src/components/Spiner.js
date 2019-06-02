import React, { PureComponent } from 'react';
import './styles.css';

class Spiner extends PureComponent {
    render() {
        return (
            <div uk-spinner="ratio: 1"></div>
        )
    }
}
export default Spiner;