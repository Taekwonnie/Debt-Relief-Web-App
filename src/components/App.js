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
import "./App.css";
import Sidebar from "./Sidebar";
import { makeStyles } from "@material-ui/core";
import { classes } from "istanbul-lib-coverage";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

function App() {
  return (
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
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </div>
  );
}
export default App;
