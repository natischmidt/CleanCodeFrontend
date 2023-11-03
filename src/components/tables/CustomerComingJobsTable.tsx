import React, {useEffect, useState} from "react";
import axios from "axios";
import TableJobId from "./TableJobId";
import ConvertTimeSlotToNiceTime from "../layout/ConvertTimeSlotToNiceTime";
import customer from "../../API/customer";

interface CustomerComingJobsTableProps {
    cusId: string | null;
    change: number
    setChange: React.Dispatch<React.SetStateAction<number>>
}
const CustomerComingJobsTable: React.FC<CustomerComingJobsTableProps> = ({cusId, change, setChange}) => {

    const [theData, setTheData] = useState([])
   // const [theDate, setTheDate] = useState<string>("")
    const [filter, setFilter] = useState('');

    // @ts-ignore
    const filteredCustomerData = theData.filter((customer) => {
        const {jobtype} = customer;
        return (filter === '' || jobtype === filter);
    })

    useEffect(() => {
        customer.fetchJobsForCustomer(cusId, ["PENDING"]).then(r => {
            console.log(r)
            setTheData(r)
        })
    }, [change]);

    const handleCancel = async (jobId:number, date:Date) => {
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
            console.log("Sending JobID:" + jobId);
            console.log("!!!!!!!!!" + date )

            await axios.put("http://localhost:8080/api/jobs/updateJob", updateJobDTO, {headers: headers})
            setChange(x => x + 1)
        } catch (error) {
            console.log("It didn't go as planned.. : ", error)
        }
    }



    return (
        <div>
            <div style={styles.filter}>
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
                    { key: 'jobId', title: 'Job ID' },
                    { key: 'jobtype', title: 'Job Type' },
                    { key: 'date', title: 'Date' },
                    { key: 'timeSlot', title: 'Time Slot' },
                    { key: 'jobStatus', title: 'Job Status' },
                    { key: 'squareMeters', title: 'Square Meters' },
                ]}
                data={filteredCustomerData}
                buttons={[
                    { label: 'Cancel', action: (jobId, date) => {handleCancel(jobId, date)},  style:styles.cancel },
                ]}
            />
        </div>
    )
}
export default CustomerComingJobsTable

const styles = {
    cancel: {
        backgroundColor: "#f83f3f",
    },
    filter: {
        textAlign: "left" as 'left',
    }
}
