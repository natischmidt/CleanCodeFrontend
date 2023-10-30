import React, {useEffect, useState} from 'react';
import Table from "./Table";
import admin from "../../API/admin";

interface bookingTableProps {
    onUpdate: (jobId: number) => void;
    onKlarna: (jobId: number) => void;
}

const BookingTable: React.FC<bookingTableProps> = ({onUpdate, onKlarna}) => {

    const [deleted, setDeleted] = useState(0);
    const [customerData, setCustomerData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formattedData = await admin.getAllJobs()
                setCustomerData(formattedData)
            } catch (error) {
                console.error('Error fetching jobs:', error)
            }
        }
        fetchData().then(r => {
        })
    }, [deleted])

    const columns = [
        {key: 'jobId', title: 'ID'},
        {key: 'jobtype', title: 'Job type'},
        {key: 'date', title: 'Date'},
        {key: 'timeSlot', title: 'Time'},
        {key: 'jobStatus', title: 'Status'},
        // {key: 'squareMeters', title: 'Sqm'},
        // {key: 'paymentOption', title: 'Payment Option'},
        // {key: 'customerId', title: 'Customer Id'},
    ];

    const handleDelete = async (jobId: number) => {
        await admin.deleteJob(jobId);
    };

    const handleUpdate = (jobId: number) => {
        onUpdate(jobId);
    };

    const handleKlarna = (jobId: number) => {
        onKlarna(jobId);
    };

    return (
        <div className="booking-table" style={styles.bookingTable}>
            <Table
                columns={columns}
                data={customerData}
                onDelete={handleDelete}
                onKlarna={handleKlarna}
                onUpdate={handleUpdate}
            />
        </div>
    )
}

export default BookingTable

const styles = {
    bookingTable: {
        textAlign: "left" as 'left',
        display: "flex" as 'flex',
        justifyContent: "center" as 'center',
    },
}
