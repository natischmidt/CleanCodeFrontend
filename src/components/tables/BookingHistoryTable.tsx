import React, {useEffect, useState} from "react";
import axios from "axios";
import TableId from "./TableId";
import admin from "../../API/admin";
import {useUserType} from "../context/UserTypeContext";

const BookingHistoryTable = () => {

    const [historyData, setHistoryData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {const formattedData = await admin.getJobByStatus();
                setHistoryData(formattedData);
                console.log(formattedData);

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

/*
    const handleDelete = (id: number | undefined) => {
        console.log(id)
    };

    const handleUpdate = (id: number | undefined) => {
        console.log(id)
    };
*/



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
