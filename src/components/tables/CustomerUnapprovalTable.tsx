import React, {useEffect, useState} from "react";
import axios from "axios";
import TableJobId from "./TableJobId";
import customer from "../../API/customer";

interface CustomerOkOrNotTableProps {
    cusId: string | null;
    change: number
    setChange: React.Dispatch<React.SetStateAction<number>>
}

const CustomerUnapprovalTable: React.FC<CustomerOkOrNotTableProps> = ({cusId, change, setChange}) => {

    const [theData, setTheData] = useState([])
    const [filter, setFilter] = useState('');
    // const [func, setMyFunc] = useState(null);
    // const [id, setId] = useState('');

    const filteredCustomerData = theData.filter((customer) => {
        const {jobtype} = customer;
        return (filter === '' || jobtype === filter);
    })

    useEffect(() => {
        const fetchData = async () => {
            if (cusId) {
                try {
                    const data = await customer.fetchJobsForCustomer(cusId, ["UNAPPROVED"]);
                    setTheData(data);
                } catch (error) {
                    console.log("An error occurred:", error);
                }
            }
        };
        fetchData()
    }, [change]);

    return (
        <div>
            {filteredCustomerData && filteredCustomerData.length > 0 ? (
                <>
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
                            {key: 'jobId', title: 'Job ID'},
                            {key: 'jobtype', title: 'Job Type'},
                            {key: 'date', title: 'Date'},
                            {key: 'timeSlot', title: 'Time Slot'},
                            {key: 'jobStatus', title: 'Job Status'},
                            {key: 'squareMeters', title: 'Square Meters'},
                            {key: 'rating', title: 'Rating'},
                        ]}
                        data={filteredCustomerData}
                        buttons={[

                        ]}
                    />
                </div>
                </>)
                :(
                    <div>
                        <p>
                            No bookings have been unapproved.. wow nice!
                        </p>
                    </div>
                )}
        </div>
    )
}
export default CustomerUnapprovalTable

const styles = {

    spray: {
        width: 40,
        height: 40
    },
    filter: {
        textAlign: "center" as "center",
    }
}
