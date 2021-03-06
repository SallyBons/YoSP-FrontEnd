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
        keywordData: [],
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
                } else {
                    this.setState({ keywordInfo: answer.keyword });
                    this.setState({ keywordData: answer.keyword_data })
                }
                return answer.keyword_data;

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
                                data: data,
                                fill: false,
                                borderColor: "#0362BF"
                            }
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    reverse: true,
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    reverse: false,
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            }

            ).catch(() => {
                addAlert("danger", "Server is not responding. Something went wrong");
            });
    }

    positionDifference = (currentValue, previousValue) => {
        return (currentValue - previousValue) * -1;
        // return ((currentValue - previousValue) * -1 !== 0 ? (currentValue - previousValue) * -1 : "-");
    }

    renderList = (dataReworked) => {
        let resultArray = []
        for (let index = 0; index < dataReworked.length; index++) {
            const currentKeyword = dataReworked[index];
            const previousKeyword = dataReworked[index - 1];
            if (!previousKeyword) {
                resultArray.push(<div className="lineChart-container-dynamics__renderList"><span className="lineChart-container-dynamics__element">{currentKeyword.date}  </span> <div className="lineChart-container-dynamics__position"> <span className="lineChart-container-dynamics__element">{currentKeyword.position}</span> <span className="lineChart-container-dynamics__element-changes " >0</span> </div> </div>)
            } else {
                resultArray.push(
                    <div className="lineChart-container-dynamics__renderList">
                        <span className="lineChart-container-dynamics__element">{currentKeyword.date} </span>
                        <div className="lineChart-container-dynamics__position">
                            <span className="lineChart-container-dynamics__element">{currentKeyword.position}</span>
                            <span className={`lineChart-container-dynamics__element-changes ${this.positionDifference(currentKeyword.position, previousKeyword.position) < 0 ? 'red ' : ''} ${this.positionDifference(currentKeyword.position, previousKeyword.position) > 0 ? 'green' : ''}`}>
                                {this.positionDifference(currentKeyword.position, previousKeyword.position)}
                            </span>
                        </div>
                    </div>)
            }
        }
        return resultArray;
    }



    render() {
        const { keywordInfo, keywordData } = this.state;
        const timeLine = keywordData.map(value => Object.keys(value)[0]);
        const dataReworked = keywordData.map(value => {
            return {
                date: Object.keys(value)[0],
                position: value[Object.keys(value)[0]],
            }
        });
        return (
            <div className="lineChart-container-wrapper">
                <div className="lineChart-container-wrapper__heading">
                    <h2 className="lineChart-container-wrapper__heading__headline">Chart: {keywordInfo.keyword}</h2>
                    <h3 className="lineChart-container-wrapper__heading__text"> Time Line:  {timeLine[0]} - {timeLine[timeLine.length - 1]}</h3>
                </div>
                <div className="lineChart-container">
                    <canvas
                        id="myChart"
                        ref={this.chartRef}
                    />
                </div>
                <div className="lineChart-container-dynamics">
                    <h3 className="lineChart-container-dynamics__heading">Dynamics</h3>
                    {this.renderList(dataReworked)}
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
export default connect(mapStateToProps, mapDispatchToProps)(LineChart);