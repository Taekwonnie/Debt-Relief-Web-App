import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  Button,
  TextField,
  Tooltip,
  Select,
  MenuItem,
  makeStyles,
  Card,
  Switch,
  FormControl,
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
  const [currency, setCurrency] = useState("");
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const classes = useStyles();

  return (
    <div>
      <Sidebar />

      <Card>
        <CardContent>
          <h2 className="text-center mb-4">Setting</h2>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={currency}
              onChange={handleChange}
            >
              <MenuItem value={"USD"}>U.S. Dollar</MenuItem>
              <MenuItem value={"EUR"}>European Euro</MenuItem>
              <MenuItem value={"JPY"}>Japanese Yen</MenuItem>
            </Select>
            <FormHelperText className="w-100 text-justify mt-2">
              Set your currency
            </FormHelperText>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
}
