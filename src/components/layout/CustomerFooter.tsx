import React, {useState} from 'react';
import {GDPRModal} from "../customer-components/customer-modals/GDPRModal";
import {AboutModal} from "../customer-components/customer-modals/AboutModal";

const styles = {
    footer: {
        backgroundColor: '#a0c1cc',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex' as 'flex',
        alignItems: 'right' as 'right',
        position: 'fixed' as 'fixed',
        width: '100%',
        height: '10%',
        justifyContent: 'flex-end',
    },
    category: {
        padding: '0px',
        margin: '0x',
        fontWeight: 'bold',
        color: 'black',
        marginLeft: '10px',
    },
    subCategory: {
        display: 'flex' as 'flex',
        listStyle: 'none',
        padding: 0,
        margin: -20,
    },
    link: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
        cursor: 'pointer'
    },
    logo: {
        height: "6vh",
        marginRight: '2rem',
        marginTop: '1.5rem',
        filter: 'drop-shadow(6px 2px 4px rgba(0, 0, 0, 0.3))', // Add a shadow to the image
        cursor: "pointer"
    },
    bottomContainer: {
        display: "flex" as "flex",
        flexDirection: 'row' as 'row',
    }
};

const CustomerFooter: React.FC = () => {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isGDPRModalOpen, setIsGDPRModalOpen] = useState(false);

    const handleAboutClick = () => {
        setIsAboutModalOpen(true)
    }

    const closeAboutModal = () => {
        setIsAboutModalOpen(false);
    };

    const handleGDPRClick = () => {
        setIsGDPRModalOpen(true)
    }

    const closeGDRPModal = () => {
        setIsGDPRModalOpen(false);
    };

    // @ts-ignore
    return (
        <div style={styles.footer}>
            <div style={styles.bottomContainer}>
                <div className="footer-category" style={styles.category}>
                    <ul style={styles.subCategory}>
                        <li><a href="http://www.instagram.com/stadafint" target="_blank">
                            <img src="src/assets/insta.png" alt="Logo" style={styles.logo}/>
                        </a>
                        </li>
                        <li>
                            <img onClick={handleGDPRClick} src="src/assets/gggg.png" alt="Logo" style={styles.logo}/>
                        </li>
                        <li>
                            <img onClick={handleAboutClick} src="src/assets/about.png" alt="Logo" style={styles.logo}/>
                        </li>
                    </ul>
                </div>
            </div>
            {isGDPRModalOpen && (
                <GDPRModal onClose={closeGDRPModal}/>
            )}
            {isAboutModalOpen && (
                <AboutModal onClose={closeAboutModal}/>
            )}
        </div>
    );
};

export default CustomerFooter;

