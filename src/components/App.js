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
import Analytics from "./Analytics";
import "./App.css";
import { classes } from "istanbul-lib-coverage";
// for dark/light theme
import { Button, Paper } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useState, useEffect } from "react";

function App() {
  // dark/light theme
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    setDarkMode(JSON.parse(localTheme));
  }, []);

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
          <div className={classes.container}>
            <div className="w-100" style={{ maxWidth: 500, minWidth: 400 }}>
              <Router>
                <AuthProvider>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/update-account"
                      component={UpdateAccount}
                    />
                    <PrivateRoute exact path="/debt" component={Debt} />
                    <PrivateRoute exact path="/setting" component={Setting} />

                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <div className="center">
                      <PrivateRoute exact path="/" component={Dashboard} />
                      <PrivateRoute exact path="/income" component={Income} />
                      <PrivateRoute exact path="/expense" component={Expense} />
                      <PrivateRoute
                        exact
                        path="/analytics"
                        component={Analytics}
                      />
                    </div>
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
