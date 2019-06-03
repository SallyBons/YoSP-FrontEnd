import React, { PureComponent } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import Alert from '../components/Alert';
import { selectAllAlerts } from '../reducer/alerts'


class AlertPanel extends PureComponent {
  render() {
    const { alerts } = this.props
    return (
      <div className="alert_panel--wrapper">
        <p className="alert-text">Recent alerts:</p>
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