import React, { useState } from 'react';
import axios from "axios";

export const RegisterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [address, setAdress] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] =  useState('')
    const [company, setCompany] = useState('');
    const [orgNr, setOrgNr] = useState('');
    const [customerType, setCustomerType] = useState(false);

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
    }

    const handleClickedCheckbox = () => {
        setCustomerType(!customerType)

        setCompany('')
        setOrgNr('')
    }

    const handleRegister = async () => {

        try {
            const url = 'http://localhost:8080/api/customer/create';

            const customerData = {
                firstName: firstname,
                lastName: lastname,
                password: password,
                companyName: company,
                orgNumber: orgNr,
                email: email,
                city: city,
                postalCode: postalCode,
                phoneNumber: phonenumber,
                address: address,
            };

            const response = await axios.post(url, customerData);

            console.log('Customer was registered', response.data);
            onClose()

        } catch (error) {
            console.error('Error while trying to register a new customer', error);
        }
    }

    return (
        <div style={styles.modalContainer}>
            <div style={styles.modalInnerContainer}>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <label style={styles.label}>
                        Are you a Business Customer? <br/> Press checkbox:
                        <input
                            type="checkbox"
                            checked={customerType}
                            onChange={() => handleClickedCheckbox()}
                        />
                    </label>
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
                        onChange={(e) => setAdress(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="City"
                        style={styles.input}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Postal code"
                        style={styles.input}
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {customerType ?
                        <div style={styles.customerTypeWrap}>
                            <input
                                type="text"
                                placeholder="Company name"
                                style={styles.input}
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Organisation Number"
                                style={styles.input}
                                value={orgNr}
                                onChange={(e) => setOrgNr(e.target.value)}
                            />
                        </div> : <></>}

                    <button type="submit" style={styles.button} onClick={handleRegister}>
                        Register
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: 'flex',
        justifyContent: "center" as 'center',
        alignItems: "center" as 'center',
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
        width: "400px",
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
        marginTop: '3%',
        width: "150px"
    },
    label: {
        color: "black" as 'black',
        justifyContent: "center" as 'center',
        textAlign: "center" as "center",
    },
    customerTypeWrap: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        width: "100%"
    },
}
