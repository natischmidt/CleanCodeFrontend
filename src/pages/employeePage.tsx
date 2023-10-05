import Header from "../reusableComponents/header";
import React, {useState} from "react";
import {EmployeeTable} from "../components/EmployeeTable";
import Footer from "../reusableComponents/footer";
import EditEmployeeForm from "../forms/editEmployee";


export default function EmployeePage() {

    const  [showUpdateEmployee, setShowUpdateEmployee] = useState(false)
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null)

    const handleUpdate = (empId: number) =>{
        setSelectedEmployeeId(empId);
        setShowUpdateEmployee(true);
    }
    const handleUpdateComplete = () => [
        setShowUpdateEmployee(false)
    ]

    return (
        <>
            <Header/>
            <h2>Employee Table</h2>
            { !showUpdateEmployee ? <EmployeeTable onUpdate={(empId: number) => handleUpdate(empId)} /> :
                <EditEmployeeForm  empId={selectedEmployeeId} doneWithEdit={handleUpdateComplete}/>}
            {/*<Footer/>*/}
        </>
    )
}