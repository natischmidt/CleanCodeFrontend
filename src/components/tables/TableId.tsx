import React from 'react';


interface ButtonConfig {
    label: string | React.ReactElement
    action: (id: number, date: Date) => void
    style?: React.CSSProperties
}
interface Column {
    key: string;
    title: string;
}

interface Props {
    columns: Column[];
    data: any[];
    buttons: ButtonConfig[]
}

const TableId: React.FC<Props> = ({ columns, data , buttons}) => {


    return (
        <div className="table-container" style={{ maxHeight: '25rem', overflowY: 'auto' }}>
        <table className="data-table" style={styles.dataTable}>
            <thead>
            <tr>
                {columns.map((column) => (
                    <th key={column.key}>{column.title}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {columns.map((column) => (
                        <td key={column.key} style={styles.tableCell}>
                            {column.key === 'rating' && item.rating === 0 ? "-" : item[column.key]}
                        </td>
                    ))}
                    <td style={styles.td}>
                        {buttons.map((button, buttonIndex) => (
                            <button
                                key={buttonIndex}
                                style={{ ...styles.btn, ...button.style }}
                                onClick={() => button.action(item.id, item.date)}
                            >
                                {button.label}
                            </button>
                        ))}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default TableId;

const styles = {
    td: {
        display: "flex",
        justifyContent: "center" as "center",
        flexDirection: "row" as "row",
        margin: 2,
    },
    dataTable: {
        borderRadius: "5px",
        padding: "15px",
        marginTop: "3%",
        // width: "38rem",
        marginBottom: "3%",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        backgroundColor : "#b3d9e3",
        textAlign: "center" as "center",
    },
    buttonCont: {
        display: 'flex',
        paddingRight: "8px",
        alignItems: 'center' as 'center',
        marginLeft: "4%",
        // width: "110%"
    },
    delete: {
        display: "flex",
        backgroundColor: "#f83f3f",
        width: "5rem",
        height: "2.5rem",
        alignItems: "center" as "center",
        textAlign: "center" as "center",
        justifyContent: "center",
        boxShadow: '0 0 5px rgba(0, 0, 0, 1)',
        marginLeft: "6%",
        marginRight: "3%"
    },
    klarna: {
        display: "flex",
        backgroundColor: "#fdbed0",
        width: "5rem",
        height: "2.5rem",
        alignItems: "center" as "center",
        textAlign: "center" as "center",
        justifyContent: "center" as "center",
        boxShadow: '0 0 5px rgba(0, 0, 0, 1)',
        marginLeft: "6%",
    },
    update: {
        display: "flex",
        backgroundColor: "#729ca8",
        width: "5rem",
        height: "2.5rem",
        alignItems: "center" as "center",
        textAlign: "center" as "center",
        justifyContent: "center" as "center",
        boxShadow: '0 0 5px rgba(0, 0, 0, 1)',
        marginLeft: "1%",
    },
    tableCell: {
        border: '1px solid #729ca890',
        margin: 33 //fix
    },
    btn: {
        display: "flex",
        width: "5rem",
        height: "2.5rem",
        alignItems: "center" as "center",
        textAlign: "center" as "center",
        justifyContent: "center",
        boxShadow: '0 0 5px rgba(0, 0, 0, 1)',
        margin: 5
    }
}
