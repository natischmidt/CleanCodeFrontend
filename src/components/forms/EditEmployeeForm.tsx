import React, {useEffect, useState} from 'react';
import axios from "axios";

interface editEmployeeProps {
    empId?: number | null;
    doneWithEdit: () => void;
}

const EditEmployeeForm: React.FC<editEmployeeProps> = ({empId, doneWithEdit}) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [ss, setSs] = useState('');
    const [salary, setSalary] = useState<number>(0);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const preFillForm = async () => {
            const url = `http://localhost:8080/api/employee/getEmployee`
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
                'empId': empId?.toString()
            }
            const response = await axios.get(url, {headers})
            const data = response.data

            console.log(data)

            setFirstname(data.firstName)
            setLastname(data.lastName)
            setEmail(data.email)
            setPhoneNumber(data.phoneNumber)
            setSs(data.ssNumber)
            setSalary(data.salary)
            setAddress(data.address)
            setCity(data.city)
            setPostalCode(data.postalCode)
            setRole(data.role)
        }
        preFillForm();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const Url = `http://localhost:8080/api/employee/editEmployee`;

            const editEmployeeData = {
                firstName: firstname,
                lastName: lastname,
                password: password,
                ssNumber: ss,
                email: email,
                phoneNumber: phonenumber,
                address: address,
                city: city,
                postalCode: postalCode,
                role: role,
                hourlySalary: salary
            };

            console.log(editEmployeeData)

            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
                'empId': empId?.toString()
            }

            setFirstname('')
            setLastname('')
            setEmail('')
            setPhoneNumber('')
            setSs('')
            setSalary(0)
            setAddress('')
            setCity('')
            setPostalCode('')
            setPassword('')
            setRole('')

            await axios.put(Url, editEmployeeData, {headers});
            doneWithEdit();
        } catch (error) {
            console.error('Error updating employee', error);
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2>Edit Employee</h2>
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
                    type="text"
                    placeholder=" Hourly Salary"
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
                />
                <button type="submit" style={styles.button}>
                    Update Employee
                </button>
                <button type="button" style={styles.button} onClick={doneWithEdit}>
                    Go Back
                </button>
            </form>
        </div>
    );
};

export default EditEmployeeForm;

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
        marginTop: '1%',
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
        width: "200px"
    },
};
