import React, {useEffect, useState} from 'react';
import axios from "axios";
interface editEmployeeProps {
    cusId: number | null;
    doneWithEdit: () => void;
}
const EditCustomerForm: React.FC<editEmployeeProps> = ({ cusId, doneWithEdit }) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] =  useState('')
    const [orgNr, setOrgNr] = useState('');
    const [compName, setCompName] = useState  ("");
    const [cusType, setCusType] = useState("")
    const [password, setPassword] = useState('');

    useEffect(() => {
        const preFillForm = async () => {
            const url = `http://localhost:8080/api/customer/${cusId}`;
            const response = await axios.get(url)

            const data = response.data

            setFirstname(data.firstName)
            setLastname(data.lastName)
            setEmail(data.email)
            setPhoneNumber(data.phoneNumber)
            setAddress(data.address)
            setCity(data.city)
            setPostalCode(data.postalCode)
            setCompName(data.companyName || "")
            setOrgNr(data.orgNumber || "")
            setCusType(data.customerType)
            setPassword(data.password|| "")
            // || "" för att det inte ska va null/undefined o slippa lång utahelvete röd text i consolen
        }
        preFillForm();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8080/api/customer/update/${cusId}`;



            const editCustomerData = {
                firstName: firstname,
                lastName: lastname,
                password: password,
                email: email,
                phoneNumber: phonenumber,
                address: address,
                city: city,
                postalCode: postalCode,
                companyName: compName,
                orgNumber: orgNr,
                customerType: cusType
            };

            setFirstname('')
            setLastname('')
            setEmail('')
            setPhoneNumber('')
            setAddress('')
            setCity('')
            setPostalCode('')
            setCompName('')
            setOrgNr('')
            setCusType('')
            setPassword('')

            const response = await axios.patch(url, editCustomerData);
            console.log('Employee was updated', response.data);
            doneWithEdit();
        } catch (error) {
            console.error('Error updating employee', error);
        }
    };
    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2>Edit Customer</h2>
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
                    placeholder="Company name"
                    style={styles.input}
                    value={compName}
                    onChange={(e) => setCompName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Organisation number"
                    style={styles.input}
                    value={orgNr}
                    onChange={(e) => setOrgNr(e.target.value)}
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
                    placeholder="Password, låt va tills vidare"
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    //required
                />
                <button type="submit" style={styles.button}>
                    Update Employee
                </button>
                <button type="button" style={styles.button} onClick={doneWithEdit} >
                    Go Back
                </button>
            </form>
        </div>
    );
};

export default EditCustomerForm;

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
        // height: '760px',
        marginTop: '2%',
        marginBottom: "2%"
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
        width: "200px"
    },
}
