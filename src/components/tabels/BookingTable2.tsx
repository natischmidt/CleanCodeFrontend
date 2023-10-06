import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "../../reusableComponents/table";
interface bookingTableProps {
    onUpdate: (jobId : number) => void;
}
const BookingTable2: React.FC<bookingTableProps> = ({ onUpdate }) => {

    const [deleted, setDeleted] = useState(0);
    const [customerData, setCustomerData] = useState<any[]>([]);

    useEffect(() => {

        axios.get('http://localhost:8080/api/jobs/getAllJobs')
            .then((response) => {
                //nånting så att man ser datumet läsbart
                const formattedData = response.data.map((job: any) => {
                    const date = new Date(job.date);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    return { ...job, date: formattedDate };
                });
                setCustomerData(formattedData);
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching customer data:', error);
            });
    }, [deleted]);

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

    const handleDelete = async (jobId: number) => {

        try {
            const Url = `http://localhost:8080/api/jobs/deleteJob`;
            const headers = {
                'jobId' : jobId?.toString()
            }
            const response = await axios.delete(Url, {headers});
            console.log('Deleting job was successful', response.data);
            setDeleted(x => x +1)
        } catch (error) {
            console.error('Error deleting job', error);
        }
    };

    const handleUpdate =  (jobId: number) => {
        onUpdate(jobId);
    };

    return (
    <div className="booking-table" style={styles.bookingTable}>
        <Table
            columns={columns}
            data={customerData}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
        />;
    </div>
    )
};

export default BookingTable2

const styles = {
    bookingTable: {
        textAlign: "left" as 'left',
        display: "flex" as 'flex',
        justifyContent: "center" as 'center'
    },
}
