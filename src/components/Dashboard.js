import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
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
  async function fetchUserDebtInformation() {
    //Fetch user debt,interest,monthlypayment then set them using useState()
    const docRef = db.collection("UserFinance").doc(currentUser.uid);
    let doc = await docRef.get();
    doc = doc.data();
    getDebtAmount(doc.DebtAmount);
    getDebtInterest(doc.DebtInterestRate);
    getDebtPayment(doc.DebtMonthlyPayment);
    console.log("Reading database");
  }

  useEffect(() => {
    async function fetchTransaction() {
      fetchUserDebtInformation();
    }
    fetchTransaction();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="d-flex align-items-center">
      <Sidebar />
      <Grid container spacing="3">
        <Grid item>
          <Card style={{ width: "700px", height: "200px" }}>
            <CardContent>
              <h1 className="text-center mb-2">Brief Summary</h1>
              <Typography variant="h5" align="left">
                Details
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Typography variant="body2" color="textSecondary" component="p">
                  Debt Balance: {formatter.format(debtAmount)} <br></br>Debt
                  Interest: {debtInterest}%<br></br> Monthly Payment:{" "}
                  {formatter.format(debtPayment)}
                  <br></br>
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card style={{ width: "700px", height: "450px" }}>
            <CardContent>
              <LineChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ width: "700px", height: "200px" }}>
            <CardContent>
              <Typography variant="h5" align="center">
                Helpful Tips
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                • Tip #1: Cook your own food <br></br>• Tip #2: Freeze your
                credit card <br></br>• Tip #3: Look for cheaper rates on
                insurances <br></br>• Tip #4: Start using coupons, rebates, and
                discounts
                <br></br>• Tip #5: Turn a hobby into a business <br></br>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
