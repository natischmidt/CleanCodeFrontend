import React, {useEffect, useState} from "react";
import axios from "axios";
import TableJobId from "./TableJobId";
import customer from "../../API/customer";
import "../../styles/CustomerComingJobsTable.css"

interface CustomerComingJobsTableProps {
    cusId: string | null;
    change: number
    setChange: React.Dispatch<React.SetStateAction<number>>
}

const CustomerComingJobsTable: React.FC<CustomerComingJobsTableProps> = ({cusId, change, setChange}) => {

    const [theData, setTheData] = useState([])
    const [filter, setFilter] = useState('');

    // @ts-ignore
    const filteredCustomerData = theData.filter((customer) => {
        const {jobtype} = customer;
        return (filter === '' || jobtype === filter);
    })

    useEffect(() => {
        customer.fetchJobsForCustomer(cusId, ["PENDING"]).then(r => {
            setTheData(r)
        })
    }, [change]);

    const handleCancel = async (jobId: number, date: Date) => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
            };
            const updateJobDTO = {
                jobId: jobId,
                jobStatus: "CANCELLED",
                customerId: cusId,
                date: "2023-11-24"
            }

            await axios.put("http://localhost:8080/api/jobs/updateJob", updateJobDTO, {headers: headers})
            setChange(x => x + 1)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            {filteredCustomerData && filteredCustomerData.length > 0 ? (
                    <>
                        <div className="filter">
                            Filter by jobtype
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                style={{marginLeft: '0.5rem'}}
                            >
                                <option value="">All</option>
                                <option value="BASIC">BASIC</option>
                                <option value="ADVANCED">ADVANCED</option>
                                <option value="DIAMOND">DIAMOND</option>
                                <option value="WINDOW">WINDOW</option>
                            </select>
                        </div>
                        <TableJobId
                            columns={[
                                {key: 'jobId', title: 'Job ID'},
                                {key: 'jobtype', title: 'Job Type'},
                                {key: 'date', title: 'Date'},
                                {key: 'timeSlot', title: 'Time Slot'},
                                {key: 'jobStatus', title: 'Job Status'},
                                {key: 'squareMeters', title: 'Square Meters'},
                            ]}
                            data={filteredCustomerData}
                            buttons={[
                                {
                                    label: 'Cancel', action: (jobId, date) => {
                                        handleCancel(jobId, date)
                                    }, style: styles.cancel
                                },
                            ]}
                        />
                    </>)
                : (
                    <div>
                        <p>
                            No upcoming bookings!
                        </p>
                    </div>
                )}

        </div>
    )
}
export default CustomerComingJobsTable

const styles = {
    cancel: {
        backgroundColor: "#f83f3f",
    },
}
