import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddPrivateCustomerForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    const goBackToAddUser = useNavigate();

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        try {
            const Url = 'http://localhost:8080/api/customer/create';

            const BusinessCustomerData = {
                firstName: firstname,
                lastName: lastname,
                password: password,
                email: email,
                phoneNumber: phonenumber,
                address: address,
                customerType: "PRIVATE"
            };

            const response = await axios.post(Url, BusinessCustomerData);

            console.log('Private Customer was created', response.data);

            setFirstname('')
            setLastname('')
            setEmail('')
            setAddress("")
            setPhoneNumber('')
            setLastname('')
            setPassword('')

        } catch (error) {
            console.error('Error creating private customer', error);
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2>Create new Private Customer</h2>
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
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" style={styles.button}>
                    Create new Private Customer
                </button>
                <button type="submit" style={styles.button} onClick={() => {{goBackToAddUser(("/AddUser"))}}}>
                    Go Back
                </button>
            </form>
        </div>
    );
};

export default AddPrivateCustomerForm;

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
        backgroundColor: '#b3d9e3',
        width: "500px",
        height: '630px',
        marginTop: '6%'
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
    },
}

