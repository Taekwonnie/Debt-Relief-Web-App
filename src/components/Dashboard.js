import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardContent, Grid, makeStyles, Typography} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Sidebar from "./Sidebar";
import { Row, Col, Container } from "react-bootstrap";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  }
});

export default function Dashboard() {
  const [error, setError] = useState("");
  const history = useHistory();

  const { currentUser, logout } = useAuth();
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
    <Sidebar />
    <Grid container
      spacing={10}
    >
      <Row>
      <Col>
      <Grid item xs={12} sm={12} md={12}>
        <Card>
        <CardContent>
          <h2 className="text-center mb-2">Brief Summary</h2>
        </CardContent>
        </Card>

        <Card>
        <CardContent>
          <h2 className="text-center mb-2">Details</h2>
        </CardContent>
        </Card>
      </Grid>
      </Col>
      </Row>

      <Col>
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <CardContent>
          <Typography component="h2" align="center">
            Debt Relief Tips
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <Typography variant="body2" color="textSecondary" component="p">
            • Tip 1 <br></br>
            • Tip 2 <br></br>
            • Tip 3 <br></br>
            • Tip 4 <br></br>
            • Tip 5 <br></br>
          </Typography>
          </Typography>
        </CardContent>
        </Card>
      </Grid>
      </Col>

    </Grid>
    </>
  );
}

    /*
    <h2 className="text-center mb-2">Tips</h2>
  return (
    <>
      <Sidebar />
      <Card>
        <CardContent>
          <h2 className="text-center mb-4">Dashboard</h2>
          {error && <Alert severity="danger">{error}</Alert>}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              color="primary"
              size="large"
              variant="contained"
              type="submit"
              className="w-100 text-center mt-2 mb-2"
              component={Link}
              to="/update-account"
            >
              Update Account
            </Button>
          </div>
          <div className="w-100 text-center mt-2">
            <strong>Email: </strong> {currentUser.email}
          </div>
          <div className="w-100 text-center mt-2">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                color="default"
                size="large"
                variant="contained"
                type="submit"
                className="w-100 text-center mb-2"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
*/
