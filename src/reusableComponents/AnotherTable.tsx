import React from "react";

interface ButtonConfig {
    label: string | React.ReactElement
    action: (id: number, date: Date) => void
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
const AnotherTable: React.FC<Props> = ({columns, data, buttons}) => {
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
                        <td key={column.key}>{item[column.key]}</td>
                    ))}
                    <td>
                        {buttons.map((button, buttonIndex) => (
                            <button
                                key={buttonIndex}
                                style={styles[button.label as keyof typeof styles]}
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
    )
}

export default AnotherTable

const styles = {
    dataTable: {
        // marginLeft: "23%",
        backgroundColor: "#a1decc",
        borderRadius: "5px",
        padding: "15px",
        marginTop: "3%"
    },
    delete: {
        backgroundColor: "#f83f3f"
    },
    update: {
        backgroundColor: "#6e6efc",
        justifyContent: 'space-between'
    },
    label: {
        backgroundColor: "#33f80a",

    }
}