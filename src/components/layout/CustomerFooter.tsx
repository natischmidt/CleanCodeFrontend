import React, {useState} from 'react';
import {GDPRModal} from "../customer-components/customer-modals/GDPRModal";

const styles = {
    footer: {
        backgroundColor: '#a0c1cc',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex' as 'flex',
        alignItems: 'right' as 'right',
        position: 'fixed' as 'fixed',
        width: '100%',
        height: '8rem',
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
        margin: -0,
    },
    link: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
        cursor: 'pointer'
    },
    logo: {
        height: "6.5vh",
        marginRight: '3rem',
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

    const [isGDPRModalOpen, setIsGDPRModalOpen] = useState(false);

    const handleGDPRClick = () => {
        setIsGDPRModalOpen(true)
    }

    const closeGDRPModal = () => {
        setIsGDPRModalOpen(false);
    };

    // @ts-ignore
    return (
        <footer style={styles.footer}>
            <div style={styles.bottomContainer}>
                {/*<div className="footer-category" style={styles.category}>*/}
                {/*    <ul style={styles.subCategory}>*/}
                {/*        <li>*/}
                {/*            <a href="/AboutUs" style={styles.link}>The team</a>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <a href="/Policy" style={styles.link}>Policy</a>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                <div className="footer-category" style={styles.category}>
                    <ul style={styles.subCategory}>
                        <li><a href="http://www.instagram.com/stadafint" target="_blank">
                            <img src="src/assets/insta.png" alt="Logo" style={styles.logo}/>
                        </a>
                        </li>
                        <li>
                            <img onClick={handleGDPRClick} src="src/assets/gggg.png" alt="Logo" style={styles.logo}/>
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

