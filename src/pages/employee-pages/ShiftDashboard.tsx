import React from "react";
import MyShifts from "./MyShifts";
import MyShiftHistory from "./MyShiftsHistory";


const ShiftDashboard = () => {

    return (
        <div style={styles.dashboardContainer}>
            <div style={styles.shiftsContainer}>
                <h2>My Shifts</h2>
                <MyShifts />
            </div>

            <div style={styles.historyContainer}>
                <h2>My Shift History</h2>
                <MyShiftHistory />
            </div>
        </div>
    );
}

export default ShiftDashboard;

const styles = {
    dashboardContainer: {
        display: "flex",
        flexDirection: "column" as 'column',
        alignItems: "center" as 'center',
        justifyContent: "space-between" as 'space-between',
        width: '100%',
        padding: '20px',
    },
    shiftsContainer: {
        width: '100%',
    },
    historyContainer: {
        width: '100%'
    }
};
