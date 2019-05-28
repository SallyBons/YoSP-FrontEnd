import React, {PureComponent} from 'react';
import './styles.css';
import {connect} from 'react-redux';
import Alert from '../components/Alert';


class AlertPanel extends PureComponent {
    render() {
            return (
          <React.Fragment>         
            <Alert />
          </React.Fragment>
        );
      }
      
}

const mapStateToProps = state => ({
 
});

export default connect(mapStateToProps)(AlertPanel);