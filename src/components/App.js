import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateAccount from "./UpdateAccount";
import Setting from "./Setting";
import "./App.css";
import { classes } from "istanbul-lib-coverage";

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
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setDarkMode(!darkMode)}
        >
          Theme
        </Button>
        <div className={classes.container}>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "500px" }}>
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
                    <Route path="/signup" component={Signup} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                  </Switch>
                </AuthProvider>
              </Router>
            </div>
          </Container>
        </div>
      </Paper>
    </ThemeProvider>
  );
}
export default App;
