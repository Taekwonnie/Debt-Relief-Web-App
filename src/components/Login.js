import React, { useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //Function for the sign up button
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(""); //Default to no error first
      setLoading(true); //Prevent the users from spam clicking the login button
      await login(emailRef.current.value, passwordRef.current.value); //Wait to see if login successful
      history.push("/");
    } catch (error) {
      //if fail then print the message
      setError("Failed to Log In");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert severity="error">{error}</Alert>}
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
                type="submit"
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
            type="submit"
            variant="contained"
            disabled={loading}
            type="submit"
            className="w-100 text-center mt-2"
            component={Link}
            to="/forgot-password"
          >
            Forgot Password
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-end mt-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
