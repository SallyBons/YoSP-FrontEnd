import React, { Component } from 'react'
import Chart from "chart.js";
import '../styles.css';
import { getId } from '../../../utils';
import GLOBAL_CONFIG from '../../../config';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../../reducer/ui';
import { addAlert } from '../../../reducer/alerts';
import { selectUser } from '../../../reducer/user';

class LineChart extends Component {
    chartRef = React.createRef();
    state = {
        keywordInfo: {},
    }
    componentDidMount() {

        this.handleInitialize();
        // const { keywordInfo } = this.state;
        // console.log(keywordInfo)

    }

    handleInitialize() {
        setTimeout(() => {
            let { user } = this.props;
            this.getKeywordInfo(user);//without this we have empty user at props on initialazing
        }, 1);
    }

    getKeywordInfo = (user) => {
        let { addAlert } = this.props;
        const { pathname } = this.props.location;
        fetch(`${GLOBAL_CONFIG.backendUrl}/keywords/get?token=${user.token}&keyword_id=${getId(pathname)}`)
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                if (answer.error) {
                    addAlert("warning", answer.error);
                }
                return answer.keyword_data;

                // else {
                //      this.setState({
                //        keywordInfo: answer.keyword,
                //         })
                // }
            }).then(result => {
                const myChartRef = this.chartRef.current.getContext("2d");
                const labels = result.map(value => Object.keys(value)[0]); 
                const data = result.map(value => {
                    return {
                        x: Object.keys(value)[0],
                        y: value[Object.keys(value)[0]],
                    }
                });
                            

                new Chart(myChartRef, {
                    type: "line",
                    data: {
                        //Bring in data
                        labels: labels,
                        datasets: [
                            {
                                label: "Position",
                                // data: [86, 67, 91],
                                // data: result,
                                data: data,
                                fill: false,
                                borderColor: "#6610f2"
                            }
                        ]
                    },
                    options: {
                        //Customize chart options
                    }
                });
            }

            ).catch(() => {
                addAlert("danger", "Server is not responding. Something went wrong");
            });
    }



    render() {
        return (
            <div className="lineChart-container">
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
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
export default connect(mapStateToProps, mapDispatchToProps)(LineChart);