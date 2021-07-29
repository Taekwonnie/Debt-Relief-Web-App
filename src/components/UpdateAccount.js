import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { Row, Col } from "react-bootstrap";
import {
  Grid,
  CardHeader,
  Avatar,
  Button,
  TextField,
  Tooltip,
  Link as MaterialLink,
  Card,
  makeStyles,
  CardContent,
} from "@material-ui/core";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function UpdateAccount() {
  const sleep = (waitTimeInMs) =>
    new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {}
  }

  // check if fields are correctly filled out
  function fieldCheck() {
    return (
      emailRef.current.value !== currentUser.email ||
      passwordRef.current.value === "" ||
      passwordConfirmRef.current.value === "" ||
      passwordRef.current.value !== passwordConfirmRef.current.value
    );
  }

  //Function for the sign up button
  function handleSubmit(e) {
    e.preventDefault();

    // function call. If true, return setError message.
    if (fieldCheck()) return setError("Please correctly fill out all fields.");

    const promises = [];
    setLoading(true);
    setError("");

    //Check if enter email is different than current email
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    //Check if a new password is entered
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        if (error.message == "CREDENTIAL_TOO_OLD_LOGIN_AGAIN") {
          setError("Your login seasson is too old, please login again!");
          sleep(3000).then(() => {
            logout();
          });
        } else {
          setError("Update account failed.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const classes = useStyles();
  return (
    <>
      <Sidebar />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card style={{ width: "500px", height: "150px" }}>
              <CardHeader
                className="text-center mb-4"
                avatar={<Avatar aria-label="profile-pic"></Avatar>}
                titleTypographyProps={{ variant: "h5" }}
                title="Account Information"
              />
              <CardContent>
                <div className="w-100 text-center mb-4">
                  <strong>Email: </strong> {currentUser.email}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={24} sm={24}>
            <Card style={{ width: "500px", height: "420px" }}>
              <CardHeader className="text-center mb-4" title="Update Account" />
              <CardContent>
                {error && <Alert severity="error">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      required
                      id="standard-required"
                      label="Email"
                      defaultValue=""
                      inputRef={emailRef}
                      className="w-100 text-center mt-2"
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Tooltip title="Leave blank if you don't want to change">
                      <TextField
                        id="standard-required"
                        label="Password"
                        defaultValue=""
                        type="password"
                        inputRef={passwordRef}
                        className="w-100 text-center mt-2"
                      />
                    </Tooltip>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Tooltip title="Leave blank if you don't want to change">
                      <TextField
                        id="standard-required"
                        label="Confirm Password"
                        defaultValue=""
                        type="password"
                        inputRef={passwordConfirmRef}
                        className="w-100 text-center mt-2"
                      />
                    </Tooltip>
                  </div>
                  <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    disabled={loading}
                    type="submit"
                    className="w-100 text-center mt-4"
                  >
                    Update
                  </Button>
                  <Button
                    color="default"
                    size="large"
                    variant="contained"
                    disabled={loading}
                    type="submit"
                    className="w-100 text-center mt-4"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </Form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
