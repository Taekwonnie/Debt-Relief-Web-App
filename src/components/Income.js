import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import { db } from "../firebase";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Alert from "@material-ui/lab/Alert";
import {
  Grid,
  Button,
  TextField,
  Tooltip,
  FormControl,
  Card,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  Paper,
  Table,
  TablePagination,
  TableContainer,
  TableHead,
  TableBody,
  makeStyles,
  FormHelperText,
  CardContent,
} from "@material-ui/core";
import { useAuth } from "../contexts/AuthContext";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const columns = [
  {
    id: "ID",
    label: "ID",
    maxWidth: 5,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Type",
    label: "Type",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Date",
    label: "Date",
    minWidth: 120,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Amount",
    label: "Amount",
    minWidth: 100,
  },
];

export default function Income() {
  //Table
  const [page, setPage] = useState(0); //Table Page handle
  const [rowsPerPage, setRowsPerPage] = useState(5); //Table page properties
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //Handle change row per page in table
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date()); //Set and get the date from the date picker
  const [error, setError] = useState(""); //For alerting errors to users
  const amountInputRef = useRef();
  const [incomeType, setIncomeType] = useState(""); //For Transaction Type
  const { currentUser } = useAuth(); //Get the UUID of current login users
  const [loading, setLoading] = useState(false); //Set loading state
  const handleChangeType = (event) => {
    setIncomeType(event.target.value);
  };

  //Date picker componenet
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //#GetData
  async function getIncomeData() {
    try {
      const snapshot = await db
        .collection("UserIncome")
        .where("UserID", "==", currentUser.uid)
        .get();
      return snapshot.docs.map((doc) => doc.data());
    } catch (e) {}
  }

  //Generate ID for transaction
  async function generateNewID() {
    var highestID = 0;
    const docRef = db.collection("UserIncome");
    const snapshot = await docRef.where("UserID", "==", currentUser.uid).get(); //Only get transaction for the current user UID
    if (snapshot.empty) {
      return highestID;
    }
    snapshot.forEach((doc) => {
      const dataResult = doc.data();
      if (dataResult.ID > highestID) {
        highestID = dataResult.ID;
      }
      if (!dataResult.ID) {
        highestID = Number(0);
      }
    });
    return highestID;
  }

  async function addIncomeButton() {
    if (amountInputRef.current.value === "") {
      setError("Sorry, please enter the amount for this income");
      return;
    }
    if (!incomeType) {
      setError("Sorry, please pick the type for this income");
      return;
    }
    var newID = Number(await generateNewID()) + Number(1);
    var date = moment(selectedDate).format("YYYY-MM-DD");

    const transactionData = {
      Amount: formatter.format(amountInputRef.current.value),
      Type: incomeType,
      UserID: currentUser.uid,
      Date: date,
      ID: newID,
    };
    setError("");
    const res = await db.collection("UserIncome").doc().set(transactionData);
    setIncomeType("");
    amountInputRef.current.value = "";
    setSelectedDate(new Date());
    window.location.reload();
  }

  var [data, setData] = useState([]);

  //Sort and fetch income
  useEffect(() => {
    setLoading(true);
    async function fetchTransaction() {
      const preSort = await getIncomeData();
      const sorted = preSort.sort((first, second) => first.ID - second.ID);
      setData(sorted);
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
                <FormHelperText className="w-100 text-justify mt-2">
                  ***Choose the income type***
                </FormHelperText>
                <Select
                  required
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  label="test"
                  defaultValue="Set the transaction type:"
                  value={incomeType}
                  onChange={handleChangeType}
                  autoWidth={true}
                  className="w-100 text-justify mt-1"
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    Income Type:
                  </MenuItem>
                  <MenuItem value={"W2"}>W2</MenuItem>
                  <MenuItem value={"1099"}>1099</MenuItem> Groceries expense
                  <MenuItem value={"Asset Income"}>Asset Income</MenuItem>
                  <MenuItem value={"Alimony"}>Alimony</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>

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
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  type="submit"
                  className="w-100 text-center mt-2 mb-2"
                  onClick={addIncomeButton}
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
              <h2 className="text-center">Recent Income</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.ID}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow hover tabIndex={-1} key={row.ID}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
