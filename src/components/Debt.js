import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import { db } from "../firebase";
import Alert from "@material-ui/lab/Alert";
import {
  Grid,
  Button,
  TextField,
  Tooltip,
  FormControl,
  Card,
  CardContent,
} from "@material-ui/core";
import { useAuth } from "../contexts/AuthContext";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Debt() {
  //Input field handler
  const amountInputRef = useRef(); //Input field for amount
  const interestRateRef = useRef(); //Input field for interest rate
  const monthlyPaymentRef = useRef(); //Input field for monthly payment
  const { currentUser } = useAuth(); //Get the UUID of current login users
  const [error, setError] = useState(""); //For alerting errors to users
  const [debtAmount, setDebtAmount] = useState(""); //Debt Amount value/set
  const [debtInterest, setDebtInterest] = useState(""); //Debt Interest value/set
  const [debtPayment, setDebtPayment] = useState(""); //Debt Interest value/set
  const [loading, setLoading] = useState(false); //Set loading state

  //Add debt button handler
  async function addDebtButton() {
    //User debt data structure
    const UserDebtFinanceData = {
      DebtAmount: amountInputRef.current.value,
      DebtInterestRate: interestRateRef.current.value,
      DebtMonthlyPayment: monthlyPaymentRef.current.value,
    };

    if (amountInputRef.current.value === "") {
      setError("Sorry, please enter the amount for this debt!");
      return;
    }

    if (interestRateRef.current.value === "") {
      setError("Sorry, please enter the interest rate for this debt!");
      return;
    }

    if (monthlyPaymentRef.current.value === "") {
      setError("Sorry, please enter the monthly payment for this debt!");
      return;
    }
    try {
      const docRef = db.collection("UserFinance");
      await db
        .collection("UserFinance")
        .doc(currentUser.uid)
        .set(UserDebtFinanceData, { merge: true });
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  }

  async function getUserFinanceData() {
    const docRef = await db.collection("UserFinance").doc(currentUser.uid);
    const doc = await docRef.get();
    const docData = doc.data();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data:", docData.DebtAmount);
    }
    setDebtAmount(docData.DebtAmount);
    setDebtInterest(docData.DebtInterestRate);
    setDebtPayment(docData.DebtMonthlyPayment);
  }

  useEffect(() => {
    setLoading(true);
    async function fetchTransaction() {
      getUserFinanceData();
      setLoading(false);
    }
    fetchTransaction();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Sidebar />
      <Grid container spacing={3}>
        <Grid item sx={24} sm={12}>
          <Card>
            <CardContent>
              <h2 className="text-center mb-4">Debt Input</h2>
              {error && (
                <Alert variant="outlined" severity="error">
                  {error}
                </Alert>
              )}
              <FormControl variant="outlined" style={{ display: "flex" }}>
                <Tooltip title="Enter debt amount">
                  <TextField
                    required
                    id="standard-required"
                    label="Amount"
                    inputRef={amountInputRef}
                    defaultValue=""
                    type="number"
                    className="w-100 text-center mt-2 mb-3"
                  />
                </Tooltip>
                <Tooltip title="Enter the debt interest rate">
                  <TextField
                    required
                    id="standard-required"
                    label="Interest Rate"
                    inputRef={interestRateRef}
                    defaultValue=""
                    type="number"
                    className="w-100 text-center mt-2 mb-3"
                  />
                </Tooltip>
                <Tooltip title="Enter the minimum or current monthly payment ">
                  <TextField
                    required
                    id="standard-required"
                    label="Monthly Payment"
                    inputRef={monthlyPaymentRef}
                    defaultValue=""
                    type="number"
                    className="w-100 text-center mt-2 mb-3"
                  />
                </Tooltip>
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  type="submit"
                  onClick={addDebtButton}
                  className="w-100 text-center mt-2 mb-2"
                >
                  Submit
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sx={24} sm={12}>
          <Card>
            <CardContent>
              <h2 className="text-center mb-4">Current Debt Information</h2>
              <FormControl variant="outlined" style={{ display: "flex" }}>
                <Tooltip title="This is the current debt balance">
                  <TextField
                    disabled
                    label="Debt Balance"
                    value={formatter.format(debtAmount)}
                    className="w-100 text-center mt-2 mb-3"
                  />
                </Tooltip>
                <Tooltip title="This is the current debt interest">
                  <TextField
                    disabled
                    label="Debt Interest"
                    value={`${debtInterest}%`}
                    className="w-100 text-center mt-2 mb-3"
                  />
                </Tooltip>
                <Tooltip title="This is the current debt interest">
                  <TextField
                    disabled
                    label="Debt Monthly Payment"
                    value={formatter.format(debtPayment)}
                    className="w-100 text-center mt-2 mb-3"
                  />
                </Tooltip>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
