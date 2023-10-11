import React from 'react';

const styles = {
    footer: {
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed' as 'fixed',
        bottom: 0,
        width: '100%',
    },
    category: {
        flex: 1,
        padding: '10px',
        fontWeight: 'bold',
        color: 'black',

    },
    subCategory: {
        listStyle: 'none',
        padding: 0,

    },
    link: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
    },
    logo: {
        maxWidth: '200px',
        marginRight: '50px',
    },
};

const CustomerFooter: React.FC = () => {
    return (
        <footer style={styles.footer}>
            <img src="src/assets/logo3.png" alt="Logo" style={styles.logo} />
            <div className="footer-category" style={styles.category}>
                <h3>Om oss</h3>
                <ul style={styles.subCategory}>
                    <li>
                        <a href="/AboutUs" style={styles.link}>Vilka vi är</a>
                    </li>
                    <li>
                        <a href="/Policy" style={styles.link}>Vår policy</a>
                    </li>
                </ul>
            </div>
            <div className="footer-category" style={styles.category}>
                <h3>Kontakt</h3>
                <ul style={styles.subCategory}>
                    <li>
                        <a href="/ContactUs" style={styles.link}>Maila oss</a>
                    </li>
                    <li>
                        <a href="/Instagram" style={styles.link}>Instagram</a>
                    </li>
                </ul>
            </div>
            <div className="footer-category" style={styles.category}>
                <h3>Profil</h3>
                <ul style={styles.subCategory}>
                    <li>
                        <a href="/MyPages" style={styles.link}>Mina sidor</a>
                    </li>
                    <li>
                        <a href="/Settings" style={styles.link}>Inställningar</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default CustomerFooter;
