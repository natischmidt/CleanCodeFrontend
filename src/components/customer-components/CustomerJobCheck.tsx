import CustomerComingJobsTable from "../tables/CustomerComingJobsTable";
import CustomerApprovalTable from "../tables/CustomerApprovalTable";
import CustomerJobHistoryTable from "../tables/CustomerJobHistoryTable";
import {useUserType} from "../context/UserTypeContext";
import {useState} from "react";
import CustomerKlarnaPayTable from "../tables/CustomerKlarnaPayTable";
import KlarnaModalPayment from "../../klarna/KlarnaModalPayment";

const CustomerJobCheck = () => {

    const {id} = useUserType();
    const [change, setChange] = useState(0)
    const [showBasicKlarna, setShowBasicKlarna] = useState(false)
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);


    const showKlarna = (id: number) => {
        setShowBasicKlarna(true)
    }
    return (
        <div className="checkCont">
            {!showBasicKlarna ?
                <div style={styles.test}>
                    <div style={styles.row}>
                        <div style={styles.cols}>
                            <p style={styles.p}>Upcoming jobs</p>
                            <CustomerComingJobsTable cusId={id} change={change} setChange={setChange}/>
                        </div>
                        <div style={styles.cols}>
                            <p style={styles.p}>Finished</p>
                            <CustomerApprovalTable cusId={id} change={change} setChange={setChange}/>
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.cols}>
                            <p style={styles.p}>Ready to pay</p>
                            <CustomerKlarnaPayTable cusId={id} change={change} setChange={setChange}
                                                    showKlarna={(jobId: number) => {
                                                        setSelectedJobId(jobId)
                                                        setShowBasicKlarna(true)
                                                    }}/>
                        </div>
                        <div style={styles.cols}>
                            <p style={styles.p}>History</p>
                            <CustomerJobHistoryTable cusId={id} change={change} setChange={setChange}/>

                        </div>
                    </div>
                </div>
                :
                <KlarnaModalPayment jobId={selectedJobId}/>
            }
        </div>
    )
}

export default CustomerJobCheck

const styles = {
    row: {
        display: "flex" as "flex",
        flexDirection: "row" as "row",
        justifyContent: "left" as "left",
        textAlign: "center" as "center",
    },
    cols: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        width: "50rem",
    },
    p: {
        fontSize: "1.5rem",
        fontWeight: "bold" as "bold",
        textAlign: 'left' as 'left'
    },
    test: {
        marginTop: '-7rem',
    }
}
