import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getId } from '../../../utils';
import GLOBAL_CONFIG from '../../../config';
import { selectUser } from '../../../reducer/user';
import { loadProject, selectProject } from '../../../reducer/projects';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../../reducer/ui';




class ProjectCard extends Component {

  componentDidMount() {
    // TODO: Components renders three times
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

  // shouldComponentUpdate(nextProps) {
  //   const { user, project } = nextProps;
  //   if (!user === {}) {
  //     if (!project === {}) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   } else {
  //     return false
  //   }
  // }

  getProjectById = (user, id) => {
    const { loadProject, history } = this.props;
    fetch(`${GLOBAL_CONFIG.backendUrl}/projects/get-single?token=${user.token}&id=${id}`)
      .then(result => result.text())
      .then(result => {
        let answer = JSON.parse(result);
        if (answer.error) {
          history.push('/projects');
        }
        loadProject(answer);
      })
  }

  render() {
    const { project } = this.props;
    console.log(project.proxies);
    return (
      <div className="project-card-wrapper">
        <div className="project-card__heading-wrapper">
          <h2 className="project-card__heading__headline">{project.name}</h2>
          <div className="project-card__heading__button-wrapper">
            <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/projects/${project.id}/proxies` }} uk-toggle="target: #toggle-usage">Proxies</Link>
            <Link to={{ pathname: `/projects/${project.id}/keywords` }} className="project-card__heading__button uk-button uk-button-default" uk-tooltip="Keywords are empty">Keywords</Link>
            <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/projects/${project.id}/edit` }}>Settings</Link>
            <button className=" project-card__heading__button uk-button uk-button-default">Update</button>
            <button className=" project-card__heading__button uk-button uk-button-default">Delete</button>
            {project.proxies === undefined || project.proxies.length === 0 ? <p id="toggle-usage">Proxies are empty! Click here to add it! </p> : <p id="toggle-usage"></p>}

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