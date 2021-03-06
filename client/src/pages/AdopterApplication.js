import React, {useState, useCallback} from "react";
import "survey-react/survey.css";
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import AdoptApp from "../components/applications/AdoptApp";
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

export default function AdopterApplication (){
    const classes = useStyles();
    const [showPage, setShowPage] = useState(true);

    const onCompletePage = useCallback((data)=>{
        API.sendAppData(data, 1);
        setShowPage(!showPage)
    }, [showPage])

    const setFinalPage = ()=>{
        return(
            <Grid item container direction="column" align="center">
                <Typography variant="h5">Thanks for completing the application!</Typography>
                <Typography variant="h5">An ASF team member will contact you soon.</Typography>
            </Grid>
        )
    }

    return(
        <Grid container className={classes.mainContainer}>
            
            {showPage ? <Typography variant="h4" color="primary">Adopter Application</Typography> && <AdoptApp
            showCompletedPage={data=>onCompletePage(data)}
            /> : setFinalPage()}
        </Grid>
    )
}