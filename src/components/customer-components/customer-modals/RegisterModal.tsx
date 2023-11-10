import React, {useRef, useState} from 'react';
import customer from "../../../API/customer";
import {useUserType} from "../../context/UserTypeContext";

export const RegisterModal: React.FC<{ onClose: () => void }> = ({onClose}) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [address, setAdress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [company, setCompany] = useState('');
    const [orgNr, setOrgNr] = useState('');
    const [businessCustomer, setBusinessCustomer] = useState(false);
    // const [allNecessaryInformationEntered, setAllNecessaryInformationEntered] = useState(false);
    const allNecessaryInformationEntered = useRef(false);
    const {setUserType , setId, setLoggedIn} = useUserType();



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

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


    const handleChangeCustomerType = (custType: string) => {
        if (custType === "business") {
            setBusinessCustomer(true)
        } else {
            setBusinessCustomer(false)
            setCompany('')
            setOrgNr('')
        }
    }

    const checkAllInformationEntered = () => {
        console.log(firstname + " " + lastname + " " + email + " " + phonenumber + " " + address + " " + password + " " + confirmPassword + " " + city + " " + postalCode)

        if (firstname !== '' &&
        lastname !== '' &&
        email.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') &&
            email !== '' &&
        // phonenumber.match('^(\d+){8,12}$') &&
            phonenumber != '' &&
        address != '' &&
        // password.match('^(?=(?:\\D*\\d){2,})(?=[^\\p{L}]*\\p{L})[a-zA-Z\\d\\W]{8,}$') &&
        password === confirmPassword &&
        city != '' &&
        // postalCode.match('^(\d+){4,5}$') &&
            postalCode != ''
        ) {
            // setAllNecessaryInformationEntered(true);
            allNecessaryInformationEntered.current = true
        } /*else {
            setAllNecessaryInformationEntered(false)
        }*/
        // if (businessCustomer &&
        //     (company == '' ||
        //     orgNr == '')
        // ) {
        //     setAllNecessaryInformationEntered(false);
            // allNecessaryInformationEntered.current = false
        // }
    }

    const handleRegister = async () => {

            try {
                const tempId = await customer.register(customerData, setLoggedIn, setUserType, setId);
                console.log('Customer was registered , tempId:', tempId);
                onClose();
            } catch (error) {
                console.error('Error while trying to register a new customer', error);
            }

    }


    return (
        <div style={styles.modalContainer}>
            <div style={styles.modalInnerContainer}>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <select
                        style={styles.input_dropList}
                        onChange={(value) => handleChangeCustomerType(value.target.value)}
                    >
                        <option value="">Business or private customer?</option>
                        <option value="business" onClick={() => handleChangeCustomerType("business")}>Business</option>
                        <option value="private" onChange={() => handleChangeCustomerType("private")}>Private</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Firstname"
                        style={styles.input}
                        value={firstname}
                        onChange={(e) => {
                            setFirstname(e.target.value)
                            checkAllInformationEntered()
                        }}

                        required
                    />
                    <input
                        type="text"
                        placeholder="Lastname"
                        style={styles.input}
                        value={lastname}
                        onChange={(e) => {
                            setLastname(e.target.value)
                            checkAllInformationEntered()
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        style={styles.input}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            checkAllInformationEntered()
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        style={styles.input}
                        value={phonenumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value)
                            checkAllInformationEntered()
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        style={styles.input}
                        value={address}
                        onChange={(e) => {
                            setAdress(e.target.value)
                            checkAllInformationEntered()
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="City"
                        style={styles.input}
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value)
                            checkAllInformationEntered()
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Postal code"
                        style={styles.input}
                        value={postalCode}
                        onChange={(e) => {
                            setPostalCode(e.target.value)
                            checkAllInformationEntered()
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            checkAllInformationEntered()
                        }}
                        required
                    />
                    <label>At least 6 letters, 2 numbers)</label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        style={styles.input}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            checkAllInformationEntered()
                        }}
                        required
                    />

                    {businessCustomer ?
                        <div style={styles.customerTypeWrap}>
                            <input
                                type="text"
                                placeholder="Company name"
                                style={styles.input}
                                value={company}
                                onChange={(e) => {
                                    setCompany(e.target.value)
                                    checkAllInformationEntered()
                                }}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Organisation Number"
                                style={styles.input}
                                value={orgNr}
                                onChange={(e) => {
                                    setOrgNr(e.target.value)
                                    checkAllInformationEntered()
                                }}
                                required
                            />
                        </div> : <></>}

                    {allNecessaryInformationEntered.current ?
                        <button type="submit" style={styles.button} onClick={handleRegister}>
                            Register
                        </button> :
                        <button type="submit" style={styles.inactiveButton}>
                            Register
                        </button>
                    }
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
        backgroundColor: "rgba(0, 0, 0, 0.7)",
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
        fontFamily: "PlomPraeng",
        fontSize: "1rem"
    },
    input_dropList: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '80%',
        borderRadius: '5px',
        border: "2px black solid",
        fontFamily: "PlomPraeng",
        fontSize: "1rem",

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
    inactiveButton: {
        padding: '10px 20px',
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '3%',
        width: "150px",

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
