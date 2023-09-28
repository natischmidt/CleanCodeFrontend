import React from 'react';

interface Column {
    key: string;
    title: string;
}

interface Props {
    columns: Column[];
    data: any[];
}

const Table: React.FC<Props> = ({ columns, data }) => {
    return (
        <table className="data-table">
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
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;