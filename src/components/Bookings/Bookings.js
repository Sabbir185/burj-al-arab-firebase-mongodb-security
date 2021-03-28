import React from 'react';
import { useEffect, useContext } from 'react';
import { useState } from 'react';
import { UserContext } from './../../App';

const Bookings = () => {
    const [booking, setBooking] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:5000/booking?email='+loggedInUser.email,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data=> setBooking(data));
    },[])
    // console.log(booking);
    return (
        <div>
            <h4>Total booking : {booking.length}</h4>
            {
                booking.map(book=><li key={book._id}>Email : {book.email} , from : {(new Date(book.checkIn)).toDateString('dd/MM/yyyy')} , to : {(new Date(book.checkOut)).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default Bookings;