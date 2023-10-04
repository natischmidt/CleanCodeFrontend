import React from 'react';

interface Column {
    key: string;
    title: string;
}

interface Props {
    columns: Column[];
    data: any[];
    onDelete: (id: number) => void;
    onUpdate: (id: number) => void;
}

const Table: React.FC<Props> = ({ columns, data , onDelete, onUpdate}) => {

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
                        <button onClick={() => onUpdate(item.id)}>Update</button>
                        <button onClick={() => onDelete(item.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;

const styles = {
    dataTable: {
        // marginLeft: "23%",
        backgroundColor: "#a1decc",
        borderRadius: "5px",
        padding: "15px",
        marginTop: "3%"
    }
}