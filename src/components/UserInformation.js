import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import moment from "moment";
import { db } from "../firebase";
//import { BarChart } from "@material-ui/icons";

let interestMonthlyArray = [];
let principleMonthlyArray = [];
let debtRemainArray = [];

export function GetDebtInformation() {
  const { currentUser } = useAuth(); //Get the UUID of current login users

  async function fetchUserDebtInformation() {
    const docRef = db.collection("UserFinance").doc(currentUser.uid);
    let doc = await docRef.get();
    doc = doc.data();
    var debt = doc.DebtAmount;
    var interest = doc.DebtInterestRate / 100;
    var monthlyPayment = doc.DebtMonthlyPayment;

    const userDebtInformationObject = {
      debt: debt,
      interest: interest,
      monthlyPayment: monthlyPayment,
    };
    return userDebtInformationObject;
  }
  let totalInterest = 0;

  async function calculate() {
    var debtObject = await fetchUserDebtInformation();
    var interest = Number(debtObject.interest);
    var interestPerBalance = interest / 12;
    var debt = Number(debtObject.debt);
    var monthlyPayment = Number(debtObject.monthlyPayment);
    interestPerBalance = interestPerBalance.toFixed(8);
    while (debt > 0) {
      var MonthlyInterestAmount = debt * interestPerBalance;
      var MonthlyPrincipleAmount = monthlyPayment - MonthlyInterestAmount;
      totalInterest += MonthlyInterestAmount;
      var previousDebt = debt;
      debt = debt - MonthlyPrincipleAmount;
      if (debt < 0) {
        MonthlyPrincipleAmount = previousDebt;
        debt = 0;
      }
      interestMonthlyArray.push(MonthlyInterestAmount.toFixed(2));
      principleMonthlyArray.push(MonthlyPrincipleAmount.toFixed(2));
      debtRemainArray.push(debt.toFixed(2));
    }
  }

  calculate();
  const debtInformationObject = {
    interestMonthlyArray: interestMonthlyArray,
    principleMonthlyArray: principleMonthlyArray,
    totalInterest: totalInterest.toFixed(2),
    debtRemainArray: debtRemainArray,
  };

  return debtInformationObject;
}

export default { GetDebtInformation };
