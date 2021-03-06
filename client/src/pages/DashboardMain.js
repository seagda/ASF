import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import QuickActionsAdmin from "../components/QuickActionsAdmin";
import QuickActionsFoster from "../components/QuickActionsFoster";
import QuickActionsAdopter from "../components/QuickActionsAdopter";
import PieChartContainer from "../components/PieChartContainer";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AvatarList from '../components/AvatarList';
import AlertWarning from '../components/AlertWarning';
import ListContainer from '../components/ListContainer';
import API from '../utils/API';
import MediaCard from '../components/MediaCard';
import DashboardWelcome from '../components/DashboardWelcome';

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
    }, 
    cardContainer: {
        flexGrow: '1', 
        padding: theme.spacing(3),
        flexWrap: "wrap",
        direction: "row"
    }
}))

export default function DashboardMain(){
    const classes = useStyles();

    const [dashboardData, setDashboardState] = useState({})
    const [alerts, setAlerts] = useState([]);
    const [photo, setPhoto] = useState(new Blob());
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => setPhotoUrl(URL.createObjectURL(photo)), [photo]);

    function loadDashboard() {
        Promise.all([
            API.getDashboardData().then(res => {
                console.log(res.data)
                setDashboardState(res.data)
                setAlerts(res.data.alerts)
            }),
            API.getMyProfilePhoto().then(res => {
                setPhoto(res.data)
            })
        ])
            .catch(err => console.log(err));
    };

    const handleAlertRead=({target})=>{
        setAlerts({
            ...alerts,
            [target.read]: target.true
        })
    }



    useEffect(() => {
        loadDashboard()
    }, [])

    const userString = localStorage.getItem("user")
    if(!userString){
        window.location = "/"
    }
    const user = JSON.parse(userString)

    return(
        <Grid container className={classes.mainContainer} justify="space-evenly" spacing={4}>
            {console.log(localStorage.getItem("user"))}
   
            <Grid item xs={12}>
                <Typography variant="h3" component="h4" gutterBottom align="center" color="primary">
                    My Dashboard
                    <Divider />
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <DashboardWelcome name={dashboardData.user && `${dashboardData.user.firstName} ${dashboardData.user.lastName}`} photoUrl={photoUrl} />
            </Grid>
            <Grid item xs={12} s={10}>
                <Typography variant="h5" component="h6" gutterBottom color="primary">
                    Quick Actions
                    <Divider />
                </Typography>

                {/* If Admin credentials, display these quick actions */}
                {user.roles.some( (role) => ["Regional", "Admin", "Super Admin"].includes(role)) ? 
                <Grid item xs={12}>
                    <QuickActionsAdmin/>
                </Grid>: null}

                {/* And/or if Foster credentials, display these quick actions */}
                {user.roles.includes("Foster") ?
                <Grid item xs={12}>
                    <QuickActionsFoster/>
                </Grid>: null}

                {/* And/or if Foster credentials, display these quick actions */}
                {user.roles.includes("Adopter") ?
                <Grid item xs={12}>
                    <QuickActionsAdopter/>
                </Grid>: null}
            </Grid>

            <Grid item xs={12} s={10}>

                {/* Render pie charts for admin viewers */}
                {dashboardData.fosterCounts && dashboardData.adopterCounts && dashboardData.dogStatusCounts ? 
                <Grid item xs={12}>
                    <PieChartContainer data={dashboardData}/>
                </Grid>: null}

                {/* Render dog photo cards if user has associated dogs */}
                
                {dashboardData.myDogs && dashboardData.myDogs.length ? (
                <React.Fragment>
                <Grid item xs={12} s={10}>
                    <Typography variant="h5" component="h6" gutterBottom color="primary">
                        My Dogs
                        <Divider />
                    </Typography>
                </Grid>
                    <Grid container className={classes.cardContainer} justify="center">
                            {dashboardData.myDogs.map(dog =>{
                                return (
                                    <Grid item xs={10} s={10} m={6} lg={3}>
                                        <MediaCard id={dog.id} name={dog.name} gender={dog.gender} dob={dog.dob} image={dog.DogPhotos[0].url} /* dossierLink={} */ />
                                    </Grid>
                                )
                            })}    
                    </Grid>
                </React.Fragment>
                    ):null} 
            </Grid>
            <Grid item container xs={12} s={10}>

                {/* Render ASF Regional Leads and team if user is admin */}
                {dashboardData.teamMembers ? 
                <Grid item xs={12} s={12} m={6} lg={6} style={{marginTop: "2em"}}>
                    <Typography variant="h5" component="h4" gutterBottom align="center" color="primary">
                        ASF Team Members
                        <Divider />
                    </Typography> 
                    
                    {dashboardData.teamMembers.length ? (
                        <ListContainer>
                            {dashboardData.teamMembers.map(teamMember =>{
                                return (
                                    <AvatarList firstName={teamMember.firstName} lastName={teamMember.lastName} image={teamMember.photoUrl} roles={teamMember.Roles} ResidesInRegion={teamMember.ResidesInRegion} email={teamMember.email} id={teamMember.id}/>
                                )
                            })}    
                        </ListContainer>
                    ):null}
                </Grid>:null}

                {/* Render user alerts */}
                {dashboardData.alerts ? (
                <Grid item xs={12} s={12} m={6} lg={6} style={{marginTop: "2em"}}>
                    <Typography variant="h5" component="h4" gutterBottom align="center" color="primary">
                        My Alerts
                        <Divider />
                    </Typography>
                    {dashboardData.alerts.length ? (
                        <ListContainer>
                            {dashboardData.alerts.map(alert =>{
                                return (
                                
                                    <AlertWarning message={alert.message} handleAlertRead={handleAlertRead} />
        
                                )
                            })}    
                        </ListContainer>
                    ):(<h3>You are all caught up!</h3>)}
                </Grid>) :null}
            </Grid>
        </Grid>
    )
}