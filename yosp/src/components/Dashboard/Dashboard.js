import React, { PureComponent } from 'react';
import 'uikit/dist/css/uikit.min.css';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../reducer/ui';
// import './styles.css';

class Dashboard extends PureComponent {
  componentDidMount() {
    document.title = 'YoSP: Dashboard';
    const { setCurrentPage } = this.props;
    setCurrentPage("dashboard")
  }

  render() {
    return (

      <div >
     
      </div>

    );
  }
}
const mapDispatchToProps = {
  setCurrentPage,
};

export default connect(null, mapDispatchToProps)(Dashboard);