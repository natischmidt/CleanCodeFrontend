import React, {useEffect, useState} from "react";
import employee from "../../API/employee";
import {useUserType} from "../../components/context/UserTypeContext";
import TableId from "../../components/tables/TableId";


const MyShiftHistory = () => {
    const {id, setId} = useUserType();
    const [employeeShiftHistory, setEmployeeShiftHistory] = useState<any[]>([]);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        employee.fetchJobsForEmployeeWithStatus(id, ["APPROVED", "UNAPPROVED","PROCESSING","PAID","CANCELLED"]).then(r => {
            setEmployeeShiftHistory(r);
        });
    }, [update]);

    const columns = [
        {key: 'jobId', title: 'Booking ID'},
        {key: 'customer', title: 'Customer ID'},
        {key: 'jobtype', title: 'Job type'},
        {key: 'date', title: 'Date'},
        {key: 'timeSlot', title: 'Time'},
        {key: 'jobStatus', title: 'Job Status'},
    ];

    return (
        <div>
            {employeeShiftHistory && employeeShiftHistory.length > 0 ? (
                <>
                    <div style={styles.myShifts}>
                        <TableId
                            columns={columns}
                            data={employeeShiftHistory}
                            buttons={[]}
                        />
                    </div>
                </>
            ) :(
            <div>
                <p>
                    No bookings in the history!
                </p>
            </div>
            )}

        </div>
    );
}

export default MyShiftHistory;

const styles = {
    myShifts: {
        display: "flex",
        justifyContent: "center" as 'center',
        alignItems: "center" as 'center',
        marginTop: "-1rem"
    }
};
