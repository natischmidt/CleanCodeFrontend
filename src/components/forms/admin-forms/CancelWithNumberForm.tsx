import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const CancelWithNumberForm: React.FC = () => {
    const [bookingId, setBookingId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const goBackToBooking = useNavigate();

    // const goToCancelBooking = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };
    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1>Cancel Booking</h1>
                <input
                    type="text"
                    placeholder="Booking Id"
                    style={styles.input}
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Employee Id"
                    style={styles.input}
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Customer Id"
                    style={styles.input}
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                />

                <button type="submit" style={styles.button}>
                    Cancel Booking
                </button>

                {/*<button type="submit" style={styles.button} onClick={() => {{goToCancelBooking(("/CancelBooking"))}}}>*/}
                {/*    Go to Cancel Booking*/}
                {/*</button>*/}

                <button type="submit" style={styles.button} onClick={() => {{goBackToBooking(("/Booking"))}}}>
                    Go back
                </button>
            </form>
        </div>
    );
};
export default CancelWithNumberForm;

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
        backgroundColor: '#2b7285',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
        fontSize: '1.2rem',
    },
}
