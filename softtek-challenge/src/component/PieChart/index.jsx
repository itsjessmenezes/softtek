/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export const PieChart = ({ data, labels }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
  
    useEffect(() => {
      if (chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
  
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              label: 'Pie Chart',
              data: data,
              backgroundColor: [
                'rgba(162,87,247,1)',
                '#E1E9FF',
              ],
              // borderColor: [
              //   'rgba(255, 99, 132, 1)',
              //   'rgba(54, 162, 235, 1)',
              //   'rgba(255, 206, 86, 1)',
              //   'rgba(75, 192, 192, 1)',
              //   'rgba(153, 102, 255, 1)',
              //   'rgba(255, 159, 64, 1)'
              // ],
              // borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'left',
              },
            }
          }
        });
      }
  
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, [data, labels]);
  
  
    return <canvas ref={chartRef} style={{ maxWidth: '100%', maxHeight: '10rem' }} />;
  }