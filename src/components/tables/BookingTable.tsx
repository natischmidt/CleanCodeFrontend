import React, {useEffect, useState} from 'react';
import TableId from "./TableId";
import admin from "../../API/admin";
import ThumbsUp from "../../assets/ThumbsUp.png";
import ThumbsDown from "../../assets/ThumbsDown.png";

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
        {key: 'jobId', title: 'Job ID'},
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
        setDeleted( x  => x +1)
    };

    const handleUpdate = (jobId: number) => {
        onUpdate(jobId);
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
                <TableId
                    columns={columns}
                    data={filteredCustomerData}
                    buttons={[
                        {label: "Update", action:(id) => {handleUpdate(id)},  style:styles.update},
                        {label: "Delete", action: (id) => {handleDelete(id)}, style:styles.delete},
                    ]}
                />
            </div>
        </>
    )
}
/*onDelete={handleDelete}
onKlarna={handleKlarna}
onUpdate={handleUpdate}*/
export default BookingTable

const styles = {
    bookingTable: {
        textAlign: "left" as 'left',
        display: "flex" as 'flex',
        justifyContent: "center" as 'center',
        marginTop: '-1.5rem',
    },
    filterContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1.5rem'
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
