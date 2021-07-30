import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { db } from "../firebase";

const LineChart = () => {

    const [debtAmount, getDebtAmount] = useState(""); //Debt Amount value/set
    const [debtInterest, getDebtInterest] = useState(""); //Debt Interest value/set
    const [debtPayment, getDebtPayment] = useState(""); //Debt Interest value/set
    const [loading, setLoading] = useState(false); //Set loading state
    const history = useHistory();
    const { currentUser } = useAuth()
    
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

    // will change some things to make it not a linear line graph
    return <div>
        <Line
            data={{
                datasets: [
                    {
                        label: "Monthly Debt Amount",
                        data: [
                        ["January", debt, payment],
                        ["February", debt -= payment, payment],
                        ["March", debt -= payment, payment],
                        ["April", debt -= payment, payment],
                        ["May", debt -= payment, payment],
                        ["June", debt -= payment, payment],
                        ["July", debt -= payment, payment],
                        ["August", debt -= payment, payment],
                        ["September", debt -= payment, payment],
                        ["October", debt -= payment, payment],
                        ["November", debt -= payment, payment],
                        ["December", debt -= payment, payment],
                        ],
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