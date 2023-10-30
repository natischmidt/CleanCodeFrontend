import React, {useEffect, useState} from 'react';
import Table from "./table";
import admin from "../../API/admin";

interface bookingTableProps {
    onUpdate: (jobId: number) => void;
    onKlarna: (jobId: number) => void;
}

const BookingTable: React.FC<bookingTableProps> = ({onUpdate, onKlarna}) => {

    const [deleted, setDeleted] = useState(0);
    const [customerData, setCustomerData] = useState<any[]>([]);
    const [myFilter, setMyFilter] = useState('');

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

    const filteredCustomerData = customerData.filter((customer) =>
        (myFilter === '' || customer.jobtype === myFilter)
    )

    return (
        <>
            <div style={styles.filterContainer}>
                <div>
                    Filter by type
                    <select
                        value={myFilter}
                        onChange={(e) => setMyFilter(e.target.value)}
                        style={{marginLeft: '0.5rem'}}>
                        <option value="">All</option>
                        <option value="BASIC">Basic</option>
                        <option value="ADVANCED">Advanced</option>
                        <option value="DIAMOND">Diamond</option>
                        <option value="WINDOW">Window</option>
                    </select>
                </div>
            </div>
            <div className="booking-table" style={styles.bookingTable}>
                <Table
                    columns={columns}
                    data={filteredCustomerData}
                    onDelete={handleDelete}
                    onKlarna={handleKlarna}
                    onUpdate={handleUpdate}
                />
            </div>
        </>
    )
}

export default BookingTable

const styles = {
    bookingTable: {
        textAlign: "left" as 'left',
        display: "flex" as 'flex',
        justifyContent: "center" as 'center',
        marginTop: '-25px',
    },
    filterContainer: {
        display: 'flex',
        justifyContent: 'center',
        gridGap: '2rem',
        marginTop: '1rem'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    }
}
