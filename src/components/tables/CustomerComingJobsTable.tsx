import React, {useEffect, useState} from "react";
import axios from "axios";
import TableJobId from "./TableJobId";

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
        const fetchData = async () => {
            try {
                console.log(`Fetching data for cusId: ${cusId}`);

                const response = await axios.get(`http://localhost:8080/api/jobs/getAllJobsForCustomerWithStatus/${cusId}`, {
                    params: {
                        statuses: ["PENDING"]
                    },
                    paramsSerializer: params => { // dessa 3 rader för att det ska gå, formaterar det rätt i URLN, tar bort []
                        return `statuses=${params.statuses.join('&statuses=')}`
                    }
                });

                if (response.status === 200 || response.status === 201) {
                    setTheData(response.data)
                    console.log(response.data[0].date +  " datumettt")
                }
            } catch (error) {
                console.log("nått hände :( ", error)
            }
        };
        fetchData()
    }, [change]);

    const handleCancel = async (jobId:number, date:Date) => {
        try {
            const updateJobDTO = {
                jobId: jobId,
                jobStatus: "CANCELLED",
                customerId: cusId,
                date: "2023-11-24"
            }
            console.log("Sending JobID:" + jobId);
            console.log("!!!!!!!!!" + date )

            await axios.put("http://localhost:8080/api/jobs/updateJob", updateJobDTO)
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
