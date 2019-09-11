import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setCurrentPage } from '../../reducer/ui';

import 'uikit/dist/css/uikit.min.css';

import './styles.css';
 

class Dashboard extends PureComponent {
  componentDidMount() {
    document.title = 'YoSP: Dashboard';
    const { setCurrentPage } = this.props;
    setCurrentPage("dashboard")
  }

  render() {
    return (

      <div className="dashboard__wrapper" >
       <h2 className="dashboard__header__headline">Dashboard</h2>
      </div>

    );
  }
}
const mapDispatchToProps = {
  setCurrentPage,
};

export default connect(null, mapDispatchToProps)(Dashboard);