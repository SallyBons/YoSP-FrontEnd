import React, { PureComponent } from 'react';
import 'uikit/dist/css/uikit.min.css';
// import './styles.css';
// import Sidebars from '../../components/Special/Sidebars';

class Dashboard extends PureComponent {
  componentDidMount() {
    document.title = 'YoSP: Dashboard';
  }

  render() {
    return (

      <div >
        {/* <Sidebars /> */}
      </div>

    );
  }
}

export default Dashboard;