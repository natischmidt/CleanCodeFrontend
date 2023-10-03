import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "../reusableComponents/table";

export const BookingTable: React.FC = () => {
    const [bookingData, setBookingData] = useState<any[]>([]);

    useEffect(() => {

        axios.get('http://localhost:8080/api/jobs/getAllJobs')
            .then((response) => {
                setBookingData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching booking data:', error);
            });
    }, []);

    const columns = [
        { key: 'customerId', title: 'Customer ID' },
        { key: 'jobtype', title: 'Cleaning Service' },
        { key: 'timeSlot', title: 'Time Slot' },
        { key: 'squareMeters', title: 'Square Meters' },
        { key: 'paymentOption', title: 'Payment Option' },
    ];

    return (
        <div className="booking-table" style={styles.bookingTable}>
            <Table columns={columns} data={bookingData} />
        </div>
    );
};

const styles = {
    bookingTable: {
        textAlign: "left",
    },
}