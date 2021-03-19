import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

import API from "../utils/API";
import ProfileBlock from "../components/ProfileBlock";
import ProfileActions from "../components/ProfileActions";
import CapacityView from "../components/CapacityView";
import Roles from "../components/Roles";
import UserAddress from "../components/UserAddress";
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

export default function UserProfileView(){
    const classes = useStyles();

    const id = useParams().id || "me";

    const [userData, setUserData] = useState({})
    const [photo, setPhoto] = useState(new Blob())

    useEffect(()=>{
        API.getSingleUser(id).then(res =>{
            console.log(res.data)
            setUserData(res.data)
        }).catch(err=>{
            console.error(err.response.data.message)
            // alert("get data failed")
        });

        API.getProfilePhoto(id).then(res => {
            setPhoto(res.data);
        }).catch(console.error);
    }, [])

    return(
        <Grid container className={classes.mainContainer}>
            <Grid item style={{marginBottom: "3em"}}>
                <Typography variant="h4" color="primary">{userData.firstName}'s profile</Typography>
                <Divider/>
            </Grid>

            <ProfileBlock
                image={URL.createObjectURL(photo)}
                firstName={userData.firstName}
                lastName={userData.lastName}
                phone={userData.phone}
                email={userData.email}
                dob={userData.dob}
            />

            {userData?.editable?.length ? <ProfileActions roles={userData?.Roles?.map((role)=>role.name)} id={id}/> : null}

            <UserAddress
                region={userData.ResidesInRegion?.name}
                street={userData.Address?.street}
                street2={userData.Address?.street2}
                city={userData.Address?.city}
                state={userData.Address?.state}
                zip={userData.Address?.zip5}
            />

            <Roles
            roles={userData.Roles?.map((role)=><Chip key={role.id} label={role.name}/>)}
            />

            <CapacityView style={{ marginBottom: "5em" }}
                maxCapacity={userData.maxCapacity}
                puppies={userData.puppies}
                seniors={userData.seniors}
                adults={userData.adults}
                behavior={userData.withBehaviorIssues}
                medical={userData.withMedicalIssues}
            />

            {userData.adminNotes !== undefined ? <AdminNotes notes={userData.adminNotes} /> : null}

        </Grid>
    )
}