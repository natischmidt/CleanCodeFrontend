import React, {useEffect, useState} from "react";
import axios from "axios";
import TableJobId from "./TableJobId";
import ThumbsDown from "../../assets/ThumbsDown.png"
import ThumbsUp from "../../assets/ThumbsUp.png"
import spray from "../../assets/spray.png"
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
    const [func, setMyFunc] = useState(null);
    const [id, setId] = useState('');

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
                    console.log("An error occurred:", error);
                }
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

    const rate = (id: number, thumb: string) => {
        handleClick();

        if (thumb === "ThumbsUp") {
            // @ts-ignore
            setMyFunc( () => handleOk)
            // @ts-ignore
            setId(id)
        } else {
            // @ts-ignore
            setMyFunc( () => handleNotOk)
            // @ts-ignore
            setId(id)
        }
    }

    return (
        <div>
            {isModalOpen && <div>
                <RateModal onClose={closeModal} func={func} id={id}/>
            </div>}

            {!isModalOpen && (
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
                            // { label: "BILD HÄR", action: (id) => {handleNotOk(id)}, style:styles.cancel },
                        ]}
                    />
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
        textAlign: "left" as 'left',
    }
}
