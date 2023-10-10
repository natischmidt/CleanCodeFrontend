import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "../../reusableComponents/table";


//denna används inte, bookingTable2 som gäller
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
        { key: 'jobId', title: 'Booking ID' },
        { key: 'jobtype', title: 'Job type' },
        { key: 'date', title: 'Date' },
        { key: 'timeSlot', title: 'Time Slot' },
        { key: 'jobStatus', title: 'Job Status' },
        { key: 'squareMeters', title: 'Sqm' },
        { key: 'paymentOption', title: 'Payment Option' },
        { key: 'customerId', title: 'Customer Id' },
    ];

    return (
        <div className="booking-table" style={styles.bookingTable}>
            <Table columns={columns} data={bookingData}  onDelete={ () => {}} onUpdate={ () => {}}/>
        </div>
    );
};

const styles = {
    bookingTable: {
        textAlign: "left" as 'left',
        display: "flex" as 'flex',
        justifyContent: "center" as 'center'
    },
}
