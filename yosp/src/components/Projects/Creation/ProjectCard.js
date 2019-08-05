import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';



class ProjectCard extends PureComponent {

  render() {
    const { incomingProjectInfo } = this.props.location;
      return (
      <div className="project-card-wrapper">
        <div className="project-card__heading-wrapper">
          <h2 className="project-card__heading__headline">{incomingProjectInfo.name}</h2>
          <div className="project-card__heading__button-wrapper">
            <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/projects/${incomingProjectInfo.id}/proxies`}}>Proxies</Link>
            <Link to="/projects/496a5bcb1a0e2762c7c72aa8dcd9002e/keywords" className="project-card__heading__button uk-button uk-button-default">Keywords</Link>
            {/* <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: "/projects/496a5bcb1a0e2762c7c72aa8dcd9002e/edit", incomingProject: incomingProject }}>Edit</Link> */}
            <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/projects/${incomingProjectInfo.id}/edit`}}>Settings</Link>
            <button className=" project-card__heading__button uk-button uk-button-default">Update</button>
            <button className=" project-card__heading__button uk-button uk-button-default">Delete</button>

          </div>
        </div>



        {/* onClick={()=>getDataFromBackEnd(user)} */}

      </div>
    );
  }
}



export default (ProjectCard);