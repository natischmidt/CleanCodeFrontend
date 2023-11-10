import React, {useEffect, useState} from 'react';
import {useUserType} from "../../context/UserTypeContext";
import employee from "../../../API/employee";


export const GDPRModal: React.FC<{ onClose: () => void }> = ({onClose}) => {

    const {id} = useUserType();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [phone, setPhone] = useState<string>("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    useEffect(() => {
        fetchData().then(r => {
        });
    }, [])

    const fetchData = async () => {
        try {
            // @ts-ignore
            const response = await employee.getCustomer(id);
            setFirstName(response.firstName);
            setLastName(response.lastName);
            setAddress(response.address)
            setCity(response.city)
            setEmail(response.email)
            setPhone(response.phoneNumber)
            setPostalCode(response.postalCode)

        } catch (error) {
            console.error('Error while trying to register a new customer', error);
        }
    }

    return (
        <div style={styles.modalContainer}>
            <div style={styles.modalInnerContainer}>
                <div style={styles.form} onSubmit={handleSubmit}>
                    <h2>GDPR</h2>
                    <p style={styles.ptext}>Your Privacy Matters to Us.

                        We value your trust, and we want to be transparent about how we collect and use your data. When
                        you interact with our website or services, we may collect and store information about you. This
                        may include personal data such as your name, email address, or other contact details.
                        <p></p>
                        We use your data for various purposes, including providing you with our products or services,
                        improving your user experience, and complying with legal requirements.
                        <p></p>
                        Rest assured, your data is treated with the utmost care and security. We have implemented
                        measures to safeguard your information and protect your privacy.
                        <p></p>
                        <p style={styles.boldText}>Data stored about you:</p>
                        <p><strong>Name:</strong> {firstName} {lastName}<br/>
                            <strong>Address:</strong> {address} <br/>
                            <strong>City:</strong> {city} <br/>
                            <strong>Email:</strong> {email} <br/>
                            <strong>Postcode:</strong> {postalCode} <br/>
                            <strong>Phone-number:</strong> {phone}
                        </p>
                        <p style={{fontWeight: 'bold'}}>If you wish to remove this data, please contact us at <a href={"mailto:StadaFintAB@gmail.com"}>StadaFintAB@gmail.com</a></p>

                    </p>
                    <button type="submit" style={styles.button} onClick={onClose}>
                        Close
                    </button>


                </div>
            </div>
        </div>
    );
};

const styles = {
    modalContainer: {
        width: "100vw",
        height: "100vh",
        zIndex: 5558,
        position: "absolute" as 'absolute',
        top: "-42em",
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
        marginTop: '4%',
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
    boldText: {
        fontWeight: 'bold'
    },
    ptext: {
        fontSize: "0.8rem",
    }
}
