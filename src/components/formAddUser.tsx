import React, { useState } from 'react';

const AddUserForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [ssNumber, setSSNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [adress, setAdress] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1>Add User</h1>
                <input
                    type="text"
                    placeholder="Firstname"
                    style={styles.input}
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Lastname"
                    style={styles.input}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Social Security Number"
                    style={styles.input}
                    value={ssNumber}
                    onChange={(e) => setSSNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    style={styles.input}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Adress"
                    style={styles.input}
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select
                    style={styles.select}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="Role">Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                </select>
                <button type="submit" style={styles.button}>
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUserForm;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
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
        height: '910px',
    },
    input: {
        marginTop: '25px',
        marginBottom: '15px',
        padding: '10px',
        width: '75%',
        fontSize: '1.2rem',
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
    select: {
        marginTop: '25px',
        marginBottom: '15px',
        padding: '10px',
        width: '40%',
        fontSize: '1.2rem',
        textAlign: 'center',
        backgroundColor: "#ffffff",
    },
}