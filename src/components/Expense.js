import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import DateFnsUtils from "@date-io/date-fns";
import Alert from "@material-ui/lab/Alert";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  Button,
  Select,
  MenuItem,
  makeStyles,
  FormControl,
  Card,
  TextField,
  Grid,
  FormHelperText,
  CardContent,
  Tooltip,
} from "@material-ui/core";
import moment from "moment";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Expense() {
  const [selectedDate, setSelectedDate] = React.useState(new Date()); //Set and get the date from the date picker
  const [error, setError] = useState(""); //For alerting errors to users
  const { currentUser, logout } = useAuth(); //Get the UUID of current login users
  const [transType, setTransType] = useState(""); //For Transaction Type
  const [loading, setLoading] = useState(false); //Set loading state
  const handleChangeType = (event) => {
    //Handle the changing value for types
    setTransType(event.target.value);
  };

  const handleDateChange = (date) => {
    //Date picker componenet
    //Still Debugging
    setSelectedDate(date);
  };

  var amountInputRef = useRef();
  const noteInputRef = useRef();

  async function addExpenseButton() {
    setLoading(true);
    if (amountInputRef.current.value == "") {
      setError("Sorry, please enter the amount for this transaction");
      return;
    }
    if (transType == "") {
      setError("Sorry, please pick the type for this transaction");
      return;
    }
    var date = moment(selectedDate).format("YYYY-MM-DD");
    const transactionData = {
      Amount: amountInputRef.current.value,
      Type: transType,
      UserID: currentUser.uid,
      Note: noteInputRef.current.value,
      date: date,
    };
    setError("");
    console.log(transactionData);
    const res = await db
      .collection("UserTransaction")
      .doc()
      .set(transactionData);
    setTransType("");
    amountInputRef.current.value = "";
    noteInputRef.current.value = "";
    setSelectedDate(new Date());
    setLoading(false);
  }

  return (
    <div>
      <Sidebar />
      <Grid container spacing={3}>
        <Grid item sx={24} sm={12}>
          <Card>
            <CardContent>
              <h2 className="text-center mb-4"> Expenses And Transaction</h2>
              {error && (
                <Alert variant="outlined" severity="error">
                  {error}
                </Alert>
              )}
              <FormControl variant="outlined" style={{ display: "flex" }}>
                <Tooltip title="Enter Expense Amount: ">
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
                <div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Transaction Date:"
                      format="MM/dd/yyyy"
                      className="w-100 text-center mt-2 mb-3"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>

                <Select
                  required
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  label="test"
                  defaultValue="Set the transaction type:"
                  value={transType}
                  onChange={handleChangeType}
                  autoWidth={true}
                  className="w-100 text-justify mt-1"
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    Transaction Type:
                  </MenuItem>
                  <MenuItem value={"Vehicle"}>Vehicle (Payment/Insurance/Maintenance)</MenuItem>
                  <MenuItem value={"Groceries"}>Groceries</MenuItem>
                  <MenuItem value={"Home_improvement"}>Home Improvement</MenuItem>
                  <MenuItem value={"Utility"}>Utility</MenuItem>
                  <MenuItem value={"Petrol_Gas"}>Petrol/Gas</MenuItem>
                  <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                  <MenuItem value={"Medical"}>Medical</MenuItem>
                  <MenuItem value={"Mortgage_Rent"}>Mortgage/Rent</MenuItem>
                  <MenuItem value={"Cellular_Phone_Payment"}>Cellular/Phone Payment</MenuItem>
                  <MenuItem value={"Education"}>Education</MenuItem>
                  <MenuItem value={"Misc"}>Misc</MenuItem>

                </Select>
                <FormHelperText className="w-100 text-justify mt-2">
                  Set the transaction type
                </FormHelperText>

                <TextField
                  placeholder="Please enter any note for the transaction."
                  multiline
                  rows={2}
                  variant="outlined"
                  inputRef={noteInputRef}
                  className="w-100 text-center mt-2 mb-2"
                  rowsMax={4}
                />

                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  type="submit"
                  onClick={addExpenseButton}
                  className="w-100 text-center mt-2 mb-2"
                >
                  Add Expense
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sx={24} sm={12}>
          <Card>
            <CardContent>
              <h2 className="text-center">Recent transaction</h2>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
