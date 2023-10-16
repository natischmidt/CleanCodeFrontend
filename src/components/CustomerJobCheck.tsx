import CustomerComingJobsTable from "./tabels/CustomerComingJobsTable";
import CustomerTableOkOrNot from "./tabels/CustomerTableOkOrNot";
import CustomerJobHistoryTable from "./tabels/CustomerJobHistoryTable";
import {useUserType} from "./UserTypeContext";

const CustomerJobCheck = () => {


    const {  id } = useUserType();

    const cusId = id

    return (<>
        <CustomerComingJobsTable cusId={cusId} />
        <CustomerTableOkOrNot cusId={cusId}/>
        <CustomerJobHistoryTable cusId={cusId}/>
    </>)
}

export default CustomerJobCheck