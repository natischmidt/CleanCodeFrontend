import React, {useRef, useState} from 'react';
import customer from "../../../API/customer";
import {useNavigate} from "react-router-dom";
import {useUserType} from "../../context/UserTypeContext";

export const LoginModal: React.FC<{ onClose: () => void }> = ({onClose}) => {

    const email = useRef('hanna.root@ikea.se')
    const password = useRef('password')
    const goToHomePage = useNavigate();
    const {setUserType, setId, setLoggedIn} = useUserType();
    const [emailStyle, setEmailStyle] = useState(styles.input);
    const [passwordStyle, setPasswordStyle] = useState(styles.input)
    const emailRegex = new RegExp("^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|.(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    const handleLogin = async (email: string, password: string) => {
        await customer.login(email, password, setUserType, setId, goToHomePage, setLoggedIn);
    }

    const isTheFieldOk = (variable: string) => {
        switch (variable) {
            case "email": {
                if (email.current == '' || !email.current.match(emailRegex)) {
                    setEmailStyle(styles.invalidInput)
                } else {
                    setEmailStyle(styles.input)
                }
                break;
            }
            case "password": {
                if (password == null || password.current == '') {
                    setPasswordStyle(styles.invalidInput)
                } else {
                    setPasswordStyle(styles.input)
                }
            }
        }
    }

    return (
        <div style={styles.modalContainer}>
            <div style={styles.modalInnerContainer}>
                <button
                    style = {styles.button}
                    onClick={() => {
                        handleLogin("hanna.root@ikea.se", "password")
                    }}
                >temp login</button>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    <input
                        type="text"
                        placeholder="Email"
                        style={emailStyle}
                        // value={email.current}
                        onFocus={() => {
                            isTheFieldOk("email")
                        }}
                        onChange={(e) => {
                            email.current = e.target.value
                            isTheFieldOk("email")
                        }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={passwordStyle}
                        // value={password.current}
                        onFocus={() => {
                            isTheFieldOk("password")
                        }}
                        onChange={(e) => {
                            password.current = e.target.value
                            isTheFieldOk("password")
                        }}
                        required
                    />
                    <button type="submit" style={styles.button} onClick={() => handleLogin(email.current, password.current)}>
                        Login
                    </button>
                    <button type="submit" style={styles.button} onClick={onClose}>
                        Go back
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
        justifyContent: "center",
        alignItems: "center",
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
        width: "300px",
        // height: '400px',
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
    button: {
        padding: '10px 20px',
        backgroundColor: '#2b7285',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
        width: "150px"
    },

}
