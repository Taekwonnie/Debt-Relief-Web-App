import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  Button,
  Select,
  MenuItem,
  makeStyles,
  FormControlLabel,
  Card,
  Switch,
  FormControl,
  Box,
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
  const [loading, setLoading] = useState(false); //For button

  const [state, setState] = React.useState({
    //For check box
    checkedA: true,
    checkedB: true,
  });
  const [currency, setCurrency] = useState(""); //For currency

  const handleChange = (event) => {
    //For changes
    setCurrency(event.target.value);
    setState({ ...state, [event.target.name]: event.target.checked });
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
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="Receive communication from Debt Relief."
            />
          </FormControl>
          <Button
            normal
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            className="w-100 text-center mt-2"
          >
            Save Settings
          </Button>
          <Box display="flex" justifyContent="space-between">
            <Button
              normal
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              disabled={loading}
              className="mt-2 mr-3"
            >
              Import Settings
            </Button>
            <Button
              normal
              color="primary"
              size="large"
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
