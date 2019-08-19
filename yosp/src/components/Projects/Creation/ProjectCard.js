import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getId } from '../../../utils';
import GLOBAL_CONFIG from '../../../config';
import { selectUser } from '../../../reducer/user';
import { loadProject, selectProject } from '../../../reducer/projects';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../../reducer/ui';
import { addAlert } from '../../../reducer/alerts';



class ProjectCard extends Component {
  state = {
    projectKeywords: [],
  }

  componentDidMount() {
    // TODO: Components renders three times
    const { pathname } = this.props.location;
    let awaitReduxLoad = () => {
      setTimeout(() => {
        const { user } = this.props;
        this.getProjectById(user, getId(pathname))//without this we have empty user at props on initialazing
        this.getKeywords(user)
      }, 1);
    }
    awaitReduxLoad();
    const { setCurrentPage } = this.props;
    setCurrentPage("projects");
  }

  getKeywords = (user) => {
    let { addAlert, project } = this.props;
    fetch(`${GLOBAL_CONFIG.backendUrl}/keyword-groups/get-all?token=${user.token}&project_id=${project.id}`)
      .then(result => result.text())
      .then(result => {
        let answer = JSON.parse(result);
        if (answer.error) {
          addAlert("warning", answer.error);
        } else {
          this.setState({ projectKeywords: answer.keyword_groups })
        }
      }).catch(() => {
        addAlert("danger", "Server is not responding. Something went wrong");
      });;
  }

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
    const { projectKeywords} = this.state;
    const { project } = this.props;
    console.log(projectKeywords)
    return (
      <div className="project-card-wrapper">
        <div className="project-card__heading-wrapper">
          <h2 className="project-card__heading__headline">{project.name}</h2>
          <div className="project-card__heading__button-wrapper">
            <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/projects/${project.id}/proxies` }} uk-toggle="target: #toggle-proxies">Proxies</Link>
            <Link to={{ pathname: `/projects/${project.id}/keywords` }} className="project-card__heading__button uk-button uk-button-default" uk-toggle="target: #toggle-keywords">Keywords</Link>
            <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/projects/${project.id}/edit` }}>Settings</Link>
            <button className=" project-card__heading__button uk-button uk-button-default">Update</button>
            <button className=" project-card__heading__button uk-button uk-button-default">Delete</button>
          </div>
        </div>

        <div className="project-card__toggle-wrapper">
          {project.proxies !== undefined && project.proxies.length === 0 ? <p id="toggle-proxies" className="project-card__toggle uk-alert-primary">Proxies are empty! Click here to add it! </p> : <p id="toggle-proxies"></p>}
          {projectKeywords === [] &&  projectKeywords.length === 0 ? <p id="toggle-keywords" className="project-card__toggle uk-alert-primary">Keyword groups are empty! Click here to add it! </p> : <p id="toggle-keywords"></p>}
        </div>
        <div className="project-card__content-wrapper">
          {projectKeywords.map(keywords => (
            <div>
              {keywords.title}
            </div>
          ))}
        </div>
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
  addAlert,
};



export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);