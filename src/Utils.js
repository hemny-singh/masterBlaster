import { SACHIN_DATA } from './data/sachinDetails'
import { BENCHMARK_GOOD_SCORE, BENCHMARK_BAD_SCORE} from './Constant'


let checkIfScoreIsValid = (score) => {
  if (score.batting_score === 'TDNB' || score.batting_score === 'DNB' || 
    score.batting_score === '-') {
    return false
  } else {
    return true
  }
}

export let calculateSumOfAllAttributes = (newData, oldData) => {
  let run = 0,
    tempSplitRun,
    catches,
    updatedData = JSON.parse(JSON.stringify(newData))   //Should not mutate the data
  
  //Checking if team did not play or score is not valid
  if (checkIfScoreIsValid(newData)) {
    tempSplitRun = newData.batting_score.split('*')
    run = parseInt(tempSplitRun[0], 10)
    catches = (newData.catches === '-') ? 0 : parseInt(newData.catches, 10)
    updatedData = {
      totalRun: oldData.totalRun + run,
      notOutCount: tempSplitRun.length > 1 ? oldData.notOutCount+1 : oldData.notOutCount,
      playedMatchCount: oldData.playedMatchCount+1,
      centuries: run > 99 ? oldData.centuries+1 : oldData.centuries,
      halfCenturies: (run > 49 && run < 100) ? oldData.halfCenturies+1 : oldData.halfCenturies,
      catches: oldData.catches + catches
    }
  } else {
    updatedData = JSON.parse(JSON.stringify(oldData))  
  }
  updatedData.totalMatchCount = oldData.totalMatchCount + 1
  return updatedData
}

//Get the total of all properties like score, centuries count for each year
export let getCalculatedDataGroupedByYear = (data) => {
  let groupedCalculatedData = {}, date

  data.map((matchScore) => {
    //Getting year from the given date
    date = new Date(matchScore.date)
    date = date.getFullYear()
    if (!groupedCalculatedData.hasOwnProperty(date)) {
      //Initializing the data for each date
      groupedCalculatedData[date] = {
        totalRun: 0,
        notOutCount: 0,
        totalMatchCount: 0,
        centuries: 0,
        catches: 0,
        halfCenturies: 0,
        playedMatchCount: 0
      }
    }
    groupedCalculatedData[date] = calculateSumOfAllAttributes(matchScore, groupedCalculatedData[date])
  })
  return groupedCalculatedData
}

//Calculating player contribution in team's win for each year
export let contributionInTeamChartData = (data) => {
  let groupedCalculatedData = {}, date, score

  data.map((matchScore) => {
    date = new Date(matchScore.date)
    date = date.getFullYear()
    if (!groupedCalculatedData.hasOwnProperty(date)) {
      groupedCalculatedData[date] = {
        scoredAndWon: 0,
        didNotScoreAndLost: 0
      }
    }
    if (checkIfScoreIsValid(matchScore)) {
      score = matchScore.batting_score.split('*')
      score = parseInt(score[0], 10)
      if (matchScore.match_result === 'won' && score >= BENCHMARK_GOOD_SCORE) {
        groupedCalculatedData[date].scoredAndWon++
      } else if (matchScore.match_result === 'lost' && score < BENCHMARK_BAD_SCORE) {
        groupedCalculatedData[date].didNotScoreAndLost++
      }
    }
  })
  return groupedCalculatedData
}

//Helper function to sum up the cricket properties
let increaseCount = (oldData, curScore) => {
  let updatedData = JSON.parse(JSON.stringify(oldData))
  updatedData = {
    run: oldData.run + curScore,
    matches: oldData.matches+1,
    centuries: curScore >= 100 ? oldData.centuries+1 : oldData.centuries,
    halfCenturies: (curScore >= 50 && curScore < 100) ? oldData.halfCenturies+1 : oldData.halfCenturies
  }
  return updatedData
}

