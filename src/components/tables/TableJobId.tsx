import React from "react";

interface ButtonConfig {
    label: string | React.ReactElement
    action: (id: number, date: Date) => void
    style?: React.CSSProperties
}
interface Column {
    key: string
    title: string
}
interface Props {
    columns: Column[]
    data: any[]
    buttons: ButtonConfig[]
}

const TableJobId: React.FC<Props> = ({columns, data, buttons}) => {
    return (
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
                                {item[column.key] === 0 ? "-" : item[column.key]}
                            </td>
                        ))}
                        <td style={styles.td}>
                            {buttons.map((button, buttonIndex) => (
                                <button
                                    key={buttonIndex}
                                    style={{...styles.btn, ...button.style}}
                                    onClick={() => button.action(item.jobId, item.date)}
                                >
                                    {button.label}
                                </button>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        /*</div>*/
    )
}

export default TableJobId

const styles = {
    td: {
        display: "flex",
        flexDirection: "row" as "row",
        margin: 2
    },
    dataTable: {
        display: "block",
        justifyContent: "space-between",
        backgroundColor: "#b3d9e3",
        borderRadius: "5px",
        padding: "15px",
        marginTop: "3%",
        width: "38rem",
    },
    delete: {
        backgroundColor: "#f83f3f"
    },
    update: {
        backgroundColor: "#8e6efc",
        justifyContent: 'space-between'
    },
    label: {
        backgroundColor: "#33f80a",
    },
    btn: {
        display: "flex",
        width: "4rem",
        height: "2rem",
        alignItems: "center" as "center",
        textAlign: "center" as "center",
        justifyContent: "center",
        boxShadow: '0 0 5px rgba(0, 0, 0, 1)',
        margin: 5
    },
    tableCell: {
        border: '1px solid #729ca890',
        margin: 33 // pls fix
        // borderRadius: "0.5rem",
    },
}
