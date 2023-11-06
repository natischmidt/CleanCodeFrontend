import React, { useState} from 'react'
import {Rating} from 'react-simple-star-rating'

// export const RateModal: React.FC<{ onClose: () => void; func1: () => void; id: number }> = ({ onClose, func1, id }) => {
export const RateModal: React.FC<{ onClose: () => void; func1: (id: number, rating: number) => void; id: number }> = ({ onClose, func1, id }) => {

    const [rating, setRating] = useState(null)

    // Catch Rating value
    const handleRating = (rate: number) => {
        // @ts-ignore
        setRating(rate)
        // other logic
    }
    // Optinal callback functions
    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value: number, index: number) => console.log(value, index)

    // @ts-ignore
    return (
        <div className='App' style={styles.modalContainer}>
            <div style={styles.rateContainer}>
                <h3>Rate your cleaning!</h3>
                <Rating
                    onClick={handleRating}
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    onPointerMove={onPointerMove}
                />
                <div style={styles.buttons}>

                    <button type="submit" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" onClick={() => {
                        // @ts-ignore
                        func1(id, 0);
                        onClose();
                    }}
                    >
                        Dont rate
                    </button>
                    <button type="submit" onClick={() => {
                        // @ts-ignore
                        func1(id, rating);
                        onClose();
                        console.log("YOU RATED: " + rating);
                    }}
                    >
                        Rate
                    </button>
                </div>
            </div>
        </div>
    )
};

const styles = {
    modalContainer: {
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        position: "absolute" as 'absolute',
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: 'flex',
        justifyContent: "center" as 'center',
        alignItems: "center" as 'center',
    },
    rateContainer: {
        backgroundColor: "#427a8a",
        border: "1px solid grey",
        boxShadow: '0 0 5px rgba(0, 0, 0, 1)',
    },
    buttons: {
        display: "flex",
        gap: "2rem",
        marginTop: "1rem",
        padding: "1rem",
        height: "2rem",
    },
}

