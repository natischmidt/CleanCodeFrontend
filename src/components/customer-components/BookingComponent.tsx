import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSProperties } from 'react'; // Import CSSProperties

const styles: {
    bookingContainer: CSSProperties; // Define CSSProperties type
    citySelectContainer: CSSProperties;
    citySelect: CSSProperties;
    bookButton: CSSProperties;
} = {
    bookingContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        backgroundColor: "#b3d9e3",
        border: '2px solid #b3d9e3', // Add a border
    },
    citySelectContainer: {
        marginBottom: '20px',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    citySelect: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        fontSize: '1.2rem',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        backgroundColor: "#8fb4c0",
        fontFamily: "PlomPraeng",
    },
    bookButton: {
        padding: '8px 16px',
        backgroundColor: '#b3d9e3',
        color: 'black',
        border: '1px solid black',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginBottom: '16px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
};

export const BookingComponent: React.FC = () => {
    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate('/CustomerBooking');
    };

    return (
        <div className="book-container" style={styles.bookingContainer}>
            <div style={styles.citySelectContainer}>
                <label htmlFor="citySelect">Book a cleaning here!</label>
                <select id="citySelect" style={styles.citySelect}>
                    <option value="">Select a city</option>
                    <option value="Stockholm">Stockholm</option>
                    <option value="Göteborg">Göteborg</option>
                    <option value="Malmö">Malmö</option>
                    <option value="Linköping">Linköping</option>
                    <option value="Örebro">Örebro</option>
                </select>
            </div>
            <button onClick={handleBookClick} className="book-here" style={styles.bookButton}>
                Book Here
            </button>
        </div>
    );
};
