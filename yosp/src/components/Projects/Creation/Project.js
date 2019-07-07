import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';



class Project extends PureComponent {

    handleDeleteButton = () => {
        // const { toggleDeleteButton, id, login, password, ip, port } = this.props;
        // toggleDeleteButton(id, login, password, ip, port);
    }

    render() {
        const { incomingProject } = this.props;
            return (
            
            <div className="project-wrapper">
                 <Link className="project__link" to={`/projects/${incomingProject.project_id}`}>

               
                <div className="project__main-info">
                    <span> Name:{incomingProject.project_name}</span>
                    <span> Location:{incomingProject.location}</span>
                </div>
                <div className="project__additional-info">
                    <span> Keyword count:</span>
                    <span> Average position:</span>
                </div>
                </Link>
                {/* <Link to={`/projects/${incomingProject.id}`}></Link> */}
               
                {/* <div className="proxy__buttons-wrapper">
                    <Link className="proxy__button uk-button uk-button-default" to={{ pathname: "/proxies/edit", incomingProxy: incomingProxy }}>Edit</Link>

                    <button className=" proxy__button uk-button uk-button-default" onClick={this.handleDeleteButton}>Delete</button>
                </div> */}
                 
            </div>


        );
    }
}



export default (Project);