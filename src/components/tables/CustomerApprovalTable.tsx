import React, {useEffect, useState} from "react";
import axios from "axios";
import TableJobId from "./TableJobId";
import ThumbsDown from  "../../assets/ThumbsDown.png"
import ThumbsUp from "../../assets/ThumbsUp.png"
interface CustomerOkOrNotTableProps {
    cusId: string | null;
    change: number
    setChange: React.Dispatch<React.SetStateAction<number>>
}
const CustomerApprovalTable: React.FC<CustomerOkOrNotTableProps> = ({cusId, change, setChange}) => {

    const [theData, setTheData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(`Fetching data for cusId: ${cusId}`);

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
                jobStatus: 'PROCESSING',
                customerId: cusId
            }
            console.log(updateJobDTO.jobId + " ÄR DEN HÄR?")
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
                customerId: cusId
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

            <TableJobId
                columns={[
                    { key: 'jobtype', title: 'Job Type' },
                    { key: 'date', title: 'Date' },
                    { key: 'timeSlot', title: 'Time Slot' },
                    { key: 'jobStatus', title: 'Job Status' },
                    { key: 'squareMeters', title: 'Square Meters' },
                ]}
                data={theData}
                buttons={[
                    { label: <img src={ThumbsUp} alt="Thumbs Up" style={styles.thumbsBtn} />, action: (id) => {handleOk(id)} },
                    { label: <img src={ThumbsDown} alt="Thumbs Down" style={styles.thumbsBtn} />, action: (id) => {handleNotOk(id)} }

                ]}
            />

        </div>

    )
}
export default CustomerApprovalTable

const styles = {
    thumbsBtn: {
        width: 20,
        height: 20
    }
}