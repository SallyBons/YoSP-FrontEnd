import React, { Component } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';


class Location extends Component {

    componentDidMount(){
        const { input } = this.props;
        input.onChange("US");
    }

    onSelectFlag = (countryCode) => {
        const { input } = this.props;
        input.onChange(countryCode);
    }

    render() {
        const { meta } = this.props;
        return (
            <div className="location-wrapper">
                <div className="location__header">
                    <span className="location-header__headline">
                        Select Location
            </span>
                </div>
                <ReactFlagsSelect
                    countries={["US", "CA"]}
                    defaultCountry="US"
                    // placeholder="Select Location"
                    onSelect={this.onSelectFlag} />
                     {(meta.error && meta.touched) && <span style={{color: 'red'}}>{meta.error}</span>}
            </div>

        )
    }
}
export default Location;