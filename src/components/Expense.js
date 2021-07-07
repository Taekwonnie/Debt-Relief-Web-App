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
    InputLabel,
    FormHelperText,
    CardContent,
  } from "@material-ui/core";

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function Expense() {
  //For import/export prompt

  

  return (
    <div>
      <Sidebar />
      <Card>
          <CardContent> 
            <div>
                <h1 style={{display: "flex", justifyContent: "left"}}>Expenses And Transaction</h1>
            </div>
            
            <div>
                <label for="formGroupExampleInput" style={{color: "black", fontSize: "15px", marginTop: "25px"}} >Enter Expense Dollar Amount</label>
                <input type="text" class="form-control form-control-sm" id="formGroupExampleInput" placeholder="Enter Dollar Amount $$" style={{fontSize: ""}}></input>
            </div>
            <div>
                <label for="formGroupExampleInput" style={{color: "black", fontSize: "15px", marginTop: "25px"}} >Transaction Date</label>
                <input type="text" class="form-control form-control-sm" id="formGroupExampleInput" placeholder="MONTH/DAY/YEAR" style={{fontSize: ""}}></input>
            </div> 
             
            <div class="form-group">
              <label for="transaction-types" style={{color: "black", fontSize: "15px", marginTop: "25px"}}>Transaction Type</label>
              <select class="form-control form-control-sm" id="transaction-types" style={{}}>
                <option>Groceries</option>
                <option>Car Payment</option>
                <option>Other</option>
              </select>
              <FormHelperText className="w-100 text-justify mt-1">
                * If Other is selected please specfiy Transaction type in Notes *
              </FormHelperText>
            </div>
            <div class="form-group">
              <label for="notes-text"style={{color: "black", fontSize: "15px", marginTop: "25px"}}>Notes</label>
              <textarea class="form-control form-control-sm" id="notes-text" rows="3"></textarea>
            </div>

            <Button
                color=""
                size="small"
                type="submit"
                variant="contained"
                
    
                style={{fontSize: "16px",marginTop: "15px", marginBottom: "20px", backgroundColor: "#8fbc8f"  }}
            >Add Expense
            </Button>
            <div>
            <h3 style={{color: "black", fontSize: "15px"}}>Recent Transactions</h3>
            </div>
            </CardContent>
            
      </Card>
    </div>
  );
}

