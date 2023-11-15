import React, {useEffect, useState} from "react";
import axios from "axios";
import TableJobId from "./TableJobId";
import customer from "../../API/customer";

interface CustomerComingJobsHistoryTableProps {
    cusId: string | null;
    change: number
    setChange: React.Dispatch<React.SetStateAction<number>>
}

const CustomerComingJobsHistoryTable: React.FC<CustomerComingJobsHistoryTableProps> = ({cusId, change, setChange}) => {

    const [theData, setTheData] = useState([])
    const [filter, setFilter] = useState('');

    // @ts-ignore
    const filteredCustomerData = theData.filter((customer) => {
        const {jobStatus} = customer;
        return (filter === '' || jobStatus === filter);
    })

    useEffect(() => {
        customer.fetchJobsForCustomer(cusId, ["CANCELLED", "PAID" ]).then(r => {
            console.log(r)
            setTheData(r)
        })
    }, [change]);


    return (
        <div>
            <div style={styles.filter}>
                Filter by jobstatus
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{marginLeft: '0.5rem'}}
                >
                    <option value="">All</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="PAID">PAID</option>
                </select>
            </div>
            {filteredCustomerData && filteredCustomerData.length > 0 ? (
                    <>

                        <TableJobId
                            columns={[
                                { key: 'jobId', title: 'Job ID' },
                                {key: 'jobtype', title: 'Job Type'},
                                {key: 'date', title: 'Date'},
                                {key: 'timeSlot', title: 'Time Slot'},
                                {key: 'jobStatus', title: 'Job Status'},
                                {key: 'squareMeters', title: 'Square Meters'},
                                { key: 'rating', title: 'Rating' },
                            ]}
                            data={filteredCustomerData}
                            buttons={[]}
                        />
                    </>
                     ):(
                    <div>
                        <p>
                            No booking history!
                        </p>
                    </div>
    )}
        </div>
    )
}

export default CustomerComingJobsHistoryTable

const styles = {
    filter: {
        textAlign: "center" as "center",
    }
}
