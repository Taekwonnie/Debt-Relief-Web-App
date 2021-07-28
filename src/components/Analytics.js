import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Grid, makeStyles, Typography} from '@material-ui/core';
import Sidebar from './Sidebar';
import { Chart } from "react-google-charts";
import { Container, Row, Col } from "react-bootstrap";

const useStyles = makeStyles({
    gridContainer: {
      paddingLeft: "40px",
      paddingRight: "40px"
    }
  });
  
export default function Analytics() {
    const [error, setError] = useState("");
    const history = useHistory();
    const { currentUser } = useAuth();

    // TODO: change amount, debt, and monthly payment to user's data
    return (
        <>
        <Sidebar />
        <Container fluid>
          <Row>
            <Col>
              <Grid item xs={24} sm={24} md={24}>
                <Card>
                  <CardContent>
                    <Chart
                      width={'500px'}
                      height={'300px'}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Expense', 'Amount'],
                        ['Vehicle', 250],
                        ['Groceries', 200],
                        ['Home Improvement', 100],
                        ['Utility', 50],
                        ['Petrol/Gas', 75],
                        ['Entertainment', 20],
                        ['Medical', 150],
                        ['Mortgage/Rent', 1000],
                        ['Cellular/Phone Payment', 20],
                        ['Education', 500],
                        ['Misc', 25],
                      ]}
                      options={{
                        title: 'Budget',
                        is3D: true,
                        chartArea: { width: '100%' },
                      }}
                      rootProps={{ 'data-testid': '1' }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Col>
        
            <Col>
              <Grid item xs={24} sm={24} md={24}>
                <Card style={{ width: "101%", height: "100%" }}>
                  <CardContent>
                    <Chart
                      width={'500px'}
                      height={'300px'}
                      chartType="ColumnChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Month', 'Debt', 'Monthly Payment'],
                        ['Jan', 12000, 1000],
                        ['Feb', 11000, 1000],
                        ['Mar', 10000, 1000],
                        ['Apr', 9000, 1000],
                        ['May', 8000, 1000],
                        ['Jun', 7000, 1000],
                        ['Jul', 6000, 1000],
                        ['Aug', 5000, 1000],
                        ['Sept', 4000, 1000],
                        ['Oct', 3000, 1000],
                        ['Nov', 2000, 1000],
                        ['Dec', 1000, 1000],
                      ]}
                      options={{
                        title: 'Debt Payoff',
                        chartArea: { width: '49%' },
                        isStacked: true,
                        hAxis: {
                          title: 'Month',
                          minValue: 0,
                        },
                        vAxis: {
                          title: 'Amount',
                        },
                      }}
                      rootProps={{ 'data-testid': '2' }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Col>
          </Row>
        </Container>
        </>
    );
}  