import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Card, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import Sidebar from "./Sidebar";
import LineChart from "./DashboardChart";

export default function Dashboard() {
  const [error, setError] = useState("");
  const history = useHistory();
  const { currentUser } = useAuth();

  return (
    <>
      <Sidebar />
      <Grid container spacing={5}>
        <Grid item xs={24} sm={12} md={12}>
          <Card>
            <CardContent>
              <h1 className="text-center mb-2">Brief Summary</h1>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={24} sm={12} md={12}>
        <Card>
            <CardContent>
            <Typography variant="h5" align="left">
                Details
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Typography variant="body2" color="textSecondary" component="p">
                  Debt Balance: <br></br> Debt Interest: <br></br> Monthly Payment: <br></br>
                </Typography>
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <LineChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={24} sm={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" align="left">
                Helpful Tips
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Typography variant="body2" color="textSecondary" component="p">
                  • Tip #1: Cook your own food <br></br>• Tip #2: Freeze your credit card <br></br>• Tip #3: Look for cheaper rates on insurances <br></br>• Tip #4: Start using coupons, rebates, and discounts
                  <br></br>• Tip #5: Turn a hobby into a business <br></br>
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
