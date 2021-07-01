import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

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
      <Card>
        <Card.Body>
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
              normal
              color="primary"
              size="large"
              type="submit"
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
                normal
                color="default"
                size="large"
                type="submit"
                variant="contained"
                type="submit"
                className="w-100 text-center mb-2"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
