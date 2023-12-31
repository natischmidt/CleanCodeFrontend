import React, {useRef, useState} from 'react';
import customer from "../../../API/customer";
import {useUserType} from "../../context/UserTypeContext";

export const RegisterModal: React.FC<{ onClose: () => void }> = ({onClose}) => {

    const [firstnameStyle, setFirstnameStyle] = useState(styles.input);
    const [lastnameStyle, setLastnameStyle] = useState(styles.input);
    const [emailStyle, setEmailStyle] = useState(styles.input);
    const [phonenumberStyle, setPhonenumberStyle] = useState(styles.input)
    const [addressStyle, setAddressStyle] = useState(styles.input)
    const [cityStyle, setCityStyle] = useState(styles.input)
    const [postalCodeStyle, setPostalCodeStyle] = useState(styles.input)
    const [passwordStyle, setPasswordStyle] = useState(styles.input)
    const [confirmPasswordStyle, setConfirmPasswordStyle] = useState(styles.input)
    const [businessCustomer, setBusinessCustomer] = useState(false);
    const firstname = useRef('');
    const lastname = useRef('');
    const email = useRef('');
    const phonenumber = useRef('');
    const address = useRef('');
    const password = useRef('');
    const confirmPassword = useRef('');
    const city = useRef('');
    const postalCode = useRef('');
    const company = useRef('');
    const orgNr = useRef('');
    const [allNecessaryInformationEntered, setAllNecessaryInformationEntered] = useState(false);
    const {setUserType, setId, setLoggedIn} = useUserType();
    const emailRegex = new RegExp("^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|.(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
    const phonenumberRegex = new RegExp("^(\\d){7,12}$")
    const passwordRegex = new RegExp("^(?=(?:\\D*\\d){2})[A-Za-z\\d]{8,}$")
    const postalCodeRegex = new RegExp("^(\\d){5}$")


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    const customerData = {
        firstName: firstname.current,
        lastName: lastname.current,
        password: password.current,
        companyName: company.current,
        orgNumber: orgNr.current,
        email: email.current,
        city: city.current,
        postalCode: postalCode.current,
        phoneNumber: phonenumber.current,
        address: address.current,
    };


    const handleChangeCustomerType = (custType: string) => {
        if (custType === "business") {
            setBusinessCustomer(true)
        } else {
            setBusinessCustomer(false)
            company.current = ''
            orgNr.current = ''
        }
    }

    const checkAllInformationEntered = () => {
        if (
            firstname.current !== '' &&
            lastname.current !== '' &&
            email.current.match(emailRegex) &&
            phonenumber.current.match(phonenumberRegex) &&
            address.current != '' &&
            password.current.match(passwordRegex) &&
            password.current === confirmPassword.current &&
            city.current != '' &&
            postalCode.current.match(postalCodeRegex) &&
            postalCode.current != ''
        ) {
            setAllNecessaryInformationEntered(true);
        } else {
            setAllNecessaryInformationEntered(false)
        }
        if (businessCustomer &&
            (company.current == '' ||
            orgNr.current == '')
        ) {
            setAllNecessaryInformationEntered(false);

        }
    }

    const handleRegister = async () => {
        try {
            await customer.register(customerData, setLoggedIn, setUserType, setId);
            onClose();
        } catch (error) {
            console.error('Error while trying to register a new customer', error);
        }

    }

    const isTheFieldOk = (variable : string) => {
        switch (variable){
            case "firstname": {
                if(firstname.current === '') {
                    setFirstnameStyle(styles.invalidInput)
                } else {
                    setFirstnameStyle(styles.input)
                }
                break;
            }
            case "lastname": {
                if(lastname.current === '') {
                    setLastnameStyle(styles.invalidInput)
                } else {
                    setLastnameStyle(styles.input)
                }
                break;
            }
            case "email": {
                if(!email.current.match(emailRegex)) {
                    setEmailStyle(styles.invalidInput)
                } else {
                    setEmailStyle(styles.input)
                }
                break;
            }
            case "phonenumber": {
                if(!phonenumber.current.match(phonenumberRegex)) {
                    setPhonenumberStyle(styles.invalidInput)
                } else {
                    setPhonenumberStyle(styles.input)
                }
                break;
            }
            case "address": {
                if(address.current == null || address.current == '') {
                    setAddressStyle(styles.invalidInput)
                } else {
                    setAddressStyle(styles.input)
                }
                break;
            }
            case "city": {
                if(city.current == null || city.current == '') {
                    setCityStyle(styles.invalidInput)

                } else {
                    setCityStyle(styles.input)
                }
                break;
            }
            case "postalcode": {
                if(postalCode.current == null || postalCode.current == '') {
                    setPostalCodeStyle(styles.invalidInput)
                } else {
                    setPostalCodeStyle(styles.input)
                }
                break;
            }
            case "password": {
                if(!password.current.match(passwordRegex)) {
                    setPasswordStyle(styles.invalidInput)
                } else {
                    setPasswordStyle(styles.input)
                }
                break;
            }
            case "confirmpassword": {
                if(!confirmPassword.current.match(passwordRegex) || confirmPassword.current == '') {
                    setConfirmPasswordStyle(styles.invalidInput)
                } else {
                    setConfirmPasswordStyle(styles.input)
                }
                break;
            }
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
                        style={firstnameStyle}
                        onFocus={() => {
                            isTheFieldOk('firstname')
                        }}
                        onChange={(e) => {
                            firstname.current = (e.target.value)
                            isTheFieldOk('firstname')
                            checkAllInformationEntered()
                        }}

                        required
                    />
                    <input
                        type="text"
                        placeholder="Lastname"
                        style={lastnameStyle}
                        onFocus={() => {
                            isTheFieldOk('lastname')
                        }}
                        onChange={(e) => {
                            lastname.current = e.target.value
                            isTheFieldOk('lastname')
                            checkAllInformationEntered()
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        style={emailStyle}
                        onFocus={() => {
                            isTheFieldOk('email')
                        }}
                        onChange={(e) => {
                            email.current = e.target.value
                            isTheFieldOk('email')
                            checkAllInformationEntered()
                        }}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        style={phonenumberStyle}
                        onFocus={() => {
                            isTheFieldOk("phonenumber")
                        }}
                        onChange={(e) => {
                            phonenumber.current = e.target.value
                            isTheFieldOk('phonenumber')
                            checkAllInformationEntered()
                        }}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        style={addressStyle}
                        onFocus={() => {
                            isTheFieldOk("address")
                        }}
                        onChange={(e) => {
                            address.current = e.target.value
                            isTheFieldOk("address")
                            checkAllInformationEntered()
                        }}
                        required
                    />

                    <input
                        type="text"
                        placeholder="City"
                        style={cityStyle}
                        onFocus={() => {
                            isTheFieldOk("city")
                        }}
                        onChange={(e) => {
                            city.current = e.target.value
                            isTheFieldOk("city")
                            checkAllInformationEntered()
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Postal code"
                        style={postalCodeStyle}
                        onFocus={() => {
                            isTheFieldOk("postalcode")
                        }}
                        onChange={(e) => {
                            postalCode.current = e.target.value
                            isTheFieldOk("postalcode")
                            checkAllInformationEntered()
                        }}
                    />
                    <label>At least 6 letters and 2 numbers</label>
                    <input
                        type="password"
                        placeholder="Password"
                        style={passwordStyle}
                        onFocus={() => {
                            isTheFieldOk("password")
                        }}
                        onChange={(e) => {
                            password.current = e.target.value
                            isTheFieldOk("password")
                            checkAllInformationEntered()

                        }}
                        required
                    />
                    {password.current != confirmPassword.current ?
                        <p style={styles.passwordError}> Passwords do not match!</p>
                        : <></>
                        }

                    <input
                        type="password"
                        placeholder="Confirm password"
                        style={confirmPasswordStyle}
                        onFocus={() => {
                            isTheFieldOk("confirmpassword")
                        }}

                        onChange={(e) => {
                            confirmPassword.current = e.target.value
                            isTheFieldOk("confirmpassword")
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
                                onChange={(e) => {
                                    company.current = e.target.value
                                    checkAllInformationEntered()
                                }}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Organisation Number"
                                style={styles.input}
                                onChange={(e) => {
                                    orgNr.current = e.target.value
                                    checkAllInformationEntered()
                                }}
                                required
                            />
                        </div> : <></>}

                    {allNecessaryInformationEntered ?
                        <button type="submit" style={styles.button} onClick={handleRegister}>
                            Register
                        </button> :
                        <button
                            disabled={true}
                            type="submit"

                            style={styles.inactiveButton}>
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
        height: "115vh",
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
    passwordError: {
        color: "red",
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
        // marginTop: '2%'
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
    invalidInput: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '75%',
        borderRadius: '5px',
        fontFamily: "PlomPraeng",
        fontSize: "1rem",
        backgroundColor: "#ffe4e4",
        border: "red 2px",
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
        cursor: 'default',
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
