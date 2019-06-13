import React, { PureComponent } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './styles.css';
// import { connect } from 'react-redux';
// import { selectUser } from '../reducer/user';
import AlertPanel from '../Alerts/AlertPanel';
import 'uikit/dist/css/uikit.min.css';

class Sidebars extends PureComponent {


    render() {

        return (
            <div className="sidebar_wrapper ">
                <div className="logout_wrapper">
                    <NavLink to="/login">Log In</NavLink>
                    <NavLink to="/registration">Registration</NavLink>
                    <NavLink to="/logout">Log Out</NavLink>                  
                </div>
                <div className="alert-panel">
                    <AlertPanel />
                </div>
                <div className="right-menu_wrapper" >
                    <ul className="uk-navbar-left">
                        <li>
                            <Link to="/useragents">User Agent</Link>
                        </li>
                        <li>
                            <Link to="/proxies">Proxies</Link>
                        </li>
                    </ul>
                </div>


            </div>


        );


        // return (
        //   <div>
        //     <nav className="navigation">
        //       <div className="navigation__homepage">
        //         <NavLink to="/" className="nav-item" activeClassName="active-nav-item" exact>homepage</NavLink>
        //       </div>
        //       <div className="navigation__buttons">
        //         {CheckLogin()}
        //       </div>
        //     </nav>
        //   </div>
        // );
    }
}

// const mapStateToProps = state => ({
//     user: selectUser(state)
// });

// export default connect(mapStateToProps)(Sidebars);
export default (Sidebars);