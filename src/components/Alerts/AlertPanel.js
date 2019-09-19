import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import './styles.css';

import { selectAllAlerts, loadAlerts } from '../../reducer/alerts';

import Alert from './Alert';



class AlertPanel extends PureComponent {

  deleteAllAlerts = () => {
    const { loadAlerts } = this.props;
    loadAlerts([]);
  }
  render() {
    const { alerts } = this.props
    return (
      <div className="alert-panel-wrapper">
        <div className="alert-panel-content">
          <div className="alert-panel__header">
            <p className="alert-panel__header__text">Notifications</p>
            <p className="alert-panel__header__additional-text">Latest information from YoSP lifelog</p>
          </div>
          <div className="alert-panel__alerts">
            {alerts.map((alert) => (
              <Alert incommingAlert={alert} key={alert.id} />
            ))}
          </div>
          <button className="uk-button uk-button-default alert-panel__button" onClick={this.deleteAllAlerts}>Clear all</button>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  alerts: selectAllAlerts(state),
});
const mapDispatchToProps = {
  loadAlerts,
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertPanel);