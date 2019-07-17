import React, { PureComponent } from 'react';
import 'uikit/dist/css/uikit.min.css';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../reducer/ui';
// import './styles.css';
// import Sidebars from '../../components/Special/Sidebars';

class Dashboard extends PureComponent {
  componentDidMount() {
    document.title = 'YoSP: Dashboard';
    const { setCurrentPage } = this.props;
    setCurrentPage("dashboard")
  }

  render() {
    return (

      <div >
        {/* <Sidebars /> */}
      </div>

    );
  }
}
const mapDispatchToProps = {
  setCurrentPage,
};

export default connect(null, mapDispatchToProps)(Dashboard);