import React, { PureComponent } from 'react';
import 'uikit/dist/css/uikit.min.css';
import './styles.css';
import { Link } from 'react-router-dom';


class UserManager extends PureComponent {
    componentDidMount() {
        document.title = 'YoSP: Users';
    }

    render() {
        return (
            <div className="user-manager-wrapper">
                <div className="user-manager__header">
                    <h2 className="user-manager__header__headline"> Users</h2>
                    <div className="user-manager__header__button-wrapper" >
                    <button className="user-manager__header__button uk-button uk-button-default"  >UPDATE</button>
                        <Link className="user-manager__header__button uk-button uk-button-default" to="/users/add">ADD</Link>
                    </div>
                </div>
                <p>This route will be implemented in the future releases.</p>
            </div>

        );
    }
}

export default UserManager;