import React, { PureComponent } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import Alert from './Alert';
import { selectAllAlerts } from '../../reducer/alerts'


class AlertPanel extends PureComponent {
  render() {
    const { alerts } = this.props
    return (
      <div className="alert-panel-wrapper">
        <p className="alert-panel__text">Recent alerts:</p>
        {alerts.map((alert, index) => (
          <Alert incommingAlert={alert} key={alert.id} />
        ))}
      </div>

    );
  }

}

const mapStateToProps = state => ({
  alerts: selectAllAlerts(state),
});

export default connect(mapStateToProps)(AlertPanel);