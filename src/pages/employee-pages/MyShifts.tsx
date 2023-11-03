import React, {useEffect, useRef, useState} from "react";
import employee from "../../API/employee";
import {useUserType} from "../../components/context/UserTypeContext";
import TableId from "../../components/tables/TableId";



const MyShifts = () => {

    const {id, setId} = useUserType();
    const [employeeShifts, setEmployeeShifts] = useState<any[]>([])
    const [update, setUpdate] = useState(0)
    //const update = useRef(0)
    //const [showDetails, setShowDetails] = useState(false)

    //const [jobId, setJobId] = useState(0)

    const handleDone = async (jobId: number) => {
        try {
            const r = await employee.getJob(jobId);
            const dataToSend = {
                jobId: r.jobId,
                jobtype: r.jobtype,
                date: r.date,
                jobStatus: "DONE",
                squareMeters: r.squareMeters,
                paymentOption: r.paymentOption,
                message: r.message,
                customerId: r.customerId
            };
            await employee.updateJobStatus(dataToSend);
            setUpdate(c => c + 1);
        } catch (error) {
            console.error("Det gick inte... ", error);
        }
    }



    useEffect(() => {
        employee.fetchJobsForEmployeeWithStatus(id, ["PENDING"]).then(r => {
            console.log(r)
            setEmployeeShifts(r)
        })
    }, [update])


    const columns = [
        {key: 'jobId', title: 'Booking ID'},
        {key: 'jobtype', title: 'Job type'},
        {key: 'date', title: 'Date'},
        {key: 'timeSlot', title: 'Time'},
        {key: 'jobStatus', title: 'Job Status'},
        // {key: 'squareMeters', title: 'Sqm'},
        // {key: 'paymentOption', title: 'Payment Option'},
        //{key: 'customerId', title: 'Customer Id'},
    ];

    return (
        <div style={styles.myShifts}>
            <TableId
                columns={columns}
                data={employeeShifts}
                buttons={[
                    {label: "Done", action:(jobId) => {handleDone(jobId)}, style:styles.done}
                ]}
                />
        </div>
    )
}

export default MyShifts;

const styles = {
    myShifts: {
        display: "flex",
        justifyContent: "center" as 'center',
        alignItems: "center" as 'center',
    },
    done: {
        backgroundColor: '#48de47'
    }
}