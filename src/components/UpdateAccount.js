import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import {
  Button,
  TextField,
  Tooltip,
  Link as MaterialLink,
  Card,
  CardContent,
} from "@material-ui/core";
import Sidebar from "./Sidebar";
export default function UpdateAccount() {
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

  //Function for the sign up button
  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      //Check to see if both password are the same
      return setError("Password do not match");
    }
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
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <Sidebar />
      <Card>
        <CardContent>
          <h2 className="text-center mb-2">Account Information</h2>
          <div className="w-100 text-center mb-4">
            <strong>Email: </strong> {currentUser.email}
          </div>
        </CardContent>
      </Card>
      <br></br>

      <Card>
        <CardContent>
          <h2 className="text-center mb-4">Update Account</h2>
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
                normal
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
                  normal
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
                  normal
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
              normal
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              disabled={loading}
              type="submit"
              className="w-100 text-center mt-2"
            >
              Update
            </Button>
          </Form>

          <br></br>
          <Button
                normal
                color="default"
                size="large"
                type="submit"
                variant="contained"
                type="submit"
                className="w-100 text-center mt-2"
                onClick={handleLogout}
              >
                Log Out
              </Button>
        </CardContent>
      </Card>
            
      <div className="w-100 text-center mt-2">
        <MaterialLink component={Link} to="/">
          Back to dashboard
        </MaterialLink>
      </div>
    </div>
  );
}
