export let getDataAsPerYear = (data) => {
  let groupedData = {}, date
  data.map((matchScore) => {
    date = new Date(matchScore.date)
    date = date.getFullYear()
    if (!groupedData.hasOwnProperty(date)) {
      groupedData[date] = []
    }
    groupedData[date].push(matchScore)
  })
  return groupedData
}


let getTotalPerYear = (newData, oldData) => {
  let run = 0,
    tempSplitRun,
    catches,
    updatedData = JSON.parse(JSON.stringify(newData))
  
  if (newData.batting_score === 'TDNB' || newData.batting_score === 'DNB' || 
    newData.batting_score === '-') {
    return oldData
  } else {
    tempSplitRun = newData.batting_score.split('*')
    run = parseInt(tempSplitRun[0], 10)
    catches = (newData.catches === '-') ? 0 : parseInt(newData.catches, 10)
    updatedData = {
      totalRun: oldData.totalRun + run,
      notOutCount: tempSplitRun.length > 1 ? oldData.notOutCount+1 : oldData.notOutCount,
      totalMatchCount: oldData.totalMatchCount+1,
      centuries: run > 99 ? oldData.centuries+1 : oldData.centuries,
      halfCenturies: (run > 49 && run < 100) ? oldData.halfCenturies+1 : oldData.halfCenturies,
      catches: oldData.catches + catches
    }
  }
  return updatedData
}


export let processDataPerYear = (data) => {
  let groupedCalculatedData = {}, date

  data.map((matchScore) => {
    date = new Date(matchScore.date)
    date = date.getFullYear()
    if (!groupedCalculatedData.hasOwnProperty(date)) {
      groupedCalculatedData[date] = {
        totalRun: 0,
        notOutCount: 0,
        totalMatchCount: 0,
        centuries: 0,
        catches: 0,
        halfCenturies: 0
      }
    }
    groupedCalculatedData[date] = getTotalPerYear(matchScore, groupedCalculatedData[date])
  })
  return groupedCalculatedData
}


export let getDataForChartPerYear = (data, property) => {
  let processedData = {
    year: [],
    data: []
  }

  Object.keys(data).map((key) => {
    processedData.year.push(key)
    processedData.data.push(data[key][property])
  })
  return processedData
}

export let contributionChartData = (data) => {
  let groupedCalculatedData = {}, date, score

  data.map((matchScore) => {
    date = new Date(matchScore.date)
    date = date.getFullYear()
    if (!groupedCalculatedData.hasOwnProperty(date)) {
      groupedCalculatedData[date] = {
        scoredButLost: 0,
        scoredAndWon: 0,
        didNotScoreAndLost: 0
      }
    }
    if (matchScore.batting_score === 'TDNB' || matchScore.batting_score === 'DNB' || 
      matchScore.batting_score === '-') {
    } else {
      score = matchScore.batting_score.split('*')
      score = parseInt(score[0], 10)

      if (matchScore.match_result === 'won' && score >= 50) {
        groupedCalculatedData[date].scoredAndWon++
      } else if (matchScore.match_result === 'lost' && score < 35) {
        groupedCalculatedData[date].didNotScoreAndLost++
      } else if (matchScore.match_result === 'lost' && score >= 50) {
        groupedCalculatedData[date].scoredButLost++
      }
    }
  })
  return groupedCalculatedData
}


export let getScoreAccordingPlace = (sachinData, groundData) => {
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
  }, splittedArray = [], notOutHome = 0, notOutAway = 0, curScore = 0,
     chartData = {
       columns: ['Type', 'Matches', 'Runs', 'Average', 'Centuries', 'Half Centuries'],
       rows: []
     }

  sachinData.map((matchScore) => {
    if (matchScore.batting_score === 'TDNB' || matchScore.batting_score === 'DNB' || 
      matchScore.batting_score === '-') {
    } else {
      splittedArray = matchScore.batting_score.split('*')
      curScore = parseInt(splittedArray[0], 10)
      if (groundData.indexOf(matchScore.ground) === -1) {
        score.away.run += curScore
        score.away.matches++
        notOutAway = splittedArray.length > 1 ? notOutAway+1 : notOutAway
        score.away.centuries = curScore >= 100 ? score.away.centuries+1 : score.away.centuries
        score.away.halfCenturies = (curScore >= 50 && curScore < 100) ? score.away.halfCenturies+1 : score.away.halfCenturies
      } else {
        score.home.run += curScore
        score.home.matches++
        notOutHome = splittedArray.length > 1 ? notOutHome+1 : notOutHome
        score.home.centuries = curScore >= 100 ? score.home.centuries+1 : score.home.centuries
  score.home.halfCenturies = (curScore >= 50 && curScore < 100) ? score.home.halfCenturies+1 : score.home.halfCenturies
      }
    }
  })
  score.home.average = parseFloat((score.home.run / (score.home.matches - notOutHome)).toFixed(2))
  score.away.average = parseFloat((score.away.run / (score.away.matches - notOutAway)).toFixed(2))
  
  chartData.rows[0] = ['Home', score.home.matches, score.home.run, score.home.average, 
  score.home.centuries, score.home.halfCenturies]
  chartData.rows[1] = ['Away', score.away.matches, score.away.run, score.away.average, score.away.centuries, score.away.halfCenturies]
  console.log(chartData)
  return chartData
}


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
      type: 'line'
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

