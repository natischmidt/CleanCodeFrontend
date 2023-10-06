import React, {useEffect, useState} from "react";
import axios from "axios";
import Table from "../../reusableComponents/table";

const BookingHistoryTable = () => {

    const [historyData, setHistoryData] = useState<any[]>([])

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const statuses = ['DONE', 'APPROVED', 'UNAPPROVED', 'PAID', 'CANCELLED'];
                const response = await axios.get('http://localhost:8080/api/jobs/getByStatus', {
                    params: { statuses },
                    paramsSerializer: params => {
                        return `statuses=${statuses.join('&statuses=')}`
                    }
                });

                const formattedData = response.data.map((job: { date: string | number | Date; }) => {
                    const date = new Date(job.date);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    return { ...job, date: formattedDate };
                });

                setHistoryData(formattedData);
                console.log(formattedData);

            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
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

    const handleDelete = (id: number | undefined) => {
        console.log(id)
    };

    const handleUpdate = (id: number | undefined) => {
        console.log(id)
    };

    return (
        <div className="booking-table" style={styles.bookingTable}>
            <Table
                columns={columns}
                data={historyData}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />;
        </div>
    )
}
export default BookingHistoryTable;

const styles = {
    bookingTable: {
        textAlign: "left" as 'left',
        display: "flex" as 'flex',
        justifyContent: "center" as 'center'
    },
}