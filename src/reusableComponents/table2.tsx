

export default function Table2() {
    return (
        <div className="table2" style={styles.tableContainer}>
            <div className="tableBody" style={styles.tableBody}>
                <h1>Historik</h1>
                <div className="tableBody2" style={styles.tableBody2}>
                    <p>Hej</p>
                </div>
            </div>
        </div>
    )
}

const styles = {
    tableContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    tableBody: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // textAlign: 'center',
        width: '600px',
        height: '1000px',
        backgroundColor: '#a1decc',
        borderRadius: '10px',
    },
    tableBody2: {
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '550px',
        height: '880px',
        backgroundColor: '#e7fff7',
        borderRadius: '10px',
        marginLeft: '22px',
    },
}