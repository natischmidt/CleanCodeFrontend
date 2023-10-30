import CustomerComingJobsTable from "../tables/CustomerComingJobsTable";
import CustomerApprovalTable from "../tables/CustomerApprovalTable";
import CustomerJobHistoryTable from "../tables/CustomerJobHistoryTable";
import {useUserType} from "../context/UserTypeContext";
import {useState} from "react";
import CustomerKlarnaPayTable from "../tables/CustomerKlarnaPayTable";
import KlarnaModalPayment from "../../klarna/KlarnaModalPayment";

const CustomerJobCheck = () => {

    const { id } = useUserType();
    const [change, setChange] = useState(0)
    const [showBasicKlarna, setShowBasicKlarna] = useState(false)
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);


    const showKlarna = (id : number) => {
        setShowBasicKlarna(true)
    }

    return (
        <div className="checkCont" style={styles.check}>
            {!showBasicKlarna ?
                <div style={styles.check}>
                <CustomerComingJobsTable cusId={id} change={change} setChange={setChange}/>
                <p style={styles.p}>Finished</p>
                <CustomerApprovalTable cusId={id} change={change} setChange={setChange}/>
                <p style={styles.p}>Ready to pay</p>
                <CustomerKlarnaPayTable cusId={id} change={change} setChange={setChange} showKlarna={ (jobId: number) => {
                    setSelectedJobId(jobId)
                    setShowBasicKlarna(true)
                }}/>
                 <p style={styles.p}>History</p>
                <CustomerJobHistoryTable cusId={id} change={change} setChange={setChange}/>
                </div>
            :
            <KlarnaModalPayment jobId={selectedJobId} />
            }



        </div>
    )
}

export default CustomerJobCheck

const styles = {
    check: {
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center" as "center",
        alignItems: "center" as "center",
    },
    p: {
        fontSize: "2rem",
        fontWeight: "bold"
    }
}
