import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import API from "../utils/API";

// Both user/admin

import ProfileBlock from "../components/ProfileBlock";
import ProfileActions from '../components/ProfileActions';
import Roles from "../components/Roles"
import References from "../components/References";

// User imports

import RoleTitleView from "../components/Roles";
import CapacityView from "../components/CapacityView";
import ReferenceUser from "../components/References";

// Admin imports

import ProfileForm from "../components/ProfileForm";
import AdminProfileActions from "../components/AdminProfileActions";
import RoleTitleEdit from "../components/RoleTitleEdit";
import CapacityEdit from "../components/CapacityEdit";
import ReferenceAdmin from "../components/ReferenceAdmin";
import AdminNotes from "../components/AdminNotes";

const useStyles=makeStyles(theme => ({
    mainContainer: {
        marginLeft: theme.spacing(35),
        marginTop: theme.spacing(13),
        marginBottom: "5em",
        width: "70%",
        [theme.breakpoints.down("md")]:{
            width: "80%"
        },
        [theme.breakpoints.down("sm")]:{
            width: "80%"
        },
        [theme.breakpoints.down("xs")]:{
            spacing: theme.spacing(2),
            marginLeft: "3.5em"
        }
    }
}))

export default function MyProfile(){
    const classes = useStyles();
    const admin = false;

    const [puppiesData, setPuppiesData] = useState(false)
    const [seniorsData, setSeniorsData] = useState(false)
    const [adultsData, setAdultsData] = useState(false)
    const [behaviorData, setBehaviorData] = useState(false)
    const [medicalIssuesData, setMedicalIssuesData] = useState(false)

    const [userData, setUserData] = useState({})

    useEffect(()=>{
        API.getMyUserData().then(res =>{
            console.log(res.data)
            setUserData(res.data)
            setPuppiesData(res.data.puppies)
            setSeniorsData(res.data.seniors)
            setAdultsData(res.data.adults)
            setBehaviorData(res.data.withBehaviorIssues)
            setMedicalIssuesData(res.data.withMedicalIssues)
        }).catch(err=>{
            console.error(err.response.data.message)
            alert("get data failed")
        })
    }, [])

    return(
        <Grid container className={classes.mainContainer}>
            <Grid item style={{marginBottom: "3em"}}>
                <Typography variant="h4" color="primary">{userData.firstName}'s profile</Typography>
                <Divider/>
            </Grid>
            {/* <ProfileForm/> */}
            <ProfileBlock firstName={userData.firstName} lastName={userData.lastName} phone={userData.phone} email={userData.email} dob={userData.dob} image={userData.profileUrl}/>
            <ProfileActions/>
            <Roles/>
            <CapacityView style={{marginBottom: "5em"}} maxCapacity={userData.maxCapacity} puppies={puppiesData} seniors={seniorsData} adults={adultsData} behavior={behaviorData} medical={medicalIssuesData}/>
            {/* <References/> */}
            {admin ? <AdminNotes/> : null}

            {/* User views */}

            {/* <UserProfileActions/> */}
            {/* <RoleTitleView/> */}
            {/* <CapacityView/> */}
            {/* <ReferenceUser/> */}

            {/* Admin Views */}
            
            {/* <AdminProfileActions/> */}
            {/* <RoleTitleEdit/> */}
            {/* <CapacityEdit/> */}
            {/* <ReferenceAdmin/> */}

        </Grid>
    )
}