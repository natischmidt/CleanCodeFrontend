import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {  useUserType} from "../components/UserTypeContext";
import axios from "axios";

const LoginAdminOrEmployeeForm = () => {
    const [email, setEmail] = useState('lisa.gronberg@stadafint.se');
    const [password, setPassword] = useState('password');
    const goToHomePage = useNavigate();
    const { setUserType } = useUserType();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    //userType: 'Admin' | 'Employee'
    //setUserType(userType);
    //goToHomePage(`/${userType}Home`);
    const handleLogin = async () => {
        const url = "http://localhost:8080/api/auth/loginEmployee"
        const content = {
            email,
            password
        }

        try {
            const resp = await axios.post(url, content)
            const response = resp.data

            if (response.id && (response.role === "ADMIN" || response.role ==="EMPLOYEE")){
                setUserType(response.role) // sätter det i context
                goToHomePage(`/${response.role}Home`)
            } else {
                console.log("hur tusan hamna vi här?")
            }
        } catch (error){
            console.log("neeeej?")
            console.log(error)
        }
    };

    return (
        <div style={styles.container}>
            <div>
                <p style={styles.introText}>admin dummy : lisa.gronberg@stadafint.se pw : password </p>
                <p style={styles.introText}>employee dummy : kent.andersson@stadafint.se pw : password </p>
            </div>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1>Login Employee/Admin</h1>
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


export default LoginAdminOrEmployeeForm;

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
        justifyContent: 'center'
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
        height: '400px',
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
