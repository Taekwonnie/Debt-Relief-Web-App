import React, { useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //Function for the sign up button
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      //Check to see if both password are the same
      return setError("Password do not match");
    }
    try {
      setError(""); //Default to no error first
      setLoading(true); //Prevent the users from spam clicking the sign up button
      await signup(emailRef.current.value, passwordRef.current.value); //Wait to see if signup successful
      history.push("/");
    } catch {
      //if fail then print the message
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create your account</h2>
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
                className="w-100 text-center mt-3"
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
                className="w-100 text-center mt-3"
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
                label="Confirm Password"
                defaultValue=""
                type="password"
                inputRef={passwordConfirmRef}
                className="w-100 text-center mt-3"
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
                type="submit"
                className="w-100 text-center mt-2"
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-end mt-2">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}
