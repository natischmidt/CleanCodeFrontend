import CustomerComingJobsTable from "../tables/CustomerComingJobsTable";
import CustomerApprovalTable from "../tables/CustomerApprovalTable";
import CustomerJobHistoryTable from "../tables/CustomerJobHistoryTable";
import {useUserType} from "../context/UserTypeContext";
import {useState} from "react";
import CustomerKlarnaPayTable from "../tables/CustomerKlarnaPayTable";
import {useNavigate} from "react-router-dom";
import CustomerUnapprovalTable from "../tables/CustomerUnapprovalTable";
import "../../styles/CustomerJobCheck.css"

const CustomerJobCheck = () => {

    const {id} = useUserType();
    const [change, setChange] = useState(0)
    const navigate = useNavigate()

    const showKlarna = (id: number) => {
        navigate(`/klarnapay/${id}`)
    }

    return (
            <div className="checkCont">
                    <div className="cont">
                        <div className="row">
                            <div style={styles.cols}>
                                <p className="ptext">Upcoming bookings</p>
                                <CustomerComingJobsTable cusId={id} change={change} setChange={setChange}/>
                            </div>
                            <div style={styles.cols}>
                                <p className="ptext">Finished bookings</p>
                                <CustomerApprovalTable cusId={id} change={change} setChange={setChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div style={styles.cols}>

                                <p className="ptext">Ready to pay</p>
                                <CustomerKlarnaPayTable cusId={id} change={change} setChange={setChange}
                                                        showKlarna={(jobId: number) => {
                                                            showKlarna(jobId)
                                                        }}/>
                            </div>
                            <div style={styles.cols}>
                                <p className="ptext">Unapproved bookings</p>
                                <CustomerUnapprovalTable cusId={id} change={change} setChange={setChange}/>
                            </div>
                            <div style={styles.cols}>
                                <p className="ptext">History</p>
                                <CustomerJobHistoryTable cusId={id} change={change} setChange={setChange}/>
                            </div>
                        </div>
                    </div>
            </div>
    )
}

export default CustomerJobCheck

const styles = {
    cols: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        width: "38rem",
        marginTop: "1%",
        borderBottom: "2px solid black",
        justifyContent: 'left',
    },
}
