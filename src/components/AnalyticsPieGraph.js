import React from "react";
import { Bar, Chart } from "react-chartjs-2";
import UserInformation from "./UserInformation";
import moment from "moment";
//disable tooltips
//Chart.defaults.plugins.tooltip = false

const PieGraph = () => {
  const { GetDebtInformation } = UserInformation;
  const debtInformation = GetDebtInformation();
  var months = moment.months();
  var coming12Months = months
    .concat(months.slice(0, moment().month()))
    .slice(-12);
  var debtbalance = debtInformation.debtRemainArray;
  console.log(Object.values(debtbalance));
  return <div></div>;
};

export default PieGraph;
