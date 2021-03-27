import 'date-fns';
import { es, ru } from 'date-fns/esm/locale'
import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from './../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useState } from 'react';


const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkIn = date;
        selectedDate(newDate);
    };
    const handleCheckOutDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkOut = date;
        selectedDate(newDate);
    };

    const handleButton = () =>{
        
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome, {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate.checkIn}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button onClick={handleButton} variant="contained" color="primary"> Book Now </Button>
            </MuiPickersUtilsProvider>
        </div>
    );
};

export default Book;