import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import FormInput from '../components/FormInput'
import "../register/styles.css"
import { CircularProgress } from '@material-ui/core'

const Register = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage:
                "Username should be 3-16 characters and shouldn't include any special character!",
            label: "Username",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            required: true,
        },
        {
            id: 3,
            name: "birthday",
            type: "date",
            placeholder: "Birthday",
            label: "Birthday",
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 5,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords don't match!",
            label: "Confirm Password",
            pattern: values.password,
            required: true,
        },
    ];
    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    async function register() {
        const user = {
            username: values.username,
            email: values.email,
            password: values.password,
            birthday: values.birthday,
        };

        try {
            setloading(true);
            const result = await axios.post('/Users/Register', user);
            setloading(false);
            values.username = "";
            values.email = "";
            values.birthday = "";
            values.password = "";
            values.confirmPassword = "";
        } catch (error) {
            console.log(error)
            setloading(false);
            seterror(true);
        }
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (

        <div className='register'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='h1'>Register</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}

                <div className='div'>
                    <p className='p'>Already Have an Account ? </p>
                    <a className='a' href="/Login">LogIn</a>
                </div>
                {loading ? (
                    <div ><div className='loading'>
                        <CircularProgress size="5rem" />
                    </div>
                        <br /></div>
                ) : error ? (
                    <div>
                        <div class="alert alert-danger" role="alert">
                            Something went wrong!
                            <a href="/">Go to home </a>
                        </div>
                        <br />
                    </div>


                ) : <button className='btn' onClick={register}>Submit</button>}

            </form>
        </div>

    )
}

export default Register