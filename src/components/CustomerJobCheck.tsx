import CustomerComingJobsTable from "./tabels/CustomerComingJobsTable";
import CustomerTableOkOrNot from "./tabels/CustomerTableOkOrNot";
import CustomerJobHistoryTable from "./tabels/CustomerJobHistoryTable";
import {useUserType} from "./UserTypeContext";
import {useState} from "react";

const CustomerJobCheck = () => {

    const { id } = useUserType();
    const [change, setChange] = useState(0)

    return (
        <div className="checkCont" style={styles.check}>
            <CustomerComingJobsTable cusId={id} change={change} setChange={setChange}/>
            <p style={styles.p}>Finished Jobs</p>
            <CustomerTableOkOrNot cusId={id} change={change} setChange={setChange}/>
            <p style={styles.p}>History</p>
            <CustomerJobHistoryTable cusId={id} change={change} setChange={setChange}/>
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
