import React, { useState } from 'react';

const AddBusinessCustomerForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [adress, setAdress] = useState('');
    const [password, setPassword] = useState('');
    // const [salary, setSalary] = useState('')
    const [company, setCompany] = useState('');
    const [orgNr, setOrgNr] = useState('');
    // const [role, setRole] = useState('');


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1>Add Admin</h1>
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
                <input
                    type="text"
                    placeholder="Company name (Optional)"
                    style={styles.input}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Organisation Number (Optional)"
                    style={styles.input}
                    value={orgNr}
                    onChange={(e) => setOrgNr(e.target.value)}
                />
                <button type="submit" style={styles.button}>
                    Add Admin
                </button>
            </form>
        </div>
    );
};

export default AddBusinessCustomerForm;

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
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
        height: '1000px',
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
    select: {
        marginTop: '25px',
        marginBottom: '15px',
        padding: '10px',
        width: '40%',
        fontSize: '1.2rem',
        textAlign: 'center',
        backgroundColor: "#ffffff",
        borderRadius: '5px',
    },
}