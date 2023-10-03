import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CreateNewBooking: React.FC = () => {
    const [jobType, setJobType] = useState('');
    const [dateAndTime, setDateAndTime] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [jobStatus, setJobStatus] = useState('');
    const [squareMeters, setSquareMeters] = useState ('');
    const [payment, setPayment] = useState('');
    const [employee, setEmployee] = useState('');
    const [customer, setCustomer] = useState('')
    const [role, setRole] = useState('');

    const goBackToBooking = useNavigate();

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        try {
            const Url = 'http://localhost:8080/api/jobs/createJob/';

            const bookingData = {
                jobtype: jobType,
                date: dateAndTime,
                timeSlot: timeSlot,
                squareMeters: squareMeters,
                paymentOption: payment,
                customerId: customer
            };

            const response = await axios.post(Url, bookingData);

            console.log('Booking was created', response.data);

        } catch (error) {
            console.error('Error creating booking', error);
        }
    };
    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2>Create new Booking</h2>
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Job Type"*/}
                {/*    style={styles.input}*/}
                {/*    value={jobType}*/}
                {/*    onChange={(e) => setJobType(e.target.value)}*/}
                {/*    required*/}
                {/*/>*/}
                <select
                    value={jobType}
                    style={styles.select}
                    onChange={(e) => setJobType(e.target.value)}
                >
                    <option >Choose Cleaning Service:</option>
                    <option value="BASIC">Basic Cleaning</option>
                    <option value="ADVANCED">Advanced Cleaning</option>
                    <option value="DIAMOND">Diamond Cleaner</option>
                    <option value="WINDOW">Window Washing</option>
                </select>
                <input
                    type="text"
                    placeholder="Date and Time (Ex. 2023-10-03T10:00:00)"
                    style={styles.input}
                    value={dateAndTime}
                    onChange={(e) => setDateAndTime(e.target.value)}
                    required
                />
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Time Slot"*/}
                {/*    style={styles.input}*/}
                {/*    value={timeSlot}*/}
                {/*    onChange={(e) => setTimeSlot(e.target.value)}*/}
                {/*    required*/}
                {/*/>*/}
                <select
                    value={timeSlot}
                    style={styles.select}
                    onChange={(e) => setTimeSlot(e.target.value)}
                >
                    <option >What time of the day?</option>
                    <option value="MORNING">Morning</option>
                    <option value="NOON">Noon</option>
                    <option value="AFTERNOON">Afternoon</option>
                    <option value="EVENING">Evening</option>
                </select>
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Job Status"*/}
                {/*    style={styles.input}*/}
                {/*    value={jobStatus}*/}
                {/*    onChange={(e) => setJobStatus(e.target.value)}*/}
                {/*    required*/}
                {/*/>*/}
                {/*<select*/}
                {/*    value={role}*/}
                {/*    onChange={(e) => setRole(e.target.value)}*/}
                {/*>*/}
                {/*    <option value="Pending">Pending</option>*/}
                {/*    <option value="Done">Done</option>*/}
                {/*    <option value="Approved">Approved</option>*/}
                {/*    <option value="Unapproved">Unapproved</option>*/}
                {/*    <option value="Paid">Paid</option>*/}
                {/*</select>*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Payment"*/}
                {/*    style={styles.input}*/}
                {/*    value={jobStatus}*/}
                {/*    onChange={(e) => setJobStatus(e.target.value)}*/}
                {/*    required*/}
                {/*/>*/}
                {/*<select*/}
                {/*    value={role}*/}
                {/*    onChange={(e) => setRole(e.target.value)}*/}
                {/*>*/}
                {/*    <option value="Klarna">Klarna</option>*/}
                {/*    <option value="Cash">Cash</option>*/}
                {/*</select>*/}
                <input
                    type="text"
                    placeholder="Square Meters"
                    style={styles.input}
                    value={squareMeters}
                    onChange={(e) => setSquareMeters(e.target.value)}
                    required
                />
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Employee"*/}
                {/*    style={styles.input}*/}
                {/*    value={employee}*/}
                {/*    onChange={(e) => setEmployee(e.target.value)}*/}
                {/*    required*/}
                {/*/>*/}
                <select
                    value={payment}
                    style={styles.select}
                    onChange={(e) => setPayment(e.target.value)}
                >
                    <option >Choose payment option:</option>
                    <option value="KLARNA">Klarna</option>
                    <option value="CASH">Cash</option>
                </select>
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Payment Option"*/}
                {/*    style={styles.input}*/}
                {/*    value={payment}*/}
                {/*    onChange={(e) => setPayment(e.target.value)}*/}
                {/*    required*/}
                {/*/>*/}
                <input
                    type="number"
                    placeholder="Customer ID"
                    style={styles.input}
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    required
                />
                {/*<select*/}
                {/*    value={role}*/}
                {/*    onChange={(e) => setRole(e.target.value)}*/}
                {/*>*/}
                {/*    <option value="PrivateCustomer">Private</option>*/}
                {/*    <option value="BusinessCustomer">Business</option>*/}
                {/*</select>*/}
                <button type="submit" style={styles.button}>
                    Create new Booking
                </button>
                <button type="submit" style={styles.button} onClick={() => {{goBackToBooking(("/Booking"))}}}>
                    Go Back
                </button>
            </form>
        </div>
    );
};

export default CreateNewBooking;

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
        width: "500px",
        height: '630px',
        marginTop: '6%'
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
        backgroundColor: '#0d714a',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
    },
    select: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '80%',
        borderRadius: '5px',
    }
}