import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {  useUserType} from "../context/UserTypeContext";
import axios from "axios";

const LoginAdminOrEmployeeForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const goToHomePage = useNavigate();
    const { setUserType , setId} = useUserType();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    // userType: 'Admin' | 'Employee'
    // setUserType(userType);
    // goToHomePage(`/${userType}Home`);
    const handleLogin = async () => {

        try {
            const Url = 'http://localhost:8080/api/auth/loginEmployee';

            const loginData = {
                email: email,
                password: password,
            };

            const response = await axios.post(Url, loginData);
            setUserType(response.data.role)
            console.log('Employee has successfully logged in', response.data);

            setEmail('')
            setPassword('')
            setId(response.data.id)
            sessionStorage.setItem("jwt", response.data.jwt)
            goToHomePage(`/${response.data.role}Home`)

        } catch (error) {
            console.error('Error signing in employee', error);
        }
    };


    //     const url = "http://localhost:8080/api/auth/loginEmployee"
    //
    //     const content = {
    //         email,
    //         password
    //     }
    //
    //     try {
    //         const resp = await axios.post(url, content)
    //         const response = resp.data
    //
    //         if (response.id && (response.role === "ADMIN" || response.role ==="EMPLOYEE")){
    //             setUserType(response.role) // sätter det i context
    //             setId(response.id)
    //             goToHomePage(`/${response.role}Home`)
    //
    //             console.log(response.data.id + ' Has successfully logged in');
    //         } else {
    //             console.log("hur tusan hamna vi här?")
    //         }
    //     } catch (error){
    //         console.log(error)
    //     }
    // };

    const quickLoginAsEmployee = () => {
        setEmail("kent.andersson@stadafint.se")
        setPassword("password")
        // handleLogin()
    }
    const quickLoginAsAdmin = () => {
        setEmail("lisa.gronberg@stadafint.se")
        setPassword("password")
        // handleLogin()
    }


    return (
        <div style={styles.container}>

            <div>
                <button onClick={quickLoginAsAdmin}>logga in som admin</button>
                <button onClick={quickLoginAsEmployee}>logga in som employee</button>
                <button onClick={() => goToHomePage("/customerHome")}>gå till customer home</button>
            </div>

                <form style={styles.form} onSubmit={handleSubmit}>
                <h1>Employee portal</h1>
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
    introText: {
        color: 'black'
    },
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100vh"
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        padding: '20px',
        border: '2px solid silver',
        borderRadius: '5px',
        backgroundColor: '#b3d9e3',
        // width: "600px",
        height: '400px',

    },
    input: {
        marginTop: '2%',
        marginBottom: '5%',
        padding: '10px',
        width: '85%',
        fontFamily: "PlomPraeng",
        fontSize: "1rem"
    },
    button: {
        padding: '13px 25px',
        backgroundColor: '#2b7285',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '20%',
        fontSize: '1.2rem',
        margin: '5px',
    },
};
