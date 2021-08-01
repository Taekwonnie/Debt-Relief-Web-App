import React from "react";
import { Bar, Chart } from "react-chartjs-2";
import UserInformation from "./UserInformation";
import moment from "moment";
//disable tooltips
//Chart.defaults.plugins.tooltip = false

const BarChart = () => {
  const { GetDebtInformation } = UserInformation;
  const debtInformation = GetDebtInformation();
  var months = moment.months();
  var coming12Months = months
    .concat(months.slice(0, moment().month()))
    .slice(-12);
  return (
    <div>
      <Bar
        data={{
          labels: coming12Months,
          datasets: [
            {
              label: "Total Debt Balance Remain",
              data: debtInformation.debtRemainArray,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 1,
              borderColor: "rgba(255, 99, 132, 1)",
            },

            {
              label: "Monthly Debt Principle Payoff",
              data: debtInformation.principleMonthlyArray,
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
            {
              label: "Monthly Debt Interest Payoff",
              data: debtInformation.interestMonthlyArray,
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
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
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default BarChart;
