import React, { PureComponent } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './styles.css';
// import { connect } from 'react-redux';
// import { selectUser } from '../reducer/user';
import 'uikit/dist/css/uikit.min.css';

import { connect } from 'react-redux';
import { selectUser } from '../../reducer/user'

class Sidebars extends PureComponent {

    render() {

        const { user } = this.props;

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
                                <Link to="/projects">Projects</Link>
                            </li>
                            <li className="sidebars__left-menu-wrapper__menu__li">
                                <Link to="/useragents">User Agent</Link>
                            </li >
                            <li className="sidebars__left-menu-wrapper__menu__li">
                                <Link to="/proxies">Proxies</Link>
                            </li>
                            <li className="sidebars__left-menu-wrapper__menu__li">
                                <Link to="/users">Users</Link>
                            </li>

                        </ul>
                    </div>
                </React.Fragment>
                : <React.Fragment></React.Fragment>

        );


    }
}

const mapStateToProps = state => ({
    user: selectUser(state)
});

export default connect(mapStateToProps)(Sidebars)