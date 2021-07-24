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
      <div
        className="card text-center text-black bg-light mb-3"
        style={{ width: "60rem", height: "25rem" }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1
              className="font-weight-bold mb-5"
              style={{ color: "black", fontSize: "50px" }}
            >
              INCOME
            </h1>
          </div>

          <div class="row">
            <div class="col-3">
              <h3
                class="label text-black mb-4 mt-2"
                style={{ color: "black", fontSize: "18px" }}
              >
                Amount:{" "}
              </h3>
            </div>
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                placeholder="Enter income amount here..."
              ></input>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <h3
                class="label text-black mb-4 mt-2"
                style={{ color: "black", fontSize: "18px" }}
              >
                Frequency:{" "}
              </h3>
            </div>
            <div class="col-6 mb-4 mt-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option1"
                ></input>
                <label class="form-check-label" for="inlineRadio1">
                  Hourly
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option2"
                ></input>
                <label class="form-check-label" for="inlineRadio2">
                  Weekly
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="option3"
                ></input>
                <label class="form-check-label" for="inlineRadio3">
                  Bi-Weekly
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio4"
                  value="option4"
                ></input>
                <label class="form-check-label" for="inlineRadio3">
                  Monthly
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio4"
                  value="option5"
                ></input>
                <label class="form-check-label" for="inlineRadio3">
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <h3
                class="label text-black mb-4 mt-2"
                style={{ fontSize: "18px" }}
              >
                Source Type:{" "}
              </h3>
            </div>
            <div class="col-6 mb-4 mt-">
              <div class="form-group">
                <select class="form-control">
                  <option>W2</option>
                  <option>1099</option>
                  <option>Alimony</option>
                  <option>Asset Profit</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          <Button


            

            <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            className="w-100 text-center mt-4"
          >
            submit
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
