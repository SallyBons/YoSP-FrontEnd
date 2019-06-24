import React, { PureComponent } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import Alert from './Alert';
import { selectAllAlerts, loadAlerts } from '../../reducer/alerts'


class AlertPanel extends PureComponent {

  deleteAllAlerts = () => {
    const { loadAlerts } = this.props;
    loadAlerts([]);
  }
  render() {
    const { alerts } = this.props
    return (
      <div className="alert-panel-wrapper">
        <div className="alert-panel__header">
          <p className="alert-panel__header__text">Recent alerts:</p>
          <button className="uk-button uk-button-default alert-panel__header__button" onClick={this.deleteAllAlerts}>Clear all</button>
        </div>

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
const mapDispatchToProps = {
  loadAlerts,
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertPanel);