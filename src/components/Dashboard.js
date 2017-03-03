import React, {Component} from 'react'
import Chart from './ChartComponent'
import MBTable from './tableComponents'
import { generateInitialConfig, getCalculatedDataGroupedByYear,
  contributionInTeamChartData, getScoreAsPerGroundLocation } from './../Utils'
import { SACHIN_DATA } from './../data/sachinDetails'
import { GROUND_DATA } from './../data/groundsData'
import { BENCHMARK_GOOD_SCORE, BENCHMARK_BAD_SCORE} from './../Constant'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalRunChartConfig: {},
      averageChartConfig: {},
      highScoredChartConfig: {},
      contributionStatisticsConfig: {},
      homeAwayChartData: {}
    }
  }


  //Helper function to format data as per highchart configuration for totalRun
  getTotalRunChartData = (data) => {
    let processedData = {
      categories: [],
      series: [{name: 'Batting Score', data: []}]
    }

    Object.keys(data).map((key) => {
      processedData.categories.push(key)
      processedData.series[0].data.push(data[key]['totalRun'])
    })
    return processedData
  }

  //Helper function to format data as per highchart configuration for Average Rate
  getAverageChartData = (data) => {
    let processedData = {
      categories: [],
      series: [{name: 'Avearge Rate', data: []}]
    }, averageScore = 0

    Object.keys(data).map((key) => {
      processedData.categories.push(key)
      averageScore = data[key]['totalRun'] / (data[key]['totalMatchCount'] - data[key]['notOutCount'])
      averageScore = parseFloat(averageScore.toFixed(2))
      processedData.series[0].data.push(averageScore)
    })
    return processedData
  }

  //Helper function to format data as per highchart configuration for High 
  //Score i.e. Centuries and halfCenturies  
  getHighScoreChartData = (data) => {
    let processedData = {
      categories: [],
      series: [
        {
          name: 'Half Centuries',
          data: []
        }, {
          name: 'Centuries',
          data: []
        }
      ]
    }

    Object.keys(data).map((key) => {
      processedData.categories.push(key)
      processedData.series[0].data.push(data[key].halfCenturies)
      processedData.series[1].data.push(data[key].centuries)
    })
    return processedData
  }


  getContributionStatisticsChartData = (data) => {
    let processedData = {
      categories: [],
      series: [
        {
          name: 'Scored(>='+BENCHMARK_GOOD_SCORE+') and Team Won',
          data: [],
          stack: 'stats'
        }, {
          name: 'Did not Score(<'+BENCHMARK_BAD_SCORE+') and Team Lost',
          data: [],
          stack: 'stats'
        }
      ]
    }

    Object.keys(data).map((key) => {
      processedData.categories.push(key)
      processedData.series[0].data.push(data[key].scoredAndWon)
      processedData.series[1].data.push(data[key].didNotScoreAndLost)
    })
    return processedData
  }

  getHomeAwayChartData = (data) => {
    let processedData = {
      categories: [''],
      series: [
        {
          name: 'Home',
          data: []
        }, {
          name: 'Away',
          data: []
        }
      ]
    }, homeObj = data.home,
    awayObj = data.away

    Object.keys(data).map((key) => {
      processedData.categories.push(key)
      processedData.series[0].data.push(data[key].scoredAndWon)
      processedData.series[1].data.push(data[key].didNotScoreAndLost)
      processedData.series[2].data.push(data[key].scoredButLost)
    })
    return processedData
  }

  //Generic funtion to set chart configuration and set the sate
  setChartConfigState = (config) => {
    let tempConfig = {}
    Object.keys(config).map((key) => {
      tempConfig = generateInitialConfig()
      tempConfig.chart.type = config[key].chartType || 'line'
      tempConfig.title.text = config[key].title || ''
      tempConfig.xAxis.title.text = config[key].xAxisTitle || ''
      tempConfig.yAxis.title.text = config[key].yAxisTitle || ''
      tempConfig.xAxis.categories = config[key].data.categories,
      tempConfig.series = config[key].data.series
      tempConfig.plotOptions = config[key].plotOptions || {}
      this.setState({[key]: tempConfig})
    })
  }


  componentDidMount () {
    let calculatedData = getCalculatedDataGroupedByYear(SACHIN_DATA),
      contributionStatistics = contributionInTeamChartData(SACHIN_DATA),
      homeAwayData = getScoreAsPerGroundLocation(SACHIN_DATA, GROUND_DATA.India),
      chartConfigurations = {
        totalRunChartConfig: {
          title: 'Total Batting Score vs Year',
          yAxisTitle: 'Batting Score',
          xAxisTitle: 'Year',
          data: this.getTotalRunChartData(calculatedData)
        }, 
        averageChartConfig: {
          title: 'Batting Average Rate vs Year',
          yAxisTitle: 'Batting Average Rate',
          xAxisTitle: 'Year',
          data: this.getAverageChartData(calculatedData)
        },
        highScoredChartConfig: {
          title: 'Centuries & Half Centuries Count vs Year',
          yAxisTitle: 'Batting Score Count',
          xAxisTitle: 'Year',
          data: this.getHighScoreChartData(calculatedData),
          chartType: 'column'
        },
        contributionStatisticsConfig: {
          plotOptions: {column: {stacking: 'normal'}},
          title: 'Contribution Statistics vs Year',
          yAxisTitle: 'Count',
          xAxisTitle: 'Year',
          data: this.getContributionStatisticsChartData(contributionStatistics),
          chartType: 'column'
        }
      }
    this.setChartConfigState(chartConfigurations)
    this.setState({
      homeAwayChartData: homeAwayData
    })
  }

  render () {
    return (
      <div>
        <MBTable tableData={this.state.homeAwayChartData} tableTitle={'Home/Away Batting Statistics'}/>
        <Chart config={this.state.totalRunChartConfig}/>
        <Chart config={this.state.averageChartConfig}/>
        <Chart config={this.state.highScoredChartConfig}/>
        <Chart config={this.state.contributionStatisticsConfig}/>
      </div>
    )
  }
}