import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const AddAdminForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [adress, setAdress] = useState('');
    const [password, setPassword] = useState('');
    // const [company, setCompany] = useState('');
    // const [orgNr, setOrgNr] = useState('');
    // const [role, setRole] = useState('');

    const goBackToAddUser = useNavigate();


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1>Create new Admin</h1>
                <input
                    type="text"
                    placeholder="Firstname"
                    style={styles.input}
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Lastname"
                    style={styles.input}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    style={styles.input}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Adress"
                    style={styles.input}
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
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
                <button type="submit" style={styles.button}>
                    Create new Admin
                </button>
                <button type="submit" style={styles.button} onClick={() => {{goBackToAddUser(("/AddUser"))}}}>
                    Go Back
                </button>
            </form>
        </div>
    );
};

export default AddAdminForm;

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: '2px solid silver',
        borderRadius: '5px',
        backgroundColor: '#53af67',
        width: "600px",
        height: '800px',
        marginTop: '120px'
    },
    input: {
        marginTop: '15px',
        marginBottom: '15px',
        padding: '15px',
        width: '75%',
        fontSize: '1.2rem',
        borderRadius: '5px',
    },
    button: {
        padding: '13px 25px',
        backgroundColor: '#0d714a',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
        fontSize: '1.2rem',
    },
}