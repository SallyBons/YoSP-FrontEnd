import React, { PureComponent } from 'react';
import 'uikit/dist/css/uikit.min.css';
 import './styles.css';
 import { Link } from 'react-router-dom';

class ProjectManager extends PureComponent {
  componentDidMount() {
    document.title = 'YoSP: Projects';
  }

  render() {
    return (
        <div className="project-manager-wrapper">
            <div className="project-manager__header">
                <h2 className="project-manager__header__headline"> Projects</h2>
                <div className="project-manager__header__button-wrapper" >
                <button className="project-manager__header__button uk-button uk-button-default"  >UPDATE</button>
                    <Link className="project-manager__header__button uk-button uk-button-default" to="/projects/add">ADD</Link>
                </div>
            </div>
        </div>

    );
}
}

export default ProjectManager;