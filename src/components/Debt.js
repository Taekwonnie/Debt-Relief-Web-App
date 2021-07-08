import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import {
  Button,
  Select,
  MenuItem,
  makeStyles,
  FormControlLabel,
  Card,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
  Box,
  FormHelperText,
  CardContent,
} from "@material-ui/core";

export default function Debt() {
  return (
    <div>
      <Sidebar />
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
              DEBT INPUT
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
                placeholder="Enter debt amount here..."
              ></input>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <h3
                class="label text-black mb-4 mt-2"
                style={{ fontSize: "18px" }}
              >
                Interest Rate:{" "}
              </h3>
            </div>
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                placeholder="Enter interest rate here(for example: 4.25)..."
              ></input>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <h3
                class="label text-black mb-4 mt-2"
                style={{ color: "black", fontSize: "18px" }}
              >
                Monthly Payment:{" "}
              </h3>
            </div>
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                placeholder="Enter current monthly payment here..."
              ></input>
            </div>
          </div>

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
