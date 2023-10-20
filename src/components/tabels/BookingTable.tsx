import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from "../../reusableComponents/table";
import admin from "../../API/admin";

interface bookingTableProps {
    onUpdate: (jobId: number) => void;
}

const BookingTable: React.FC<bookingTableProps> = ({onUpdate}) => {

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
        {key: 'jobId', title: 'Booking ID'},
        {key: 'jobtype', title: 'Job type'},
        {key: 'date', title: 'Date'},
        {key: 'timeSlot', title: 'Time'},
        {key: 'jobStatus', title: 'Status'},
        {key: 'squareMeters', title: 'Sqm'},
        {key: 'paymentOption', title: 'Payment Option'},
        // {key: 'customerId', title: 'Customer Id'},
    ];

    const handleDelete = async (jobId: number) => {

        try {
            const Url = `http://localhost:8080/api/jobs/deleteJob`;
            const headers = {
                'jobId': jobId?.toString()
            }
            const response = await axios.delete(Url, {headers});
            console.log('Deleting job was successful', response.data);
            setDeleted(x => x + 1)
        } catch (error) {
            console.error('Error deleting job', error);
        }
    };

    const handleUpdate = (jobId: number) => {
        onUpdate(jobId);
    };

    return (
        <div className="booking-table" style={styles.bookingTable}>
            <Table
                columns={columns}
                data={customerData}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
        </div>
    )
};

export default BookingTable

const styles = {
    bookingTable: {
        textAlign: "left" as 'left',
        display: "flex" as 'flex',
        justifyContent: "center" as 'center'
    },
}
