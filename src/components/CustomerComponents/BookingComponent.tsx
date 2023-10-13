import React from 'react';

const styles = {
    bookingcontainer: {
    },
    shadow : {
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
    }
}


export const BookingComponent : React.FC = () => {

    return (
        <div className="book-container" style={styles.bookingcontainer}>
            <div style={styles.shadow}>
                <button className="book-here">Book</button>
            </div>
        </div>
    )

}

