import '../../App.css'
import BookingTable from "../tabels/BookingTable";
import BookingHistoryTable from "../tabels/BookingHistoryTable";
import React from "react";

const AddBookingOption = () => {

    return (
        <div style={styles.container}>
            <div style={styles.sectionTitle}>
                <p>What cleaning are you interested in?</p>
            </div>
            <div style={styles.boxContainer}>
                <div style={styles.box}>
                    <p>BASIC</p>
                </div>
                <div style={styles.box}>
                    <p>ADVANCED</p>
                </div>
                <div style={styles.box}>
                    <p>DIAMOND</p>
                </div>
                <div style={styles.box}>
                    <p>WINDOW</p>
                </div>
            </div>
        </div>
    );
};

export default AddBookingOption;

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '10%'
    },
    sectionTitle: {
        fontWeight: 'bold',
        margin: '10px',
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    box: {
        display: 'flex',
        width: '20%',
        height: '180px',
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b3d9e3',
    },
};
