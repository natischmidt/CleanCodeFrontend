import React, {useEffect, useState} from "react";
import TableJobId from "./TableJobId";
import {useNavigate} from "react-router-dom";
import customer from "../../API/customer";

interface CustomerKlarnaPayProps {
    cusId: string | null;
    change: number
    setChange: React.Dispatch<React.SetStateAction<number>>
    showKlarna: (jobId: number) => void
}

const CustomerKlarnaPayTable: React.FC<CustomerKlarnaPayProps> =
    ({cusId, change, setChange,showKlarna}) => {
    const [theData, setTheData] = useState([])
    const [filter, setFilter] = useState('');

    // @ts-ignore
    const filteredCustomerData = theData.filter((customer) => {
        const {jobtype} = customer;
        return (filter === '' || jobtype === filter);
    })

    useEffect(() => {
        const fetchData = async () => {
            if (cusId){
                try {
                    const data = await customer.fetchJobsForCustomer(cusId, ["PROCESSING"]);
                    setTheData(data);
                } catch (error) {
                    console.error(error)
                }
            }

        };

        fetchData()
    }, [change]);

    const handleKlarna = async (id : number) =>  {
        showKlarna(id)
    }

    return (
        <div>
            {filteredCustomerData && filteredCustomerData.length > 0 ? (
                <>
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
                            { key: 'rating', title: 'Rating' },
                        ]}
                        data={filteredCustomerData}
                        buttons={[
                            { label: "Klarna" , action: (id) => {handleKlarna(id)}, style:styles.klarna},
                        ]}
                    />
                </>)
            :(
            <div>
                <p>
                    No bookings that are ready for payment!
                </p>
            </div>
            )}

        </div>
            )
}

export default CustomerKlarnaPayTable;

const styles = {
    klarna: {
        backgroundColor: "#fdbed0",
    },
    filter: {
        textAlign: "center" as "center",
    }
}
