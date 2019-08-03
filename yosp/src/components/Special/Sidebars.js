import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';
// import { connect } from 'react-redux';
// import { selectUser } from '../reducer/user';
import 'uikit/dist/css/uikit.min.css';

import { connect } from 'react-redux';
import { selectUser } from '../../reducer/user';
import { selectCurrentState } from '../../reducer/ui';

// Icons
import dashboard_icon from '../../img/dashboard_icon.png';
import projects_icon from '../../img/projects_icon.png';
import proxies_icon from '../../img/proxies_icon.png';
import useragents_icon from '../../img/useragents_icon.png';
import users_icon from '../../img/users_icon.png';
import yosp_logo from '../../img/yosp_logo.png';
import hide_sidebar_icon from '../../img/hide_sidebar_icon.png';

class Sidebars extends PureComponent {
    state = {
        isHidden: false,
    }
    hideMenuFunction = () => {
        const { isHidden } = this.state;
        this.setState({ isHidden: !isHidden })
    }

    render() {
        const { isHidden } = this.state;
        const { user, currentRoute } = this.props;
         return (

            user !== undefined && user ?
                <React.Fragment>
                    <div className="sidebars__logout-wrapper">
                        <div className="sidebars__logo-wrapper">
                            <div className="sidebars__logo-button" onClick={this.hideMenuFunction}> <img src={hide_sidebar_icon} alt="hidden" /></div>
                            <div className="sidebars__logo"> <img src={yosp_logo} alt="logo" /></div>
                        </div>
                        <div className="sidebars__logout-header-elements">
                            <div className="sidebars__logout-header">
                                <p className="sidebars__username">Hello, {user.name}</p>
                                {user.isAdmin === true ? <p className="sidebars__status">You are Administrator</p> : <p className="sidebars__status">You are User</p>}
                            </div>
                            <NavLink className="uk-button uk-button-default sidebars__logout-button" to="/logout">Sign out</NavLink>
                        </div>


                    </div>
                    {isHidden === false ? <div className="sidebars__left-menu-wrapper" >
                        <ul className="sidebars__left-menu-wrapper__menu uk-navbar-left">
                            <li className="sidebars__left-menu-wrapper__menu__li underlined">
                                <NavLink className={`sidebars__left-menu-wrapper__li  ${currentRoute === "dashboard" ? 'active-sidebar-item' : ''}`} to="/dashboard">
                                    <div className="sidebars__left-menu-wrapper__img"><img src={dashboard_icon} alt="dashboard" /></div>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="sidebars__left-menu-wrapper__menu__li underlined">
                                <NavLink className={`sidebars__left-menu-wrapper__li ${currentRoute === "projects" ? 'active-sidebar-item' : ''}`} to="/projects">
                                    <div className="sidebars__left-menu-wrapper__img"><img src={projects_icon} alt="projects" /></div>
                                    Projects
                                </NavLink>
                            </li>
                            <li className="sidebars__left-menu-wrapper__menu__li">
                                <NavLink className={`sidebars__left-menu-wrapper__li ${currentRoute === "proxies" ? 'active-sidebar-item' : ''}`} to="/proxies">
                                    <div className="sidebars__left-menu-wrapper__img"><img src={proxies_icon} alt="proxies" /></div>
                                    Proxies
                                </NavLink>
                            </li>
                            <li className="sidebars__left-menu-wrapper__menu__li ">
                                <NavLink className={`sidebars__left-menu-wrapper__li ${currentRoute === "useragents" ? 'active-sidebar-item' : ''}`} to="/useragents">
                                    <div className="sidebars__left-menu-wrapper__img"><img src={useragents_icon} alt="useragents" /></div>
                                    Useragents
                                </NavLink>
                            </li >
                            <li className="sidebars__left-menu-wrapper__menu__li ">
                                <NavLink className={`sidebars__left-menu-wrapper__li ${currentRoute === "users" ? 'active-sidebar-item' : ''}`} to="/users">
                                    <div className="sidebars__left-menu-wrapper__img"><img src={users_icon} alt="users" /></div>
                                    Users & Roles
                                </NavLink>
                            </li>
                        </ul>
                    </div> : ''}
                </React.Fragment>
                : <React.Fragment></React.Fragment>

        );


    }
}

const mapStateToProps = state => ({
    user: selectUser(state),
    currentRoute: selectCurrentState(state),
});

export default connect(mapStateToProps)(Sidebars)