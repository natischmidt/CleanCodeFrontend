import React from 'react';

export default function AdminFooter() {
    return (
        <div className="footer-container" style={styles.footer}>
            <div className="footer-logo">
            </div>

            <div className="footer-categories" style={styles.categoriesContainer}>
                <div className="footer-category" style={styles.category}>
                    <ul style={styles.subCategory}>

                    </ul>
                </div>
                <div className="footer-category" style={styles.category}>
                    <ul style={styles.subCategory}>

                    </ul>
                </div>
                <div className="footer-category" style={styles.category}>
                    <ul style={styles.subCategory}>

                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const styles = {
    footer: {
        position: 'fixed' as 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#E2FFF8',
        borderTop: '5px solid #52af66',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        maxWidth: '25vh',
    },
    socialIcon: {
        fontSize: '24px',
        margin: '0 10px',
        color: '#fff',
    },
    categoriesContainer: {
        display: 'flex',
        color: '#b3d9e3',
    },
    category: {
        flex: '1',
        margin: '0 10px',
    },
    subCategory: {
        listStyle: 'none',
        padding: '0',
    },
};
