import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import RefCardAdmin from "../components/RefCardAdmin";

const useStyles = makeStyles((theme) => ({
    itemContainer: {
        width: "100%",
        [theme.breakpoints.down("xs")]:{
            justifyContent: "center",
            alignItems: "center",
            padding: "1em"
        }
    },
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
}));

export default function ReferenceAdmin() {
    const classes = useStyles();
    const references = [{name: "Ashley", phone: "480-231-7775", email: "ashley@ashley.com", notes:"Speaks highly of applicant."},{name: "Garth", phone: "805-320-3139", email: "garth@garth.com", notes:"Thinks applicant is good fit for aussie."}]

    return (
        <Grid item container className={classes.itemContainer}>
            <Grid container direction="row" justify={"space-between"}>
                <Grid item container xs={10} sm={6} md={6} lg={12} style={{marginTop: "3em"}} direction="column">
                    <Grid item>
                        <Typography variant="h4">References</Typography>
                        <Divider />
                    </Grid>
                    <Grid item container justify="space-evenly">
                            {references.map((reference)=>(
                                <RefCardAdmin
                                name={reference.name}
                                phone={reference.phone}
                                email={reference.email}
                                notes={reference.notes}
                                />
                            ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}