import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import moment from "moment";
import { db } from "../firebase";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
//import { BarChart } from "@material-ui/icons";

let interestMonthlyArray = [];
let principleMonthlyArray = [];
let debtRemainArray = [];

export function GetDebtInformation() {
  const { currentUser } = useAuth(); //Get the UUID of current login users
  const [totalInterest, setTotalInterest] = useState(0);

  async function fetchUserDebtInformation() {
    //Fetch user debt,interest,monthlypayment then return as an object
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
    console.log("Reading database...");
    return userDebtInformationObject;
  }

  async function calculate() {
    var debtObject = await fetchUserDebtInformation();
    var totalInterests = 0;
    var interest = Number(debtObject.interest);
    var interestPerBalance = interest / 12;
    var debt = Number(debtObject.debt);
    var monthlyPayment = Number(debtObject.monthlyPayment);
    interestPerBalance = interestPerBalance.toFixed(8);
    while (debt > 0) {
      var MonthlyInterestAmount = debt * interestPerBalance;
      var MonthlyPrincipleAmount = monthlyPayment - MonthlyInterestAmount;
      totalInterests += MonthlyInterestAmount;
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
    setTotalInterest(totalInterests);
  }

  useEffect(() => {
    //Run our fetch function on page render.
    async function Fetch() {
      await calculate();
    }
    Fetch();
  }, []);

  const debtInformationObject = {
    interestMonthlyArray: interestMonthlyArray,
    principleMonthlyArray: principleMonthlyArray,
    totalInterest: totalInterest.toFixed(2),
    debtRemainArray: debtRemainArray,
  };
  return debtInformationObject;
}

export default { GetDebtInformation };
