import React from "react";
import MyShifts from "./MyShifts";
import MyShiftHistory from "./MyShiftsHistory";
import "../../styles/ShiftDashboard.css";

const ShiftDashboard = () => {

    return (
        <div className="dashboardContainer">
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
    shiftsContainer: {
        width: '100%',
    },
    historyContainer: {
        width: '100%'
    }
};
