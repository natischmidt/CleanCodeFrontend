import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import admin from "../../API/admin";
import HeaderComp from "../layout/HeaderComp";


const AddBusinessCustomerForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] =  useState('')
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [orgNr, setOrgNr] = useState('');

    const goBackToAddUser = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const BusinessCustomerData = {
                firstName: firstname,
                lastName: lastname,
                password: password,
                companyName: company,
                orgNumber: orgNr,
                email: email,
                phoneNumber: phonenumber,
                address: address,
                city: city,
                postalCode: postalCode,
            };

            console.log(BusinessCustomerData)
            const response = await admin.createBusinessCustomer(BusinessCustomerData);
            console.log('Business Customer was created', response);

            setFirstname('');
            setLastname('');
            setEmail('');
            setPhoneNumber('');
            setAddress('');
            setCity('');
            setPostalCode('');
            setPassword('');
            setCompany('');
            setOrgNr('');

        } catch (error) {
            console.error('Error creating business customer', error);
        }
    };

    return (
        <>
            <HeaderComp/>
                <div style={styles.container}>
                    <form style={styles.form} onSubmit={handleSubmit}>
                        <h2>Create new Business Customer</h2>
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
                            type="text"
                            placeholder="City"
                            style={styles.input}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Postal code"
                            style={styles.input}
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
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
                            placeholder="Company name"
                            style={styles.input}
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Organisation Number"
                            style={styles.input}
                            value={orgNr}
                            onChange={(e) => setOrgNr(e.target.value)}
                            required
                        />
                        <button type="submit" style={styles.button}>
                            Create new Business Customer
                        </button>
                        <button type="submit" style={styles.button} onClick={() => {{goBackToAddUser(("/adduser"))}}}>
                            Go Back
                        </button>
                    </form>
                </div>
        </>
    );
};

export default AddBusinessCustomerForm;

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
        marginTop: '2%',
        marginBottom: "2%"
    },
    input: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '75%',
        borderRadius: '5px',
        fontFamily: "PlomPraeng",
        fontSize: "1rem"
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#2b7285',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
        width: "270px"
    },
}