import React, { PureComponent } from 'react';
import { getId } from '../../../utils';
import GLOBAL_CONFIG from '../../../config';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../../reducer/ui';
import { addAlert } from '../../../reducer/alerts';
import { selectUser } from '../../../reducer/user';
import { Link } from 'react-router-dom';

class KeywordGroup extends PureComponent {

    state = {
        keywords: [],
    }

    componentDidMount() {
        const { setCurrentPage } = this.props;

        // Sidebar
        setCurrentPage("projects");
        this.handleInitialize();

    }

    handleInitialize() {
        setTimeout(() => {
            let { user } = this.props;
            this.getKeywordGroupSingle(user);//without this we have empty user at props on initialazing
        }, 1);
    }

    getKeywordGroupSingle = (user) => {
        let { addAlert } = this.props;
        const { pathname } = this.props.location;
        console.log(user.token)
        fetch(`${GLOBAL_CONFIG.backendUrl}/keyword-groups/get-single?token=${user.token}&keyword_group_id=${getId(pathname)}`)
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                if (answer.error) {
                    addAlert("warning", answer.error);
                } else {
                     this.setState({
                       keywords: answer.keyword_group.keywords,
                        })
                }
            }).catch(() => {
                addAlert("danger", "Server is not responding. Something went wrong");
            });
    }

    render() {
        const { keywords} = this.state;
        console.log(keywords)
        return (
            <div className=" keywordGroup-container">
                <h2 className="keywordGroup-heading">KeywordGroup</h2>

                <div className="project-card__content-wrapper">
                 {keywords.map(keyword => (
                 <div> 
                  <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/keywords/${keyword.id}` }}> {keyword.keyword}</Link>
            </div>
              ))} 
            </div>
            
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: selectUser(state),
});
const mapDispatchToProps = {
    setCurrentPage,
    addAlert,
};
export default connect(mapStateToProps, mapDispatchToProps)(KeywordGroup);