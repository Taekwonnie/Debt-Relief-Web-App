import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { Row, Col } from "react-bootstrap";
import {
  Grid, CardHeader, Avatar, Button, TextField, 
  Tooltip, Link as MaterialLink, Card, CardContent
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
    <>
    <Sidebar />
    <Grid container
      spacing={10}>
    
    <Row>
    <Col>
    <Grid item xs={12} sm={12} md={12}>
    <Card style={{width:"100%", height:"375px"}}> 
      <CardHeader 
        avatar={
          <Avatar aria-label="profile-pic">
            
          </Avatar>
        }
        titleTypographyProps={{variant:'h5'}}
        title="Account Information"
        />
      <CardContent>
        <div className="w-100 text-center mb-4">
          <strong>Email: </strong> {currentUser.email}
        </div>
        
      </CardContent>
    </Card>
    </Grid>
    </Col>
    
    <Col>
    <Grid item xs={12} sm={12} md={12}>
    <Card style={{width:"280px", height:"375px"}}>
      <CardHeader 
        title="Update Account"
      />

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
        </Form>
      </CardContent>
    </Card>
    </Grid>
    </Col>

    <Col>
    <Grid item xs={12} sm={12} md={12} spacing={10}>
    <Card style={{width:"100%", height:"150px"}}>
    <CardHeader 
        title="Logout of Your Account"
      />
      <CardContent>
        <Button
          color="default"
          size="large"
          variant="contained"
          type="submit"
          className="w-100 text-center mt-2"
          onClick={handleLogout}
        >
          Log Out
        </Button>
        
      </CardContent>
    </Card>
    </Grid>
    

    <div className="w-100 text-center mt-2">
      <MaterialLink component={Link} to="/">
        Back to dashboard
      </MaterialLink>
    </div>

    </Col>
    </Row>
    
  </Grid>
  </>
);
}