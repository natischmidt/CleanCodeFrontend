import React, {useEffect, useState} from "react";
import axios from "axios";
import TableJobId from "./TableJobId";

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
            <TableJobId
                columns={[
                    {key: 'jobtype', title: 'Job Type'},
                    {key: 'date', title: 'Date'},
                    {key: 'timeSlot', title: 'Time Slot'},
                    {key: 'jobStatus', title: 'Job Status'},
                    {key: 'squareMeters', title: 'Square Meters'},
                ]}
                data={filteredCustomerData}
                buttons={[]}
            />
        </div>
    )
}

export default CustomerComingJobsHistoryTable

const styles = {
    filter: {
        textAlign: "left" as 'left',
    }
}
