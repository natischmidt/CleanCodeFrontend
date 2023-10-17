import React from 'react';
import {useUserType} from "../components/UserTypeContext";

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

    const { userType , setUserType} = useUserType();


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
                        <button style={styles.update} onClick={() => onUpdate(item.id)}>Update</button>
                        {userType == "ADMIN" ? <button style={styles.delete} onClick={() => onDelete(item.id)}>Delete</button> : <></>}
                        {/*Här får vi rött, fast koden funkar???*/}
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
        borderRadius: "5px",
        padding: "15px",
        marginTop: "3%",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        backgroundColor : "#b3d9e3",
    },
    delete: {
        backgroundColor: "#f83f3f"
    },
    update: {
        backgroundColor: "#6e6efc",
        justifyContent: 'space-between'
    }
}
