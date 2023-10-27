import React, { useState } from 'react';
import customer from "../../API/customer";
import {useNavigate} from "react-router-dom";
import {useUserType} from "../UserTypeContext";

export const LoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    const [email, setEmail] = useState('hanna.root@ikea.se'); //för testsyfte
    const [password, setPassword] = useState('password');
    const goToHomePage = useNavigate();
    const {setUserType , setId, setLoggedIn} = useUserType();


    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
    }

    const handleLogin = async (email: string, password: string) => {
        customer.login(email, password, setUserType, setId, goToHomePage, setLoggedIn);
    }

    return (
        <div style={styles.modalContainer}>
            <div style={styles.modalInnerContainer}>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <h2>Login</h2>
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
                    <button type="submit" style={styles.button} onClick={() => handleLogin(email, password)}>
                        Login
                    </button>
                    <button type="submit" style={styles.button} onClick={onClose}>
                        Go Back
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    modalContainer: {
        width: "100vw",
        height: "100vh",
        zIndex: 333,
        position: "absolute" as 'absolute',
        top: 0,
        left: 0,
        backgroundColor: "rgba(169,160,160,0.8)",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    modalInnerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        padding: '20px',
        border: '2px solid silver',
        borderRadius: '5px',
        backgroundColor: '#b3d9e3',
        width: "300px",
        // height: '400px',
        marginTop: '4%'
    },
    input: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '75%',
        borderRadius: '5px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#2b7285',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
        width: "150px"
    },
}
