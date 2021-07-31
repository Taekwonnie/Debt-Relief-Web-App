import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { db } from "../firebase";
import UserInformation from "./UserInformation";
import moment from "moment";
const LineChart = () => {
  const { GetDebtInformation } = UserInformation;
  const debtInformation = GetDebtInformation();
  var months = moment.months();
  var coming12Months = months
    .concat(months.slice(0, moment().month()))
    .slice(-12);
  // will change some things to make it not a linear line graph
  return (
    <div>
      <Line
        data={{
          labels: coming12Months,
          datasets: [
            {
              label: "Monthly Debt Balance Remain",
              data: debtInformation.debtRemainArray,
              backgroundColor: ["rgb(71,71,253)", "rgb(128,128,255"],
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
