import CustomerComingJobsTable from "./tabels/CustomerComingJobsTable";
import CustomerTableOkOrNot from "./tabels/CustomerTableOkOrNot";
import CustomerJobHistoryTable from "./tabels/CustomerJobHistoryTable";
import {useUserType} from "./UserTypeContext";
import {useState} from "react";

const CustomerJobCheck = () => {


    const {  id } = useUserType();
    const [change, setChange] = useState(0)


    return (<>
        <CustomerComingJobsTable cusId={id} change={change} setChange={setChange} />
        <CustomerTableOkOrNot cusId={id} change={change} setChange={setChange}/>
        <CustomerJobHistoryTable cusId={id} change={change} setChange={setChange}/>
    </>)
}

export default CustomerJobCheck