import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import {
  Button, CardContent, /*Select, MenuItem, makeStyles, FormControlLabel,
  Card, Switch, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, FormControl, TextField,
  Box, FormHelperText,*/
} from "@material-ui/core";

export default function Income() {
    return (
        <div>
 <Sidebar />
      <div className="card text-center text-black bg-light mb-3" style={{width: '60rem', height: '25rem'}}>
          <CardContent>
            <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <h1 className="font-weight-bold mb-5" style={{color: "black", fontSize: "50px"}}>INCOME</h1>
            
            </div>
           
            <div class="row">
                <div class="col-3">
                    <h3 class="label text-black mb-4 mt-2" style={{color: "black", fontSize: "18px"}}>Amount: </h3>
                </div>
                <div class="col-6">
                    <input type="text" class="form-control" placeholder="Enter income amount here..."></input>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <h3 class="label text-black mb-4 mt-2" style={{color: "black", fontSize: "18px"}}>Frequency: </h3>
                </div>
                <div class="col-6 mb-4 mt-2">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                        <label class="form-check-label" for="inlineRadio1">Hourly</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                        <label class="form-check-label" for="inlineRadio2">Weekly</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"></input>
                        <label class="form-check-label" for="inlineRadio3">Bi-Weekly</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4"></input>
                        <label class="form-check-label" for="inlineRadio3">Monthly</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option5"></input>
                        <label class="form-check-label" for="inlineRadio3">Yearly</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <h3 class="label text-black mb-4 mt-2" style={{fontSize: "18px"}}>Source Type: </h3>
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
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            className="w-100 text-center mt-4"
            >submit</Button>
            </CardContent>
            
      </div>
    </div>
  );
}