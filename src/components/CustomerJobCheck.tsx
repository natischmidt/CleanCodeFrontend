import CustomerComingJobsTable from "./tabels/CustomerComingJobsTable";
import CustomerTableOkOrNot from "./tabels/CustomerTableOkOrNot";
import CustomerJobHistoryTable from "./tabels/CustomerJobHistoryTable";

const CustomerJobCheck = () => {

const cusId = "e7b043d9-0264-429a-8073-c5524e914c53"
    return (<>
        <CustomerComingJobsTable cusId={cusId} />
        <CustomerTableOkOrNot cusId={cusId}/>
        <CustomerJobHistoryTable cusId={cusId}/>
    </>)
}

export default CustomerJobCheck