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
  console.log(processedData)
  return processedData
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
      categories: []
    },
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

