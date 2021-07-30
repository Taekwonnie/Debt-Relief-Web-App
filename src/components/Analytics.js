import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Sidebar from "./Sidebar";
import { Chart } from "react-google-charts";
import moment from "moment";
import { db } from "../firebase";
import { Pie } from "react-chartjs-2";

//import { BarChart } from "@material-ui/icons";
import BarChart from "./AnalyticsBarGraph";

export default function Analytics() {
  const [errorPieChart, setErrorPieChart] = useState("");
  const [errorBarChart, setErrorBarChart] = useState("");
  const [debtAmount, getDebtAmount] = useState(""); //Debt Amount value/set
  const [debtInterest, getDebtInterest] = useState(""); //Debt Interest value/set
  const [debtPayment, getDebtPayment] = useState(""); //Debt Interest value/set
  const [loading, setLoading] = useState(false); //Set loading state
  const { currentUser } = useAuth();
  const [data, setData] = useState({
    vehicle: 0,
    Groceries: 0,
    Home: 0,
    Utility: 0,
    Fuel: 0,
    Entertainment: 0,
    Medical: 0,
    Mortgage: 0,
    Phone: 0,
    Edu: 0,
    Misc: 0,
  });

  let month = "";
  var vehicleAmount = 0;
  var groceriesAmount = 0;
  var homeAmount = 0;
  var utilityAmount = 0;
  var fuelAmount = 0;
  var phoneAmount = 0;
  var entertainmentAmount = 0;
  var medicalAmount = 0;
  var mortgageAmount = 0;
  var eduAmount = 0;
  var miscAmount = 0;
  month = moment().format("MMMM"); //should work

  async function fetchMonthlyExpenses() {
    const sleep = (waitTimeInMs) =>
      new Promise((resolve) => setTimeout(resolve, waitTimeInMs));
    setErrorPieChart(""); //No error yet
    const docRef = db.collection("UserTransaction");
    const snapshot = await docRef
      .where("UserID", "==", currentUser.uid)
      .where("Month", "==", month)
      .get(); //Only get transaction for the current user UID in current month
    snapshot.forEach((doc) => {
      var dataResult = doc.data();
      var stringAmount = dataResult.Amount; //Get the amount of the current transaction
      var numberAmount = Number(stringAmount.replace(/[^0-9.-]+/g, "")); //Remove the currency symbol and convert to integer/number
      switch (
        dataResult.Type //Switch statement to add up expenses for each category
      ) {
        case "Vehicle":
          vehicleAmount += numberAmount;
          break;
        case "Groceries":
          groceriesAmount += numberAmount;
          break;
        case "Home improvement":
          homeAmount += numberAmount;
          break;
        case "Utility":
          utilityAmount += numberAmount;
          break;
        case "Fuel":
          fuelAmount += numberAmount;
          break;
        case "Entertainment":
          entertainmentAmount += numberAmount;
          break;
        case "Medical":
          medicalAmount += numberAmount;
          break;
        case "Mortgage/Rent":
          mortgageAmount += numberAmount;
          break;
        case "Phone Payment":
          phoneAmount += numberAmount;
          break;
        case "Edu":
          eduAmount += numberAmount;
          break;
        case "Misc":
          miscAmount += numberAmount;
          break;
      }
      const dataObject = {
        //Create object to hold everything
        Vehicle: vehicleAmount,
        Groceries: groceriesAmount,
        Home: homeAmount,
        Utility: utilityAmount,
        Fuel: fuelAmount,
        Entertainment: entertainmentAmount,
        Medical: medicalAmount,
        Mortgage: mortgageAmount,
        Phone: phoneAmount,
        Edu: eduAmount,
        Misc: miscAmount,
      };
      setData(dataObject); //Set the object so that we can use later
      const isEmpty = Object.values(dataObject).every((x) => x === 0); //Check if we have at least 1 type of category to show
      if (isEmpty == true) {
        //If not then prompt error
        setErrorPieChart(
          "There is no data to show for the current month. Please use the transaction page to enter at least 1 transaction for the current month"
        );
      }
    });
  }

  useEffect(() => {
    //Run our fetch function on page render.
    async function Fetch() {
      fetchMonthlyExpenses();
    }
    Fetch();
  }, []);

  // get UserFinance data (DebtAmount, DebtInterestRate, debtMonthlyPayment)
  async function getUserFinanceData() {
    const docRef = await db.collection("UserFinance").doc(currentUser.uid);
    const doc = await docRef.get();
    const docData = doc.data();
    //if (!doc.exists) {
    // console.log("No such document!");
    // } else {
    //console.log("Document data:", docData.DebtAmount);
    //}
    getDebtAmount(docData.DebtAmount);
    getDebtInterest(docData.DebtInterestRate);
    getDebtPayment(docData.DebtMonthlyPayment);
  }

  useEffect(() => {
    setLoading(true);
    async function fetchTransaction() {
      //getUserFinanceData();
      setLoading(false);
    }
    fetchTransaction();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // variables for bar chart and to calculate debt payoff
  var debt = Number(debtAmount);
  var interest = Number(debtInterest);
  var payment = Number(debtPayment);
  var time = Number(0); // in months

  // debt payoff function
  async function calcDebtPayoff() {
    interest /= 100; // convert percentage to decimal
    interest /= 12; // get actual annual interest rate

    while (debt >= 0) {
      debt = debt * interest + debt;
      debt -= payment;
      time++;
    }

    return time;
  }

  //TODO: modify bar chart and display time to payoff debt
  return (
    <div>
      <Sidebar />
      <Grid container spacing={3} wrap="nowrap">
        <Grid item xs={12}>
          <Card style={{ width: "700px", height: "800px" }}>
            <CardContent>
              <h2 className="text-center mb-4">Current Expenses for {month}</h2>
              {errorPieChart && (
                <Alert variant="outlined" severity="warning" className="mb-3">
                  {errorPieChart}
                </Alert>
              )}
              <Pie
                data={{
                  datasets: [
                    {
                      label: "Monthly Debt Principle Payoff",
                      data: [
                        data.Vehicle,
                        data.Groceries,
                        data.Home,
                        data.Utility,
                        data.Fuel,
                        data.Entertainment,
                        data.Medical,
                        data.Mortgage,
                        data.Phone,
                        data.Edu,
                        data.Misc,
                      ],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                  labels: [
                    "Vehicle",
                    "Groceries",
                    "Home Improvement",
                    "Utility",
                    "Petrol/Gas",
                    "Entertainment",
                    "Medical",
                    "Mortgage/Rent",
                    "Cellular/Phone Payment",
                    "Education",
                    "Misc",
                  ],
                }}
                height={400}
                width={600}
                options={{
                  aspectRatio: 1, // this would be a 1:1 aspect ratio
                  plugins: {
                    labels: {
                      render: "value",
                      // precision for percentage, default is 0
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card style={{ width: "700px", height: "800px" }}>
            <CardContent>
              <h2 className="text-center mb-4">Debt Payoff Chart</h2>
              {errorBarChart && (
                <Alert variant="outlined" severity="warning" className="mb-3">
                  {errorBarChart}
                </Alert>
              )}
              <BarChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
