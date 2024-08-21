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
                'rgb(54, 53, 162)',
                'rgba(162,87,247)',
                'rgb(111, 108, 246)',
                'rgb(175, 132, 224)',
              ],
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