import React from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { db } from '../firebase';

//disable tooltips
//Chart.defaults.plugins.tooltip = false


const LineChart = () => {
    return <div>
        <Line
            
            data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Monthly Debt Amount',
                        data: [350, 400, 450, 300, 350, 450, 500, 340, 300, 550, 650, 360],
                        backgroundColor: ['rgb(71,71,253)', 'rgb(128,128,255'],
                        borderColor: 'black',
                        borderWidth: 1
                    },
                ]
            }}

            height={400}
            width={600}

            options={{
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }}
        />
    </div>
}


export default LineChart;