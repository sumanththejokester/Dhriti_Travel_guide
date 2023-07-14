import React from 'react'
import { useState } from "react";
import axios from 'axios';
import FormInput from '../components/FormInput'
import "../register/styles.css"
import { CircularProgress } from '@material-ui/core'

const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const inputs = [

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
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    async function login() {
        const user = {
            email: values.email,
            password: values.password
        }
        try {
            setloading(true);
            const result = await axios.post('/Users/Login', user);
            setloading(false);
            localStorage.setItem('currentuser', JSON.stringify(result));
            window.location.href = '/home';
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
                <h1 className='h1'>Log In</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}

                <div className='div'>
                    <p className='p'>Don't Have an Account ?</p>
                    <a className='a' href="/Register">Register</a>
                </div>
                {loading ? (
                    <div ><div className='loading'>
                        <CircularProgress size="5rem" />
                    </div>
                        <br /></div>
                ) : error ? (
                    <div>
                        <div class="alert alert-danger" role="alert">
                            Invalid Credentials!
                            <a href="/">Go to Home</a>
                        </div>
                        <br />
                    </div>


                ) :
                    <button className='btn' onClick={login}>Submit</button>}
            </form>
        </div>
    )
}

export default Login