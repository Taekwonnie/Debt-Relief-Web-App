import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Card, CardContent, Grid, makeStyles, Typography} from "@material-ui/core";
//import Alert from "@material-ui/lab/Alert";
import Sidebar from "./Sidebar";
import { Row, Col } from "react-bootstrap";
import DashboardChartType from './DashboardChart'

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  }
});

export default function Dashboard() {
  const [error, setError] = useState("");
  const history = useHistory();
  const { currentUser } = useAuth();

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

      <DashboardChartType />

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