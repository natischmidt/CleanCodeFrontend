import React, {useEffect, useState} from "react";
import axios from "axios";
import AnotherTable from "../../reusableComponents/AnotherTable";
interface CustomerComingJobsHistoryTableProps {
    cusId: string | null;
    change: number
    setChange: React.Dispatch<React.SetStateAction<number>>
}
const CustomerComingJobsHistoryTable: React.FC<CustomerComingJobsHistoryTableProps> = ({cusId, change, setChange }) => {

    const [theData, setTheData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(`Fetching data for cusId: ${cusId}`);

                const response = await axios.get(`http://localhost:8080/api/jobs/getAllJobsForCustomerWithStatus/${cusId}`, {
                    params: {
                        statuses: ["APPROVED", "UNAPPROVED", "PAID", "CANCELLED"]
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


    return (
        <div>
            <AnotherTable
                columns={[
                    { key: 'jobtype', title: 'Job Type' },
                    { key: 'date', title: 'Date' },
                    { key: 'timeSlot', title: 'Time Slot' },
                    { key: 'jobStatus', title: 'Job Status' },
                    { key: 'squareMeters', title: 'Square Meters' },
                ]}
                data={theData}
                buttons={[

                ]}
            />
        </div>
    )
}
export default CustomerComingJobsHistoryTable