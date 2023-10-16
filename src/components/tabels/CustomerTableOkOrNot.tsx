import {useEffect, useState} from "react";
import axios from "axios";
import AnotherTable from "../../reusableComponents/AnotherTable";
interface CustomerOkOrNotTableProps {
    cusId: string | null;
}
const CustomerTableOkOrNot: React.FC<CustomerOkOrNotTableProps> = ({cusId}) => {

    const [theData, setTheData] = useState([])
    const [change, setChange] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/jobs/getAllJobsForCustomerWithStatus/${cusId}`, {
                    params: {
                        statuses: ["DONE"]
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

    const handleOk = async (id: number) => {
        try {
            const updateJobDTO = {
                jobId: id,
                jobStatus: 'APPROVED',
            }
            await axios.put("http://localhost:8080/api/jobs/updateJob", updateJobDTO)
            setChange(x => x + 1)
        } catch (error) {
            console.log("Tumme up did not work!?: ", error)
        }
    }
    const handleNotOk = async (id: number) => {
        try {
            const updateJobDTO = {
                jobId: id,
                jobStatus: 'UNAPPROVED',
            }
            console.log("Sending JobID:", id);

            await axios.put("http://localhost:8080/api/jobs/updateJob", updateJobDTO)
            setChange(x => x + 1)
        } catch (error) {
            console.log("Tumme ner did not work!?: ", error)
        }
    }

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
                    { label: 'Tumme upp', action: (id) => {handleOk(id)} },
                    { label: 'Tumme ner', action: (id) => {handleNotOk(id)} }
                ]}
            />

        </div>

    )
}
export default CustomerTableOkOrNot