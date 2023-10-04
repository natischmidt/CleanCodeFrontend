import React from "react";

export const CalenderModal: React.FC<{ onClose: () => void }> = ({onClose}) => {

    // Create an array of numbers from 1 to 30
    const days = Array.from({ length: 30 }, (_, index) => index + 1);

// Render the table rows
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
        const row = days.slice(i, i + 7);
        rows.push(
            <tr key={i}>
                {row.map((day) => (
                    <td key={day} style={styles.cell}>
                        {day}
                    </td>
                ))}
            </tr>
        );
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Boking calender</h3>
                <table style={styles.table} className="calender-table">
                    <tbody>
                    {rows}
                    </tbody>
                </table>
                <button
                    onClick={onClose}> Close
                </button>
            </div>
        </div>
    );
};

const styles = {
    table: {
        width: '100%'
    },
    cell: {
        border: '1px solid #ccc',
        padding: '30px'
    }
};




