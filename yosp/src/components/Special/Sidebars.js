import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';
// import { connect } from 'react-redux';
// import { selectUser } from '../reducer/user';
import 'uikit/dist/css/uikit.min.css';

import { connect } from 'react-redux';
import { selectUser } from '../../reducer/user';
import { selectCurrentState } from '../../reducer/ui'

class Sidebars extends PureComponent {

    render() {

        const { user, currentRoute } = this.props;
        // console.log(routes)
        return (

            user !== undefined && user.name ?
                <React.Fragment>
                    <div className="sidebars__logout-wrapper">
                        <div className="sidebars__logo">YOSP</div>

                        <div className="sidebars__logout-header-elements">
                            <div className="sidebars__logout-header">
                                <p className="sidebars__username">Hello, {user.name}</p>
                                {user.isAdmin === true ? <p className="sidebars__status">You are Administrator</p> : <p className="sidebars__status">You are User</p>}
                            </div>
                            <NavLink className="uk-button uk-button-default sidebars__logout-button" to="/logout">Sign out</NavLink>
                        </div>


                    </div>
                    <div className="sidebars__left-menu-wrapper" >
                        <ul className="sidebars__left-menu-wrapper__menu uk-navbar-left">
                            <li className="sidebars__left-menu-wrapper__menu__li">
                                <NavLink className={`sidebars__left-menu-wrapper__li ${currentRoute === "dashboard" ? 'active-sidebar-item' : ''}`} to="/dashboard">Dashboard</NavLink>
                            </li>
                            <li className="sidebars__left-menu-wrapper__menu__li">
                                <NavLink className={`sidebars__left-menu-wrapper__li ${currentRoute === "projects" ? 'active-sidebar-item' : ''}`} to="/projects">Projects</NavLink>
                            </li>
                            <li className="sidebars__left-menu-wrapper__menu__li">
                                <NavLink className="sidebars__left-menu-wrapper__li" to="/useragents">User Agent</NavLink>
                            </li >
                            <li className="sidebars__left-menu-wrapper__menu__li">
                                <NavLink className="sidebars__left-menu-wrapper__li" to="/proxies">Proxies</NavLink>
                            </li>
                            <li className="sidebars__left-menu-wrapper__menu__li">
                                <NavLink className="sidebars__left-menu-wrapper__li" to="/users">Users</NavLink>
                            </li>
                        </ul>
                    </div>
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