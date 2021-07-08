import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Debt from "./Debt";
import Income from "./Income";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateAccount from "./UpdateAccount";
import Setting from "./Setting";
import Expense from "./Expense";
import "./App.css";
import { classes } from "istanbul-lib-coverage";
import Testdb from "./Testdb";
// for dark/light theme
import { Button, Paper } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useState } from "react";

function App() {
  // dark/light theme
  const [darkMode, setDarkMode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="theme-button">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setDarkMode(!darkMode)}
            >
              Theme
            </Button>
          </div>
          <div className={classes.container}>
            <div className="w-100" style={{ maxWidth: 500, minWidth: 400 }}>
              <Router>
                <AuthProvider>
                  <Switch>
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <PrivateRoute
                      exact
                      path="/update-account"
                      component={UpdateAccount}
                    />
                    <PrivateRoute exact path="/setting" component={Setting} />
                    <Route path="/login" component={Login} />
                    <Route path="/testdb" component={Testdb} />

                    <Route path="/expense" component={Expense} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="/debt" component={Debt} />
                    <Route path="/income" component={Income} />
                  </Switch>
                </AuthProvider>
              </Router>
            </div>
          </div>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
export default App;
