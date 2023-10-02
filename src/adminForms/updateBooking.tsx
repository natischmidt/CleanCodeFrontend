import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const UpdateBooking: React.FC = () => {
    const [jobType, setJobType] = useState('');
    const [dateAndTime, setDateAndTime] = useState('');
    const [jobStatus, setJobStatus] = useState('');
    const [squareMeters, setSquareMeters] = useState('');
    const [employee, setEmployee] = useState('');
    const [customer, setCustomer] = useState('');
    const [role, setRole] = useState('');

    const goBackToBooking = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };
    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1>Update Booking</h1>
                <input
                    type="text"
                    placeholder="Job Type"
                    style={styles.input}
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="Basic">Basic Cleaning</option>
                    <option value="Advanced">Advanced Cleaning</option>
                    <option value="Diamond">Diamond Cleaner</option>
                    <option value="Window">Window Washing</option>
                </select>
                <input
                    type="text"
                    placeholder="Date and Time"
                    style={styles.input}
                    value={dateAndTime}
                    onChange={(e) => setDateAndTime(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Job Status"
                    style={styles.input}
                    value={jobStatus}
                    onChange={(e) => setJobStatus(e.target.value)}
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                    <option value="Approved">Approved</option>
                    <option value="Unapproved">Unapproved</option>
                    <option value="Paid">Paid</option>
                </select>
                <input
                    type="text"
                    placeholder="Payment"
                    style={styles.input}
                    value={jobStatus}
                    onChange={(e) => setJobStatus(e.target.value)}
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="Klarna">Klarna</option>
                    <option value="Cash">Cash</option>
                </select>
                <input
                    type="text"
                    placeholder="Square Meters"
                    style={styles.input}
                    value={squareMeters}
                    onChange={(e) => setSquareMeters(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Employee"
                    style={styles.input}
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Customer"
                    style={styles.input}
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="PrivateCustomer">Private</option>
                    <option value="BusinessCustomer">Business</option>
                </select>
                <button type="submit" style={styles.button}>
                    Update Booking
                </button>
                <button type="submit" style={styles.button} onClick={() => {{goBackToBooking(("/Booking"))}}}>
                    Go Back
                </button>
            </form>
        </div>
    );
};
export default UpdateBooking;

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
        height: '800px',
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
}