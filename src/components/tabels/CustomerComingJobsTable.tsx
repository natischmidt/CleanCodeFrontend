import React, {useEffect, useState} from "react";
import axios from "axios";
import AnotherTable from "../../reusableComponents/AnotherTable";
interface CustomerComingJobsTableProps {
    cusId: string;
}

const CustomerComingJobsTable: React.FC<CustomerComingJobsTableProps> = ({cusId}) => {

    const [theData, setTheData] = useState([])
    const [change, setChange] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/jobs/getAllJobsForCustomerWithStatus/${cusId}`, {
                    params: {
                        statuses: ["PENDING"]
                    },
                    paramsSerializer: params => { // dessa 3 rader för att det ska gå, formaterar det rätt i URLN, tar bort []
                        return `statuses=${params.statuses.join('&statuses=')}`
                    }
                });

                if (response.status === 200) {
                    setTheData(response.data)
                }
            } catch (error) {
                console.log("nått hände:( ", error)
            }
        };

        fetchData()
    }, [change]);

    const handleCancel = async (jobId:number) => {
        try {
            const updateJobDTO = {
                jobId: jobId,
                jobStatus: "CANCELLED",
            }
            console.log("Sending JobID:", jobId);

            await axios.put("http://localhost:8080/api/jobs/updateJob", updateJobDTO)
            setChange(x => x + 1)
        } catch (error) {
            console.log("It didn't go as planned.. : ", error)
        }
    }



    return (
        <div>
            <AnotherTable
                columns={[
                    { key: 'jobId', title: 'Job ID' },
                    { key: 'jobtype', title: 'Job Type' },
                    { key: 'date', title: 'Date' },
                    { key: 'timeSlot', title: 'Time Slot' },
                    { key: 'jobStatus', title: 'Job Status' },
                    { key: 'squareMeters', title: 'Square Meters' },
                ]}
                data={theData}
                buttons={[
                    { label: 'Cancel', action: (jobId) => {handleCancel(jobId)} }
                ]}
            />
        </div>
    )
}
export default CustomerComingJobsTable