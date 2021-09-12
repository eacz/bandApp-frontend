import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext'

import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const ChartBand = () => {
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    //everytime the data change the chart should be redrawed
    let chart;
    
    socket.on('current-bands', (bands) => {
      //the chart should be destroyed before draw a new one
      if(chart){
        chart.destroy()
      }
      chart = createChart(bands)
    })
    return () => socket.off('current-bands');
  }, [socket])

  const createChart = (bands = []) => {
    const ctx = document.getElementById('bandChart')
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bands.map( band => band.name),
        datasets: [
          {
            label: '# of Votes',
            data: bands.map(band => band.votes),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
            stacked: true,
          },
          x: {
            stacked: true,
          },
        },
      },
    })
  }

  return <canvas height="50" id='bandChart'> </canvas>
}

export default ChartBand
