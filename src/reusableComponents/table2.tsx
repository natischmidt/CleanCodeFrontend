

export default function Table2() {
    return (
        <div className="table2" style={styles.tableContainer}>
            <div className="tableBody" style={styles.tableBody}>
                <h1>Employees</h1>
                <div className="tableBody2" style={styles.tableBody2}>
                    <p>Här ska en lista med alla anställda visas:</p>
                    {/*<button className="deleteButton" style={styles.deleteButton}></button>*/}
                </div>
            </div>
        </div>
    )
}

// const BookingList = ({ bookings, onDeleteBooking }) => {
//     return (
//         <div>
//             <h1>Bookings</h1>
//             <ul>
//                 {bookings.map((bookings, index) => {
//                     <li key={index}>
//                         {bookings.name} - {bookings.data}{" "}
//                         <button onClick={() => onDeleteBooking(index)}>Remove</button>
//                     </li>
//                 })}
//             </ul>
//         </div>
//     )
// }

const styles = {
    tableContainer: {
        height: '100vh',
        width: '100vw',
        backgroundColor: '#E2FFF8',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    tableBody: {
        position: 'relative',
        width: '620px',
        height: '1000px',
        backgroundColor: '#a1decc',
        borderRadius: '10px',
    },
    tableBody2: {
        width: '540px',
        height: '835px',
        backgroundColor: '#e7fff7',
        borderRadius: '10px',
        marginLeft: '40px',
    },
    // deleteButton: {
    //     margin: '10px',
    //     padding: '20px 30px',
    //     backgroundColor: 'red',
    //     color: 'black',
    //     border: 'none',
    //     borderRadius: '5px',
    //     cursor: 'pointer',
    // }
}