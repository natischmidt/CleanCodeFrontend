import React, {useEffect} from 'react';
import {useUserType} from "../components/UserTypeContext";
import employee from "../API/employee";

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

    const userType = useUserType().userType;

    useEffect(() => {
        console.log(userType)
    }, [])

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
                        <td key={column.key} style={styles.tableCell}>{item[column.key]}</td>
                    ))}
                    <td>
                        <div style={styles.buttonCont}>
                            <button style={styles.update} onClick={() => onUpdate(item.id)}>
                                Update
                            </button>
                            {userType === "ADMIN" ?
                                <button style={styles.delete} onClick={() => onDelete(item.id)}>
                                    Delete
                                </button> : <></> }
                            {/*Här får vi rött, fast koden funkar???*/}
                        </div>
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
        marginBottom: "3%",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        backgroundColor : "#b3d9e3",
    },
    buttonCont: {
        display: 'flex',
        paddingRight: "8px",
        alignItems: 'center',
        marginLeft: "4%",
    },
    delete: {
        display: "flex",
        backgroundColor: "#f83f3f",
        width: "5rem",
        height: "2.5rem",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        boxShadow: '0 0 5px rgba(0, 0, 0, 1)',
        marginLeft: "5%",
    },
    update: {
        display: "flex",
        backgroundColor: "#729ca8",
        width: "5rem",
        height: "2.5rem",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        boxShadow: '0 0 5px rgba(0, 0, 0, 1)',

    },
    tableCell: {
        border: '1px solid #729ca890',
        // borderRadius: "0.5rem",
    }
}
