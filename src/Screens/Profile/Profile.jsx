import React from 'react'
import { useNavigate } from "react-router-dom";
import MainHeader2 from './components/MainHeader2';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useStyles from './styles';
import { Box } from '@material-ui/core';
import { CircularProgress, colors } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [bookings, setBookings] = useState([]);
    const [success, setSuccess] = useState(false);
    const user = JSON.parse(localStorage.getItem('currentuser'));

    useEffect(async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('currentuser'));
            console.log(user.data._id);

            const response = await axios.get('/Bookings/Bookings');
            const filteredBookings = response.data.bookings.filter(
                (booking) => booking.isBooked && booking.userid === user.data._id
            );
            console.log(filteredBookings)
            setBookings(filteredBookings);
            setLoading(false);
        } catch (error) {
            setError(true);
            console.log(error);
            setLoading(false);
        }
    }, []);
    const handleDelete = async (bookingId) => {
        try {
            setLoading(true);

            // Send a request to delete the booking with the given ID from the server
            await axios.delete(`/Bookings/Bookings/${bookingId}`);

            // Update the local state to remove the deleted booking
            setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    };
    function logout() {
        localStorage.removeItem('currentuser');
        window.location.href = '/';
    }
    return (
        <>
            <div className={classes.container}><MainHeader2 />
                <Box className={classes.box}>
                    <h3 className={classes.h1}>Username: {user.data.username}</h3>
                    <h3 className={classes.h1}>Email: {user.data.email}</h3>
                    <h3 className={classes.h1}>Birthday: {user.data.birthday}</h3>
                    <button className={classes.btn} onClick={logout}> <LogoutIcon /> Log Out</button>
                </Box>
                {loading ? (<div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>) : error ? (<div class="alert alert-danger" role="alert">
                    Something went wrong!
                </div>) : success ? (<div class="alert alert-success" role="alert">Made Booking Success!</div>
                ) : (
                    <div className={classes.tableContainer}>
                        <style>{`
                  table {
                    table-layout: fixed;
                    width: 80%;
                  }

                  th:nth-child(1),
                  td:nth-child(1) {
                    width: 7%;
                    word-wrap: break-word;
                  }

                  th:nth-child(2),
                  td:nth-child(2) {
                    width: 20%;
                    word-wrap: break-word;
                  }

                  th:nth-child(3),
                  td:nth-child(3) {
                    width: 25%;
                    word-wrap: break-word;
                  }

                  th:nth-child(4),
                  td:nth-child(4) {
                    width: 24%;
                    word-wrap: break-word;
                  }

                  th:nth-child(5),
                  td:nth-child(5) {
                    width: 24%;
                    word-wrap: break-word;
                  }
                `}</style>
                        {bookings !== '' ? (
                            <table className={classes.table}>
                                <thead className={classes.tableHead}>
                                    <tr>
                                        <th className={classes.tableCell}>ID</th>
                                        <th className={classes.tableCell}>Name</th>
                                        <th className={classes.tableCell}>Address</th>
                                        <th className={classes.tableCell}>Booking Details</th>
                                        <th className={classes.tableCell}>Status / Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={index}>
                                            <td className={classes.tableCell}>{index + 1}</td>
                                            <td className={classes.tableCell}>{booking.name}</td>
                                            <td className={classes.tableCell}>{booking.address}</td>
                                            <td className={classes.tableCell}>
                                                {
                                                    <div className={classes.box1}>
                                                        <div className={classes.label}>Username:</div>
                                                        <div className={classes.value}>{booking.username}</div>
                                                        <div className={classes.label}>Email:</div>
                                                        <div className={classes.value}>{booking.email}</div>
                                                        <div className={classes.label}>Count:</div>
                                                        <div className={classes.value}>{booking.count}</div>
                                                        <div className={classes.label}>Price:</div>
                                                        <div className={classes.value}>{booking.price}</div>
                                                        <div className={classes.label}>From / To:</div>
                                                        <div className={classes.value}>{`${booking.from} - ${booking.to}`}</div>
                                                    </div>
                                                }
                                            </td>
                                            <td className={classes.tableCell}>
                                                <Box className={classes.status}>
                                                    <button className={classes.confirm}>✅ Confirmed</button>
                                                    <button className={`${classes.trashIconBtn} ${classes.formInput} material-icons`} onClick={() => handleDelete(booking._id)}>
                                                        <DeleteIcon className={classes.deleteIcon} />
                                                    </button>
                                                </Box>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        ) : (
                            <div
                                className={`${classes.noPosts} alert alert-dark`}
                                role="alert"
                            >
                                No Bookings Found in Cart!
                            </div>
                        )}
                    </div>)}
            </div>

        </>

    )
}

export default Profile