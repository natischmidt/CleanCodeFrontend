import Header from "../../reusableComponents/header";
import {EmployeeDashboard} from "../../components/EmployeeDashboard";
import EmployeeFooter from "./EmployeeFooter";

export default function EmployeeHomePage() {
    return (
        <>
            <Header/>
            <EmployeeDashboard/>
            EMPLOYEE PAGE
            <EmployeeFooter/>
        </>
    )
}
