import React, {useState, useEffect, createRef} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useParams} from "react-router-dom";

import ProfileForm from "../components/ProfileForm";
import API from "../utils/API";


const useStyles=makeStyles(theme => ({
    mainContainer: {
        marginLeft: theme.spacing(35),
        marginTop: theme.spacing(13),
        width: "70%",
        [theme.breakpoints.down("md")]:{
            width: "80%"
        },
        [theme.breakpoints.down("sm")]:{
            width: "100%"
        },
        [theme.breakpoints.down("xs")]:{
            spacing: theme.spacing(2),
            marginLeft: 0
        }
    }
}))


export default function EditProfile() {
    const classes = useStyles()

    let {id} = useParams();
    const [userData, setUserData] = useState({})
    const [addressData, setAddressData] = useState({})
    const [photoUrl, setPhotoUrl] = useState("")
    const [photo, setPhoto] = useState(new Blob())

    const photoInput = createRef();

    const handleInputChange=({target})=>{
        setUserData({
            ...userData,
            [target.name]: target.value
        })
        setAddressData({
            ...addressData,
            [target.name]: target.value
        })
    }

    const handlePhotoChange = event => {
        setPhoto(event.target.files[0]);
    }

    useEffect(() => {
        setPhotoUrl(URL.createObjectURL(photo));
    }, [photo])

    useEffect(()=>{
        Promise.all([
            (id ? API.getSingleUser(id) : API.getMyUserData()).then(res =>{
                setUserData(res.data)
                setAddressData(res.data.Address)
            }),
            (id ? API.getProfilePhoto(id) : API.getMyProfilePhoto()).then(res => {
                setPhoto(res.data)
            })
        ]).catch(err=>{
            console.error(err.response.data.message)
            alert("get data failed")
        })
    }, [])

    const submitFunction = event =>{
        event.preventDefault();
        const userInfo = {
            ...userData,
            ...addressData
        }
        Promise.all(id ? [API.updateOtherUser(userInfo, id), API.setProfilePhoto(photo, id)] : [API.updateMyUserData(userInfo), API.setMyProfilePhoto(photo)]).then(res=>{
            setUserData({})
            setAddressData({})
            window.location = `/`
        }).catch(err=>{
            console.error(err.response.data.message)
        })
    }

    return (
        <Grid container className={classes.mainContainer}>
            <ProfileForm 
            handleInputChange={handleInputChange}
            submitFunction={submitFunction}
            userData={userData}
            addressData={addressData}
            photoUrl={photoUrl}
            handlePhotoChange={handlePhotoChange}
            />
        </Grid>
       
    )
}