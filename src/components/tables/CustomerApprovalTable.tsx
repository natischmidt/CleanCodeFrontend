import React, {useEffect, useState} from "react";
import axios from "axios";
import TableJobId from "./TableJobId";
import ThumbsDown from "../../assets/ThumbsDown.png"
import ThumbsUp from "../../assets/ThumbsUp.png"
import customer from "../../API/customer";
// @ts-ignore
import {RateModal} from "../customer-components/customer-modals/RateModal";

interface CustomerOkOrNotTableProps {
    cusId: string | null;
    change: number
    setChange: React.Dispatch<React.SetStateAction<number>>
}

const CustomerApprovalTable: React.FC<CustomerOkOrNotTableProps> = ({cusId, change, setChange}) => {

    const [theData, setTheData] = useState([])
    const [filter, setFilter] = useState('');
    // @ts-ignore
    const [func1, setFunc1] = useState<(id: number, rating: number) => void | null>(null);
    const [id, setId] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // @ts-ignore
    const filteredCustomerData = theData.filter((customer) => {
        const {jobtype} = customer;
        return (filter === '' || jobtype === filter);
    })

    useEffect(() => {
        const fetchData = async () => {
            if (cusId) {
                try {
                    const data = await customer.fetchJobsForCustomer(cusId, ["DONE"]);
                    setTheData(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData()
    }, [change]);

    const handleOk = async (id: number, rating: number) => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
            };
            const updateJobDTO = {
                jobId: id,
                jobStatus: 'PROCESSING',
                customerId: cusId,
                rating: rating
            }
            await axios.put("http://localhost:8080/api/jobs/updateJob", updateJobDTO, {headers: headers})
            setChange(x => x + 1)
        } catch (error) {
            console.error(error)
        }
    }
    const handleNotOk = async (id: number, rating: number) => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
            };

            const updateJobDTO = {
                jobId: id,
                jobStatus: 'UNAPPROVED',
                customerId: cusId,
                rating: rating
            }

            await axios.put("http://localhost:8080/api/jobs/updateJob", updateJobDTO, {headers: headers})
            setChange(x => x + 1)
        } catch (error) {
            console.error(error)
        }
    }

    const rate = (id: number, thumb: string) => {
        handleClick();

        if (thumb === "ThumbsUp") {
            // @ts-ignore
            setFunc1(() => handleOk)
            // @ts-ignore
            setId(id)
        } else {
            // @ts-ignore
            setFunc1(() => handleNotOk)
            // @ts-ignore
            setId(id)
        }
    }

    return (
        <div>
            {isModalOpen && <div>
                <RateModal func1={func1} id={id} onClose={closeModal}/>
            </div>}

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
                        ]}
                        data={filteredCustomerData}
                        buttons={[
                            {
                                label: <img src={ThumbsUp} alt="Thumbs Up" style={styles.thumbsBtn}/>, action: (id) => {
                                    rate(id, 'ThumbsUp')
                                }
                            },
                            {
                                label: <img src={ThumbsDown} alt="Thumbs Down" style={styles.thumbsBtn}/>,
                                action: (id) => {
                                    rate(id, 'ThumbsDown')
                                }
                            }
                        ]}
                    />
                </div>
                </>)
                :(
                    <div>
                        <p>
                            No finished bookings!
                        </p>
                    </div>
                )}
        </div>
    )
}
export default CustomerApprovalTable

const styles = {
    thumbsBtn: {
        width: 25,
        height: 25
    },
    spray: {
        width: 40,
        height: 40
    },
    filter: {
        textAlign: "center" as "center",
    }
}
