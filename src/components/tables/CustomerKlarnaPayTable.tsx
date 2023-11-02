import React, {useEffect, useState} from "react";
import axios from "axios";
import TableJobId from "./TableJobId";
import {useNavigate} from "react-router-dom";
import customer from "../../API/customer";

interface CustomerKlarnaPayProps {
    cusId: string | null;
    change: number
    setChange: React.Dispatch<React.SetStateAction<number>>
    showKlarna: (jobId: number) => void
}

const CustomerKlarnaPayTable: React.FC<CustomerKlarnaPayProps> =  ({cusId, change, setChange,showKlarna}) => {
    const [theData, setTheData] = useState([])
    const goToKlarna = useNavigate()
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
                    console.log("An error occurred:", error);
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
    filter: {
        textAlign: "left" as 'left',
    }
}
