import React from 'react'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddButton from '../components/AddButton'
import MultiSelectChips from '../components/MultiSelectChips';
import DogAdoptionFlow from '../components/DogAdoptionFlow';
import OverviewTable from '../components/OverviewTable';

const useStyles=makeStyles(theme => ({
    mainContainer: {
        marginTop: "5em",
        marginLeft: "20em", 
        [theme.breakpoints.down("xs")]:{
            marginLeft: "1em"
        }
    }
}))

export default function DogDossiersAll() {
    const regions = [
        'Midwest/South',
        'Mid-Atlantic',
        'Mississippi Valley',
        'West Coast',
        'Great Lakes',
        'Plains States',
        'Rocky Mountain',
        'Southeast',
        'Northeast',
        'Texas'
      ];

    const dogStatus = [
        'Pending Intake',
        'Foster Ready',
        'In Foster',
        'Adoption Ready',
        'Adopted',
      ];

    const classes = useStyles()
    return (
        
        <Grid container className={classes.mainContainer}>
            <Grid container xs={12} s={10} m={8} lg={8} spacing={2}>
                <Grid item xs={12}>
                <Typography variant="h3" component="h4" gutterBottom align="center" color="primary">
                    Dog Dossiers
                    <Divider />
                </Typography>
                </Grid>
                <Grid item xs={10} />
                <Grid item xs={2}>
                    <AddButton buttonText="Add Dog" toLink="/addDog" />
                    
                </Grid>
                <Grid item xs={12}  /* direction="row" justify="flex-end" alignItems="center" */>
                     <form noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth />
                    </form>
                </Grid>
                <Grid item xs={6}>
                    <MultiSelectChips names={regions} title="Select Region"/>
                </Grid>
                <Grid item xs={6}>
                    <MultiSelectChips names={dogStatus} title="Select Dog Status"/>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <div style={{height: 100, width: 1000}}>
                        <DogAdoptionFlow />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <OverviewTable />
                </Grid>
            </Grid>
        </Grid>
       
    )
}