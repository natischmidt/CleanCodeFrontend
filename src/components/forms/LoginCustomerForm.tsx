import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {  useUserType} from "../context/UserTypeContext";
import axios from "axios";

const LoginCustomerForm = () => {
    const [email, setEmail] = useState('lars.olofsson@malari.se');
    const [password, setPassword] = useState('password');
    const goToHomePage = useNavigate();
    const { setUserType , setId} = useUserType();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    const handleLogin = async () => {
        const url = "http://localhost:8080/api/auth/loginCustomer"
        const content = {
            email,
            password
        }

        try {
            const resp = await axios.post(url, content);
            const response = resp.data

            if (response) {

                setUserType("Customer") // sätter det i context + att detta kan dra sig, nån får fixa :))
                setId(response)
                goToHomePage(`/CustomerHome`)
            } else {
                console.log("hur tusan hamna vi här?")
            }
        } catch (error) {
            console.log("neeeej?")
            console.log(error)
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1>Login Customer</h1>
                <input
                    type="text"
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="buttonContainer">
                    <button
                        type="button"
                        style={styles.button}
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                </div>
            </form>
        </div>
    );
};


export default LoginCustomerForm;

const styles = {
    buttonContainer: {

    },
    introText: {
        color: 'black'
    },

    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        padding: '20px',
        border: '2px solid silver',
        borderRadius: '5px',
        backgroundColor: '#b3d9e3',
        width: "600px",
        // height: '400px',
    },
    input: {
        marginTop: '25px',
        marginBottom: '15px',
        padding: '10px',
        width: '85%',
        fontSize: '1.2rem',
    },
    button: {
        padding: '13px 25px',
        backgroundColor: '#2b7285',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '20px',
        fontSize: '1.2rem',
        margin: '5px',
    },
};
