import HeaderComp from "../components/layout/HeaderComp";
import React, {useState} from "react";
import {EmployeeTable} from "../components/tables/EmployeeTable";
// import CustomerFooter from "../layout/footer";
import EditEmployeeForm from "../components/forms/EditEmployeeForm";


export default function EmployeePage() {

    const  [showUpdateEmployee, setShowUpdateEmployee] = useState(false)
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null)

    const handleUpdate = (empId: number) =>{
        setSelectedEmployeeId(empId);
        setShowUpdateEmployee(true);
    }
    const handleUpdateComplete = () => {
        setShowUpdateEmployee(false)
    }

    return (
        <>
            <HeaderComp/>
            <div className="h1" style={styles.h1}>
                <h1>Employees</h1>

                { !showUpdateEmployee ? <EmployeeTable onUpdate={(empId: number) => handleUpdate(empId)} /> :
                    <EditEmployeeForm  empId={selectedEmployeeId} doneWithEdit={handleUpdateComplete}/>}
                {/*<CustomerFooter/>*/}
            </div>
        </>
    )
}

const styles = {
    h1: {
        marginTop: "4%",
        justifyContent: "center" as 'center',
        textAlign: "center" as 'center'
    }
}