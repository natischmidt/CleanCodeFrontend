import React, {useState} from 'react';
import {GDPRModal} from "../customer-components/customer-modals/GDPRModal";

const styles = {
    footer: {
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute' as 'absolute',
        bottom: 0,
        width: '99%',
    },
    category: {
        padding: '5px',
        margin: '0x',
        fontWeight: 'bold',
        color: 'black',
        marginLeft: '10px',

    },
    subCategory: {
        listStyle: 'none',
        padding: 10,
        margin: 10,

    },
    link: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
        cursor: 'pointer'
    },
    logo: {
        height: "10vh",
        marginRight: '5rem',
        marginTop: '2rem',
    },
    bottomContainer: {
        display: "flex" as "flex",
        flexDirection: 'row' as 'row',
        marginLeft: '40rem',
    }
};

const CustomerFooter: React.FC = () => {

    const [isGDPRModalOpen, setIsGDPRModalOpen] = useState(false);

    const handleGDPRClick = () => {
        setIsGDPRModalOpen(true)
    }

    const closeGDRPModal = () => {
        setIsGDPRModalOpen(false);
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.bottomContainer}>
                <img src="src/assets/stadaFint.png" alt="Logo" style={styles.logo}/>
                <div className="footer-category" style={styles.category}>
                    <h3 style={{ textDecoration: 'underline' }}>About us</h3>
                    <ul style={styles.subCategory}>
                        <li>
                            <a href="/AboutUs" style={styles.link}>The team</a>
                        </li>
                        <li>
                            <a href="/Policy" style={styles.link}>Policy</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-category" style={styles.category}>
                    <h3 style={{ textDecoration: 'underline' }}>Contact</h3>
                    <ul style={styles.subCategory}>
                        <li>
                            <a href="mailto:StadaFintAB@gmail.com" style={styles.link}>Mail us</a>
                        </li>
                        <li>
                            <a href="http://www.instagram.com/stadafint" target="_blank" rel="noopener noreferrer"

                                style={styles.link}>Instagram</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-category" style={styles.category}>
                    <h3 style={{ textDecoration: 'underline' }}>Settings</h3>
                    <ul style={styles.subCategory}>
                        <li>
                            <a style={styles.link} onClick={handleGDPRClick}>GDPR</a>
                        </li>
                        <li>
                            <a href="/Settings" style={styles.link}>Settings</a>
                        </li>
                    </ul>
                </div>
            </div>

            {isGDPRModalOpen && (
                <GDPRModal onClose={closeGDRPModal}/>
            )}
        </footer>
    );
};


export default CustomerFooter;

