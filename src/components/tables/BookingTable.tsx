import React, {useContext, useEffect, useState} from 'react';
import TableId from "./TableId";
import admin from "../../API/admin";
import {UserTypeContext} from "../context/UserTypeContext";
import "../../styles/BookingTable.css"

interface bookingTableProps {
    onUpdate: (jobId: number) => void;
}

const BookingTable: React.FC<bookingTableProps> = ({onUpdate}) => {
    const [deleted, setDeleted] = useState(0);
    const [customerData, setCustomerData] = useState<any[]>([]);
    const [myFilter, setMyFilter] = useState('');
    const [status, setStatus] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const userRole = useContext(UserTypeContext)
    const role = userRole?.userType

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
        {key: 'jobId', title: 'Job ID'},
        {key: 'jobtype', title: 'Job type'},
        {key: 'date', title: 'Date'},
        {key: 'timeSlot', title: 'Time'},
        {key: 'jobStatus', title: 'Status'},
        {key: 'rating', title: 'Rating'},
    ];

    const handleDelete = async (jobId: number) => {
        await admin.deleteJob(jobId);
        setDeleted(x => x + 1)
    };

    const handleUpdate = (jobId: number) => {
        onUpdate(jobId);
    };


    const filteredCustomerData = customerData.filter((customer) =>
        (myFilter === '' || customer.jobtype === myFilter) && (status === '' || customer.jobStatus === status) &&
        (customer.date.includes(searchDate) || searchDate === '')
    )
    const buttons = role === "ADMIN" ? [
        {
            label: "Update", action: handleUpdate, style: styles.update
        },
        {
            label: "Delete", action: handleDelete, style: styles.delete
        }
    ] : role === "EMPLOYEE" ? [{
        label: "Update", action: handleUpdate, style: styles.update
    }
        ] : [];
    // @ts-ignore
    return (
        <>
            <div className="filterContainer2">
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
                <div>
                    Search by date:
                    <input
                        typeof="text"
                        value={searchDate}
                        style={{width: '6rem', marginLeft: '0.5rem', height: '0.8rem'}}
                        onChange={(e) => setSearchDate(e.target.value)}/>
                </div>
                <div>
                    Filter by status
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{marginLeft: '0.5rem'}}>
                        <option value="">All</option>
                        <option value="PENDING">Pending</option>
                        <option value="DONE">Done</option>
                        <option value="APPROVED">Approved</option>
                        <option value="UNAPPROVED">Unapproved</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="PAID">Paid</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>
            <div className="booking-table" style={styles.bookingTable}>
                <TableId
                    columns={columns}
                    data={filteredCustomerData}
                    buttons={buttons}
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
        marginTop: '-1.5rem',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    delete: {
        backgroundColor: "#f83f3f",
    },
    update: {
        backgroundColor: "#729ca8",
    },
}
