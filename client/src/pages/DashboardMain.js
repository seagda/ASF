import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import QuickActionsAdmin from "../components/QuickActionsAdmin";
import QuickActionsFoster from "../components/QuickActionsFoster";
import PieChartContainer from "../components/PieChartContainer";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MultiSelectChips from '../components/MultiSelectChips';
import AvatarList from '../components/AvatarList';
import BasicList from '../components/BasicList';
import ListContainer from '../components/ListContainer';
import TeamAPI from '../utils/Team';
import AlertAPI from '../utils/Alerts';
import API from '../utils/API';


const useStyles=makeStyles(theme => ({
    mainContainer: {
        marginLeft: theme.spacing(35),
        marginTop: theme.spacing(12),
        width: "70%",
        [theme.breakpoints.down("md")]:{
            width: "80%"
        },
        [theme.breakpoints.down("sm")]:{
            width: "100%"
        },
        [theme.breakpoints.down("xs")]:{
            spacing: theme.spacing(2),
            marginLeft: 5
        }
    }
}))

export default function DashboardMain(){
    const classes = useStyles();

    const [dashboardData, setDashboardState] = useState({})
  
    function loadDashboard() {
        
    API.getDashboardData()
        .then(res => {
        console.log(res)
        setDashboardState(res.data)
        
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        loadDashboard()
    }, [])

    return(
        <Grid container className={classes.mainContainer}>
            {console.log(localStorage.getItem("user"))}
   
            <Grid item xs={12}>
                <Typography variant="h3" component="h4" gutterBottom align="center" color="primary">
                    Admin Dashboard
                    <Divider />
                </Typography>
            </Grid>
            
            {JSON.parse(localStorage.getItem("user")).roles.some( (role) => ["regional", "admin", "superAdmin"].includes(role)) ? 
            <Grid item xs={12}>
                <QuickActionsAdmin/>
            </Grid>: null}
            {dashboardData.fosterCounts && dashboardData.adopterCounts && dashboardData.dogStatusCounts ? <Grid item xs={12}>
                <PieChartContainer data={dashboardData}/>
            </Grid>: null}
            {JSON.parse(localStorage.getItem("user")).roles.includes("foster") ?
                <Grid item xs={12}>
                <QuickActionsFoster/>
            </Grid>: null}
           
            {/* <Grid item xs={12} s={12} m={6} lg={6} style={{marginTop: "2em"}}>
                 <Typography variant="h5" component="h4" gutterBottom align="center" color="primary">
                    ASF Team Members
                    <Divider />
                </Typography>
                {team.length ? (
                <ListContainer>
                    {team.map(teamMember =>{
                        return (
                            <AvatarList name={teamMember.name} image={teamMember.image} role={teamMember.role} city={teamMember.city} email={teamMember.email}/>
                        )
                    })}    
                </ListContainer>
                ):(<p>Currently no data to display</p>)}
            </Grid>
            <Grid item xs={12} s={12} m={6} lg={6} style={{marginTop: "2em"}}>
                <Typography variant="h5" component="h4" gutterBottom align="center" color="primary">
                    My Alerts
                    <Divider />
                </Typography>
                {alerts.length ? (
                <ListContainer>
                    {alerts.map(alert =>{
                        return (
                            <BasicList name={alert.name} image={alert.image} dueDate={alert.dueDate} dogName={alert.dogName}/>
                        )
                    })}    
                </ListContainer>
                ):(<p>Currently no data to display</p>)}
            </Grid> */}
        </Grid>
    )
}