//Function to calculated total of all attributes according to the playing location categorised as Home or Away
export let getScoreAsPerGroundLocation = (data, groundData) => {
  let score = {
    home: {
      matches: 0,
      run: 0,
      centuries: 0,
      halfCenturies: 0,
      average: 0
    },
    away: {
      matches: 0,
      run: 0,
      centuries: 0,
      halfCenturies: 0,
      average: 0
    }
  }, splittedArray = [], notOutHome = 0, notOutAway = 0, curScore = 0
  let chartData = {
    columns: ['Type', 'Matches', 'Runs', 'Average', 'Centuries', 'Half Centuries'],
    rows: []
  }

  data.map((matchScore) => {
    if(checkIfScoreIsValid(matchScore)) {
      splittedArray = matchScore.batting_score.split('*')
      curScore = parseInt(splittedArray[0], 10)

      if (groundData.indexOf(matchScore.ground) === -1) {
        score.away = increaseCount(score.away, curScore)
        notOutAway = splittedArray.length > 1 ? notOutAway+1 : notOutAway
      } else {
        score.home = increaseCount(score.home, curScore)
        notOutHome = splittedArray.length > 1 ? notOutHome+1 : notOutHome
      }
    }
  })
  //To set precision to 2 decimal places 
  score.home.average = parseFloat((score.home.run / (score.home.matches - notOutHome)).toFixed(2))
  score.away.average = parseFloat((score.away.run / (score.away.matches - notOutAway)).toFixed(2))
  
  chartData.rows[0] = ['Home', score.home.matches, score.home.run, score.home.average, 
  score.home.centuries, score.home.halfCenturies]
  chartData.rows[1] = ['Away', score.away.matches, score.away.run, score.away.average, score.away.centuries, score.away.halfCenturies]
  return chartData
}

//Counting Sachin's Total Score to compare with other players
export let getSachinTotalScoreODI = (data) => {
  let chartData = {
    match: data.length,
    runs: 0,
    highestScore: 0,
    centuries: 0,
    halfCenturies: 0,
    averageRate: 0
  }, splittedArray = [], curScore,
    notOutCount = 0, playedMatchCount = 0

  data.map((matchData) => {
    if (checkIfScoreIsValid(matchData)) {
      playedMatchCount++
      splittedArray = matchData.batting_score.split('*')
      curScore = parseInt(splittedArray[0], 10)
      chartData.runs += curScore
      chartData.highestScore = curScore > chartData.highestScore ? curScore : chartData.highestScore
      notOutCount = splittedArray.length > 1 ? notOutCount+1 : notOutCount
      chartData.centuries = curScore >= 100 ? chartData.centuries+1 : chartData.centuries
      chartData.halfCenturies = (curScore >= 50 && curScore < 100) ? chartData.halfCenturies+1 : chartData.halfCenturies
    }
  })
  chartData.averageRate = chartData.runs / (playedMatchCount - notOutCount)
  return chartData
}

//Here we are processing the data as per chart data format for Statistics Analysis Page
export let getStatAnalysisData = (data, type) => {
  let chartData = {
      match: {},
      runs: {},
      highestScore: {},
      centuries: {},
      halfCenturies: {},
      averageRate: {}
    }, playRecord = {}, sachinData = getSachinTotalScoreODI(SACHIN_DATA)
  
  //We are calculing data from detailed data for Sachin
  if (type === 'ODI') {
    Object.keys(sachinData).map((key) => {
      chartData[key]['categories'] = ['Sachin Tendulkar']
      chartData[key]['series'] = [{name: key, data: [sachinData[key]]}]
    })
  }

  Object.keys(data).map((playerName) => {
    playRecord = data[playerName]
    Object.keys(playRecord).map((key) => {
      if (chartData.hasOwnProperty(key)) {
        if (!chartData[key].hasOwnProperty('categories')) {
        chartData[key]['categories'] = []
        }
        if (!chartData[key].hasOwnProperty('series')) {
          chartData[key]['series'] = [{name: key, data: []}]
        }
        chartData[key]['categories'].push(playerName)
        chartData[key]['series'][0].data.push(playRecord[key])
      }
    })
  })
  return chartData
}


//Initial Configuration for Highcharts
export let generateInitialConfig = () => {
  return {
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      title: {
        text: ''
      },
      categories: []
    },
    chart: {
      type: 'spline'
    },
    colors: ['#398dc6', '#f26d7d', '#1c9a71', '#b34ab2', '#f39448', '#0051a2', '#5bc0de'],
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {},
    legend: {},
    series: []
  }
}