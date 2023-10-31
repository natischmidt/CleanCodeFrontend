import React, {useEffect, useState} from "react";
import axios from "axios";
import TableJobId from "./TableJobId";
import {useNavigate} from "react-router-dom";
interface CustomerKlarnaPayProps {
    cusId: string | null;
    change: number
    setChange: React.Dispatch<React.SetStateAction<number>>
    showKlarna: (jobId: number) => void
}

const CustomerKlarnaPayTable: React.FC<CustomerKlarnaPayProps> =  ({cusId, change, setChange,showKlarna}) => {
    const [theData, setTheData] = useState([])
    const goToKlarna = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(`Fetching data for cusId: ${cusId}`);

                const response = await axios.get(`http://localhost:8080/api/jobs/getAllJobsForCustomerWithStatus/${cusId}`, {
                    params: {
                        statuses: ["PROCESSING"]
                    },
                    paramsSerializer: params => { // dessa 3 rader för att det ska gå, formaterar det rätt i URLN, tar bort []
                        return `statuses=${params.statuses.join('&statuses=')}`
                    }
                });

                if (response.status === 200 || response.status === 201) {
                    setTheData(response.data)
                }
            } catch (error) {
                console.log("nått hände:( asdddd", error)
            }
        };

        fetchData()
    }, [change]);

    const handleKlarna = async (id : number) =>  {
        showKlarna(id)
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
                    { label: "Klarna" , action: (id) => {handleKlarna(id)}, style:styles.klarna},
                ]}
            />

        </div>
    )
}

export default CustomerKlarnaPayTable;

const styles = {
    klarna: {
        backgroundColor: "#fdbed0",
    },

}
