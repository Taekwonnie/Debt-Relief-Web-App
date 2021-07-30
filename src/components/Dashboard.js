import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Card, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import Sidebar from "./Sidebar";
import LineChart from "./DashboardChart";
import { db } from "../firebase";

export default function Dashboard() {

  const [error, setError] = useState("");
  const [debtAmount, getDebtAmount] = useState(""); //Debt Amount value/set
  const [debtInterest, getDebtInterest] = useState(""); //Debt Interest value/set
  const [debtPayment, getDebtPayment] = useState(""); //Debt Interest value/set
  const [loading, setLoading] = useState(false); //Set loading state
  const history = useHistory();
  const { currentUser } = useAuth();
    
  // get UserFinance data (DebtAmount, DebtInterestRate, debtMonthlyPayment)
  async function getUserFinanceData() {
    const docRef = await db.collection("UserFinance").doc(currentUser.uid);
    const doc = await docRef.get();
    const docData = doc.data();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data:", docData.DebtAmount);
    }
    getDebtAmount(docData.DebtAmount);
    getDebtInterest(docData.DebtInterestRate);
    getDebtPayment(docData.DebtMonthlyPayment);
  }
    
  if (loading) {
      return <h1>Loading...</h1>;
  }
    
  // variables for bar chart and to calculate debt payoff
  var debt = Number(debtAmount);
  var interest = Number(debtInterest);
  var payment = Number(debtPayment);
  var time = Number(0); // in months
    
  // work in progress debt payoff function. NOT CORRECT CALCULATION
  async function calcDebtPayoff() {
      debt = (debt * interest) + debt;
      time = debt / payment;
      return time;
  }

  return (
    <>
      <Sidebar />
      <Grid container spacing={5}>
        <Grid item xs={24} sm={12} md={12}>
          <Card>
            <CardContent>
              <h1 className="text-center mb-2">Brief Summary</h1>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={24} sm={12} md={12}>
        <Card>
            <CardContent>
            <Typography variant="h5" align="left">
                Details
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Typography variant="body2" color="textSecondary" component="p">
                  Debt Balance: <br></br> Debt Interest: <br></br> Monthly Payment: <br></br>
                </Typography>
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <LineChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={24} sm={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" align="left">
                Helpful Tips
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Typography variant="body2" color="textSecondary" component="p">
                  • Tip #1: Cook your own food <br></br>• Tip #2: Freeze your credit card <br></br>• Tip #3: Look for cheaper rates on insurances <br></br>• Tip #4: Start using coupons, rebates, and discounts
                  <br></br>• Tip #5: Turn a hobby into a business <br></br>
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
