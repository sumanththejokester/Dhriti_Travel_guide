import React from 'react';
import MainHeader from './components/MainHeader/MainHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useStyles from './styles';
import { CircularProgress, colors } from '@material-ui/core';
import FormInput from '../Booking/components/FormInput2'
import DeleteIcon from '@material-ui/icons/Delete';

const Bookings = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        email: '',
        from: '',
        to: '',
        count: '',
    });
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [bookings, setBookings] = useState([]);
    const [success, setSuccess] = useState(false);



    useEffect(async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('currentuser'));
            console.log(user.data._id);

            const response = await axios.get('/Bookings/Bookings');
            const filteredBookings = response.data.bookings.filter(
                (booking) => !booking.isBooked && booking.userid === user.data._id
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

    const inputs = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            errorMessage:
                "Username should be 3-16 characters and shouldn't include any special character!",
            label: 'Username',
            pattern: '^[A-Za-z0-9]{3,16}$',
            required: true,
        },
        {
            id: 2,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            errorMessage: 'It should be a valid email address!',
            label: 'Email',
            required: true,
        },
        {
            id: 3,
            name: 'from',
            type: 'date',
            placeholder: 'From',
            label: 'From Date',
        },
        {
            id: 4,
            name: 'to',
            type: 'date',
            placeholder: 'To',
            label: 'To Date',
        },
        {
            id: 5,
            name: 'count',
            type: 'text',
            placeholder: 'No.',
            label: 'Count',
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const update = async () => {
        // Set the same username and email for all bookings
        const username = values.username;
        const email = values.email;

        // Update the bookings displayed on the screen with new values
        const updatedBookings = bookings.map((booking) => {
            const user = JSON.parse(localStorage.getItem('currentuser'));

            if (booking.isBooked == false && booking.userid === user.data._id) {
                return {
                    ...booking,
                    username,
                    email,
                    count: values.count,
                    from: values.from,
                    to: values.to,
                    isBooked: true,
                };
            } else {
                return booking;
            }
        });

        try {
            setLoading(true);
            // Update the server with the new bookings data
            const response = await axios.post('/Bookings/Bookings', updatedBookings);
            setLoading(false);
            // Update the local state with the updated bookings
            const user = JSON.parse(localStorage.getItem('currentuser'));

            const filteredBookings = response.data.bookings.filter(
                (booking) => !booking.isBooked && booking.userid === user.data._id
            );
            setBookings(filteredBookings);
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
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



    return (
        <>
            <div className={classes.container}>
                <MainHeader />
                <h1 className={classes.h1}>Booking Form</h1>
                {loading ? (
                    <div className={classes.loading}>
                        <CircularProgress size="5rem" />
                    </div>
                ) : error ? (
                    <div class="alert alert-danger" role="alert">
                        Something went wrong!
                    </div>
                ) : success ? (<div class="alert alert-success" role="alert">Made Booking Success!</div>) : (
                    <div className={classes.tableContainer}>
                        <style>
                            {`
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
                    width: 15%;
                    word-wrap: break-word;
                  }

                  th:nth-child(3),
                  td:nth-child(3) {
                    width: 34%;
                    word-wrap: break-word;
                  }

                  th:nth-child(4),
                  td:nth-child(4) {
                    width: 10%;
                    word-wrap: break-word;
                  }
                  th:nth-child(5),
                  td:nth-child(5) {
                    width: 34%;
                    word-wrap: break-word;
                  }
                `}
                        </style>
                        {bookings !== '' ? (
                            <table className={classes.table}>
                                <thead className={classes.tableHead}>
                                    <tr>
                                        <th className={classes.tableCell}>ID</th>
                                        <th className={classes.tableCell}>Name</th>
                                        <th className={classes.tableCell}>Address</th>
                                        <th className={classes.tableCell}>Price</th>
                                        <th className={classes.tableCell}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={index}>
                                            <td className={classes.tableCell}>{index + 1}</td>
                                            <td className={classes.tableCell}>{booking.name}</td>
                                            <td className={classes.tableCell}>{booking.address}</td>
                                            <td className={classes.tableCell}>{booking.price}</td>
                                            <td className={classes.tableCell}>
                                                <div className={classes.form1} onSubmit={handleSubmit}>
                                                    <div className={classes.dateFields}>
                                                        {inputs
                                                            .filter((input) => input.id === 3 || input.id === 4)
                                                            .map((input) => (
                                                                <FormInput
                                                                    key={input.id}
                                                                    {...input}
                                                                    value={values[input.name]}
                                                                    onChange={onChange}
                                                                />
                                                            ))}
                                                    </div>
                                                    <div className={classes.countTrashFields}>
                                                        <FormInput
                                                            key={5}
                                                            {...inputs.find((input) => input.id === 5)}
                                                            value={values.count}
                                                            onChange={onChange}
                                                        />
                                                        <div className={classes.trshbtn}>
                                                            <button className={`${classes.trashIconBtn} ${classes.formInput} material-icons`} onClick={() => handleDelete(booking._id)}>
                                                                <DeleteIcon className={classes.deleteIcon} />
                                                            </button>
                                                        </div>



                                                    </div>

                                                </div>
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
                        <div className={classes.form} onSubmit={handleSubmit}>
                            {inputs
                                .filter((input) => input.id < 3)
                                .map((input) => (
                                    <FormInput
                                        key={input.id}
                                        {...input}
                                        value={values[input.name]}
                                        onChange={onChange}
                                    />
                                ))}
                            <button className="btn" onClick={update}>
                                Make Booking
                            </button>

                        </div>
                        <br />
                    </div>
                )}

            </div>
        </>
    );
};

export default Bookings;
