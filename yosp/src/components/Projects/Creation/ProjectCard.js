import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { getId } from '../../../utils';
import GLOBAL_CONFIG from '../../../config';
import { selectUser } from '../../../reducer/user';
import { loadProject, selectProject } from '../../../reducer/projects';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../../reducer/ui';
import {
  Redirect
} from 'react-router-dom';



class ProjectCard extends PureComponent {
  componentDidMount() {
    const { pathname } = this.props.location;
    let awaitReduxLoad = () => {
      setTimeout(() => {
        const { user } = this.props;
        this.getProjectById(user, getId(pathname))//without this we have empty user at props on initialazing
      }, 1);
    }
    awaitReduxLoad();
    const { setCurrentPage } = this.props;
        setCurrentPage("projects");
  }

  getProjectById = (user, id) => {
    const { loadProject,history } = this.props;
    fetch(`${GLOBAL_CONFIG.backendUrl}/projects/get-single?token=${user.token}&id=${id}`)
      .then(result => result.text())
      .then(result => {
        let answer = JSON.parse(result);
        if (answer.error){
history.push('/projects');
        }
        loadProject(answer);
      })
  }




  render() {
    const { project } = this.props;
    return (
      <div className="project-card-wrapper">
        <div className="project-card__heading-wrapper">
          <h2 className="project-card__heading__headline">{project.name}</h2>
          <div className="project-card__heading__button-wrapper">
            <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/projects/${project.id}/proxies` }}>Proxies</Link>
            <Link to={{ pathname: `/projects/${project.id}/keywords` }} className="project-card__heading__button uk-button uk-button-default">Keywords</Link>
            {/* <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: "/projects/496a5bcb1a0e2762c7c72aa8dcd9002e/edit", incomingProject: incomingProject }}>Edit</Link> */}
            <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/projects/${project.id}/edit` }}>Settings</Link>
            <button className=" project-card__heading__button uk-button uk-button-default">Update</button>
            <button className=" project-card__heading__button uk-button uk-button-default">Delete</button>

          </div>
        </div>



        {/* onClick={()=>getDataFromBackEnd(user)} */}

      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: selectUser(state),
  project: selectProject(state)
});
const mapDispatchToProps = {
  loadProject,
  setCurrentPage,
};



export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);