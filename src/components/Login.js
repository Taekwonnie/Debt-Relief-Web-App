import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
  TextField,
  Link as MaterialLink,
  Card,
  CardContent,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //Function for the submit button
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(""); //Default to no error first
      setLoading(true); //Prevent the users from spam clicking the login button
      await login(emailRef.current.value, passwordRef.current.value); //Wait to see if login successful
      history.push("/");
    } catch (error) {
      //if fail then print the messages
      console.log(error.code);
      switch (error.code) {
        case "auth/user-not-found":
          setError("Sorry, we couldn't find an account with that username.");
          break;
        case "auth/wrong-password":
          setError(`Sorry, that password isn't right. We can help you 
          recover your password using the "FORGOT PASSWORD" button below.`);
          break;
        case "auth/too-many-requests":
          setError(
            `Sorry, you have tried to login incorrectly too many times. Please reset your password using the "FORGOT PASSWORD" button.`
          );
          break;
        case "auth/invalid-email":
          setError(`Sorry, Please enter a valid email.`);
          break;
        default:
          setError("Failed to Log In!");
      }
    }
    setLoading(false); //Done loading
  }

  return (
    <>
      <Card>
        <CardContent>
          <h2 className="text-start mb-4">Welcome Back!</h2>
          {error && (
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          )}
          <h6>We're so excited to see you again.</h6>
          <Form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="w-100 text-center mt-3"
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
              <TextField
                normal
                required
                id="standard-required"
                label="Password"
                defaultValue=""
                type="password"
                inputRef={passwordRef}
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
              <Button
                normal
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
                className="w-100 text-center mt-2"
              >
                Log In
              </Button>
            </div>
          </Form>
          <Button
            normal
            color="default"
            size="large"
            variant="contained"
            disabled={loading}
            type="submit"
            className="w-100 text-center mt-2"
            component={Link}
            to="/forgot-password"
          >
            Forgot Password
          </Button>
        </CardContent>
      </Card>
      <div className="w-100 text-end mt-2">
        Don't have an account?{" "}
        <MaterialLink component={Link} to="/signup">
          Sign Up
        </MaterialLink>
      </div>
    </>
  );
}
