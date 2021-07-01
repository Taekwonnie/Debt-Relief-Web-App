import React, { useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [messsage, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //Function for the submit button
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError(""); //Default to no error first
      setLoading(true); //Prevent the users from spam clicking the submit button
      await resetPassword(emailRef.current.value); //Wait to see if reset function work
      setMessage("Check your inbox for further instructions"); //Notify the users to check their email
    } catch (error) {
      //if fail then print the message
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert severity="error">{error}</Alert>}
          {messsage && <Alert severity="success">{messsage}</Alert>}
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
            <Button
              normal
              color="secondary"
              size="large"
              type="submit"
              variant="contained"
              disabled={loading}
              type="submit"
              className="w-100 text-center mt-2"
            >
              Reset
            </Button>
          </Form>
          <Button
            normal
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            type="submit"
            className="w-100 text-center mt-2"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
