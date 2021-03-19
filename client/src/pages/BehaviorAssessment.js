import React, {useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import "survey-react/survey.css";
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import BehaviorForm from "../components/applications/BehaviorForm";
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

export default function BehaviorAssessment (){
    const classes = useStyles();
    const [showPage, setShowPage] = useState(true);

    const date = Date.now()

    let {id} = useParams();

    const onCompletePage = useCallback((data)=>{
        API.sendBehaviorForm(data, id, date).catch(err => {
            console.error(err.response.data);
            setShowPage(true);
            alert("Error submitting assessment, please try again");
        });
        setShowPage(false)
    }, [showPage])

    const setFinalPage = ()=>{
        return(
            <Grid item container direction="column" align="center">
                <Typography variant="h5">Thanks for completing a behavior assessment!</Typography>
                <Typography variant="h5">We're one step closer to saving another Aussie.</Typography>
            </Grid>
        )
    }

    return(
        <Grid container className={classes.mainContainer}>
            
            {showPage ? <Typography variant="h4" color="primary">Behavior Assessment</Typography> && <BehaviorForm
            showCompletedPage={onCompletePage}
            /> : setFinalPage()}
        </Grid>
    )
}