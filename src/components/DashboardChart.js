import React from 'react';
import { Bar, Chart } from 'react-chartjs-2';

//disable tooltips
//Chart.defaults.plugins.tooltip = false

const DashboardChartType = () => {
    return <div>
        <Bar
            data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                    label: 'Monthly Debt Payoff',
                    data: [350, 400, 450, 300, 350, 450, 500, 340, 300, 550, 650, 360],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Monthly Total Debt Amount',
                    data: [5000, 4650, 4250, 3800, 3500, 3150, 2700, 2200, 1860, 1560, 1010, 360],
                    backgroundColor: 'red',
                    borderColor: 'red'
                }
            ],
            }}
            height={400}
            width={600}
            options={{
                maintainAspectRatio: false,
                scales: {
                    yAxis: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }}
        />
    </div>
}

export default DashboardChartType