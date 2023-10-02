import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddEmployeeForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [ss, setSs] = useState('');
    const [salary, setSalary] = useState <number> (0);
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [orgNr, setOrgNr] = useState('');
    const [role, setRole] = useState('');

    const goBackToAddUser = useNavigate();


    const adminCreateEmp = async (
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        ss: string,
        phonenumber: string,
        address: string,
        salary: number,
        role: any,
    ) => {
        try {
            const Url = 'http://localhost:8080/api/employee/createEmployee';

            const employeeData = {
                firstname,
                lastname,
                ss,
                email,
                phonenumber,
                address,
                password,
                salary,
                role,
            };

            const response = await axios.post(Url, employeeData);

            console.log('Employee was created', response.data);

        } catch (error) {
            console.error('Error creating employee', error);
        }
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();


        adminCreateEmp(
            firstname,
            lastname,
            email,
            password,
            ss,
            phonenumber,
            address,
            salary,
            role,
        );
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1>Create new Employee</h1>
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
                    placeholder="Salary"
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
                    Create new Employee
                </button>
                <button type="submit" style={styles.button} onClick={() => {{goBackToAddUser(("/AddUser"))}}}>
                    Go Back
                </button>
            </form>
        </div>
    );
};

export default AddEmployeeForm;

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: '2px solid silver',
        borderRadius: '5px',
        backgroundColor: '#53af67',
        width: "600px",
        height: '820px',
        marginTop: '120px'
    },
    input: {
        marginTop: '15px',
        marginBottom: '15px',
        padding: '15px',
        width: '75%',
        fontSize: '1.2rem',
        borderRadius: '5px',
    },
    button: {
        padding: '13px 25px',
        backgroundColor: '#0d714a',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
        fontSize: '1.2rem',
    },
    select: {
        marginTop: '25px',
        marginBottom: '15px',
        padding: '10px',
        width: '40%',
        fontSize: '1.2rem',
        textAlign: 'center',
        backgroundColor: "#ffffff",
        borderRadius: '5px',
    },
}