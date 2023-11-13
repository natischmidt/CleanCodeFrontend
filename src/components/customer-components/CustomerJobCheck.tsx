import CustomerComingJobsTable from "../tables/CustomerComingJobsTable";
import CustomerApprovalTable from "../tables/CustomerApprovalTable";
import CustomerJobHistoryTable from "../tables/CustomerJobHistoryTable";
import {useUserType} from "../context/UserTypeContext";
import {useState} from "react";
import CustomerKlarnaPayTable from "../tables/CustomerKlarnaPayTable";
import KlarnaModalPayment from "../../klarna/KlarnaModalPayment";
import {useNavigate} from "react-router-dom";
import CustomerUnapprovalTable from "../tables/CustomerUnapprovalTable";

const CustomerJobCheck = () => {

    const {id} = useUserType();
    const [change, setChange] = useState(0)

    const navigate = useNavigate()

    const showKlarna = (id: number) => {
        navigate(`/klarnapay/${id}`)
    }

    return (
            <div className="checkCont">
                    <div style={styles.test}>
                        <div style={styles.row}>
                            <div style={styles.cols}>
                                <p style={styles.p}>Upcoming bookings</p>
                                <CustomerComingJobsTable cusId={id} change={change} setChange={setChange}/>
                            </div>
                            <div style={styles.cols}>
                                <p style={styles.p}>Finished bookings</p>
                                <CustomerApprovalTable cusId={id} change={change} setChange={setChange}/>
                            </div>


                        </div>

                        <div style={styles.row}>
                            <div style={styles.cols}>

                                <p style={styles.p}>Ready to pay</p>
                                <CustomerKlarnaPayTable cusId={id} change={change} setChange={setChange}
                                                        showKlarna={(jobId: number) => {
                                                            showKlarna(jobId)
                                                        }}/>
                            </div>
                            <div style={styles.cols}>
                                <p style={styles.p}>Unapproved bookings</p>
                                <CustomerUnapprovalTable cusId={id} change={change} setChange={setChange}/>
                            </div>
                            <div style={styles.cols}>
                                <p style={styles.p}>History</p>
                                <CustomerJobHistoryTable cusId={id} change={change} setChange={setChange}/>
                            </div>
                        </div>
                    </div>
            </div>
    )
}

export default CustomerJobCheck

const styles = {
    row: {
        display: "flex" as "flex",
        flexDirection: "column" as "column",
        justifyContent: "center" as "center",
        textAlign: "center" as "center",
    },
    cols: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        width: "38rem",
        marginTop: "1%",
        borderBottom: "2px solid black"
    },
    p: {
        alignSelf: "center" as "center",
        fontSize: "1.7rem",
        fontWeight: "bold" as "bold",
        textAlign: 'left' as 'left',
        textDecoration: "underline"
    },
    test: {
        marginTop: '-8rem',
        padding: 15,
        marginLeft: "25rem"
    }
}
