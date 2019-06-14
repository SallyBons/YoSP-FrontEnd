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

            user.name ?
                <React.Fragment>
                    <div className="logout_wrapper">
                        <NavLink className="uk-button uk-button-default" to="/logout">Log Out</NavLink>
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
                </React.Fragment>
                : <React.Fragment></React.Fragment>

        );


    }
}

const mapStateToProps = state => ({
    user: selectUser(state)
});

export default connect(mapStateToProps)(Sidebars)