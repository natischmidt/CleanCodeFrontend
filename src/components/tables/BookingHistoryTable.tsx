import React, {useEffect, useState} from "react";
import TableId from "./TableId";
import admin from "../../API/admin";

const BookingHistoryTable = () => {

    const [historyData, setHistoryData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {const formattedData = await admin.getJobByStatus();
                setHistoryData(formattedData);

            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchData().then(r => {});
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
            <TableId
                columns={columns}
                data={historyData}
                buttons={[

                ]}
            />
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
