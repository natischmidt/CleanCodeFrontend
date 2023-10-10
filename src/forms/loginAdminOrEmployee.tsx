import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {  useUserType} from "../components/UserTypeContext";

const LoginAdminOrEmployeeForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const goToHomePage = useNavigate();
    const { setUserType } = useUserType();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };


    const handleLogin = (userType: 'Admin' | 'Customer' | 'Employee') => {
        setUserType(userType);
        goToHomePage(`/${userType}Home`);
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1>Login</h1>
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
                        onClick={() => handleLogin('Admin')}
                    >
                        Login admin
                    </button>
                    <button
                        type="button"
                        style={styles.button}
                        onClick={() => handleLogin('Customer')}
                    >
                        Login customer
                    </button>
                    <button
                        type="button"
                        style={styles.button}
                        onClick={() => handleLogin('Employee')}
                    >
                        Login employee
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

    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        padding: '20px',
        border: '2px solid silver',
        borderRadius: '5px',
        backgroundColor: '#53af67',
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
        backgroundColor: '#0d714a',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '20px',
        fontSize: '1.2rem',
        margin: '5px',
    },
};
