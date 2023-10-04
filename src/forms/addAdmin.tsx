import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddAdminForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [ss, setSs] = useState('');
    const [salary, setSalary] = useState <number> (0);
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    const goBackToAddUser = useNavigate();

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        try {
            const Url = 'http://localhost:8080/api/employee/createEmployee';

            const adminData = {
                firstName: firstname,
                lastName: lastname,
                password: password,
                ssNumber: ss,
                email: email,
                phoneNumber: phonenumber,
                address: address,
                role: "ADMIN",
                salary: salary,
            };

            const response = await axios.post(Url, adminData);

            console.log('Admin was created', response.data);

        } catch (error) {
            console.error('Error creating admin', error);
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2>Create new Employee</h2>
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
                    placeholder="Social Security Number"
                    style={styles.input}
                    value={ss}
                    onChange={(e) => setSs(e.target.value)}
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
                    value={phonenumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    style={styles.input}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Hourly Salary"
                    style={styles.input}
                    value={salary}
                    onChange={(e) => setSalary(parseFloat(e.target.value))}
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
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        padding: '20px',
        border: '2px solid silver',
        borderRadius: '5px',
        backgroundColor: '#53af67',
        width: "500px",
        height: '760px',
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
        backgroundColor: '#0d714a',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
    },
}
