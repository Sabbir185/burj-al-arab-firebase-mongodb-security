import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Bookings = () => {
    const [booking, setBooking] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/booking')
        .then(res => res.json())
        .then(data=> setBooking(data));
    },[])
    console.log(booking);
    return (
        <div>
            <h4>Total booking : {booking.length}</h4>
            {
                booking.map(book=><li>Email : {book.email} , from : {(new Date(book.checkIn)).toDateString('dd/MM/yyyy')} , to : {(new Date(book.checkOut)).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default Bookings;