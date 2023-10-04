import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "../reusableComponents/table";

export const BookingTable2: React.FC = () => {
    const [customerData, setCustomerData] = useState<any[]>([]);

    useEffect(() => {

        axios.get('http://localhost:8080/api/jobs/getAllJobs')
            .then((response) => {
                setCustomerData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching customer data:', error);
            });
    }, []);


    const columns = [
        { key: 'id', title: 'Booking ID' },
        { key: 'jobType', title: 'Job type' },
        { key: 'date', title: 'Date' },
        { key: 'timeSlots', title: 'Time Slot' },
        { key: 'jobStatus', title: 'Job Status' },
        { key: 'squareMeters', title: 'Square Meters' },
        { key: 'paymentOption', title: 'Payment Option' },
        { key: 'customerId', title: 'Customer Id' },
    ];

    return <Table columns={columns} data={customerData}  onDelete={ () => {}} onUpdate={ () =>{}}/>;

};
