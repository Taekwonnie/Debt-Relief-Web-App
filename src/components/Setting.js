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

export default function Setting() {
  //For import/export prompt
  const [openExport, setOpenExport] = useState(false);
  const [openImport, setOpenImport] = useState(false);

  const handleClickOpenImport = () => {
    setOpenImport(true);
  };
  const handleCloseImport = () => {
    setOpenImport(false);
  };

  const importTextRef = useRef();
  const handleCloseImportSave = () => {
    var data = JSON.parse(importTextRef.current.value);
    console.log(importTextRef.current.value);
    Object.keys(data).forEach(function (k) {
      localStorage.setItem(k, data[k]);
    });
    if (importTextRef.current.value) {
      setOpenImport(false);
    }
    window.location.reload();
  };
  const handleClickOpenExport = () => {
    setOpenExport(true);
  };
  const handleCloseExport = () => {
    setOpenExport(false);
  };

  const [loading] = useState(false); //For button
  var savedNotifyVal;
  var savedCurrencyVal = "";
  var exportJson = "";

  function exportLocal() {
    exportJson = JSON.stringify(localStorage);
    return exportJson;
  }
  exportJson = exportLocal();

  //Function to get saved notify setting
  function getNotifyLocal() {
    savedNotifyVal = JSON.parse(localStorage.getItem("notify"));
    return savedNotifyVal;
  }

  //Function to get saved currency setting
  function getCurrencyLocal() {
    savedCurrencyVal = localStorage.getItem("currency");
    return savedCurrencyVal;
  }

  //Get setting from localStorage
  savedNotifyVal = getNotifyLocal();
  savedCurrencyVal = getCurrencyLocal();

  const [state, setState] = useState({
    //For check box
    notify: savedNotifyVal,
  });

  const [currency, setCurrency] = useState(""); //For currency

  const handleChangeCurrency = (event) => {
    //For changes
    console.log(event.target.value);
    setCurrency(event.target.value);
  };
  const handleChangeNotify = (event) => {
    //For changes
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const classes = useStyles();

  //Handle save setting button
  async function saveButton() {
    console.log(`Currency: ${currency}`);
    console.log(`Savedcurrent: ${savedCurrencyVal}`);

    if (!currency) {
      localStorage.setItem("currency", savedCurrencyVal);
      localStorage.setItem("notify", state.notify);
    } else {
      localStorage.setItem("currency", currency);
      localStorage.setItem("notify", state.notify);
    }

    window.location.reload();
  }

  return (
    <div>
      <Sidebar />
      <Card>
        <CardContent>
          <h2 className="text-center mb-4">Setting</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                defaultValue={currency.currentCurrency}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                label="test"
                value={currency}
                onChange={handleChangeCurrency}
                autoWidth={true}
                className={classes.selectEmpty}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="" disabled>
                  Current: {savedCurrencyVal}
                </MenuItem>
                <MenuItem value={"USD"}>U.S. Dollar (USD)</MenuItem>
                <MenuItem value={"EUR"}>European Euro (EUR)</MenuItem>
                <MenuItem value={"JPY"}>Japanese Yen (JPY)</MenuItem>
              </Select>
              <FormHelperText className="w-100 text-justify mt-2">
                Set your currency
              </FormHelperText>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.notify}
                    onChange={handleChangeNotify}
                    name="notify"
                  />
                }
                label="Receive communication from Debt Relief."
              />
            </FormControl>
          </div>
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            onClick={saveButton}
            disabled={loading}
            className="w-100 text-center mt-2"
          >
            Save Settings
          </Button>
          <Dialog
            open={openImport}
            onClose={handleCloseImport}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Import</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To import your settings, please paste the content from the
                export function.
              </DialogContentText>
              <TextField
                required
                autoFocus
                margin="dense"
                id="importText"
                inputRef={importTextRef}
                label="Paste it here"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseImport} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCloseImportSave} color="primary">
                Import
              </Button>
            </DialogActions>
          </Dialog>
          <Box display="flex" justifyContent="space-between">
            <Button
              color="primary"
              size="large"
              onClick={handleClickOpenImport}
              type="submit"
              variant="contained"
              disabled={loading}
              className="mt-2 mr-3"
            >
              Import Settings
            </Button>

            <Dialog
              open={openExport}
              onClose={handleCloseExport}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {
                  "Copy the text below and paste it in the import prompt to transfer your settings!"
                }
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {exportJson}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseExport} color="primary" autoFocus>
                  Okay
                </Button>
              </DialogActions>
            </Dialog>

            <Button
              color="primary"
              size="large"
              onClick={handleClickOpenExport}
              type="submit"
              variant="contained"
              disabled={loading}
              className="mt-2"
            >
              Export Settings
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
