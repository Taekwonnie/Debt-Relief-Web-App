import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Grid, makeStyles, Typography} from '@material-ui/core';
import Sidebar from './Sidebar';

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

    return (
        <>

        <Sidebar />

        </>
    );
}  