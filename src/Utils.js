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

