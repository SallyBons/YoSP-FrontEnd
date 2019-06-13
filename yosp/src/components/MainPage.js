import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import 'uikit/dist/css/uikit.min.css';
import './styles.css';
import Sidebars from '../components/Special/Sidebars';
class MainPage extends PureComponent {
  componentDidMount() {
    document.title = 'YoSP: Dashboard';
  }

  render() {
    return (

      <div className="test">
         <Sidebars />
        {/* <div >
          <Link to="/registration">Registration</Link>
        </div> */}
        {/* <div >
          <Link to="/login">Login</Link>
        </div> */}
        
      </div>

    );
  }
}

export default MainPage;
