import React, { useState, useRef } from "react";
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

export default function Income() {
  const [error, setError] = useState(""); //For alerting errors to users
  const amountInputRef = useRef();
  const interestRateRef = useRef();
  const monthlyPaymentRef = useRef();
  return (
    <div>
      <Sidebar />
      <Card>
        <CardContent>
          <h2 className="text-center mb-4">Income Input</h2>
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
              className="w-100 text-center mt-2 mb-2"
            >
              Submit
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
}
