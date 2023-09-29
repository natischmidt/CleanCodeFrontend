import React from 'react';
import logo from "../assets/logo3.png";

export default function Footer() {
    return (
        <div className="footer-container" style={styles.footer}>
            <div className="footer-logo">
                <img src="src/assets/logo3.png" alt="Logo" style={styles.logo} />
            </div>
            <div className="footer-social-icons" style={styles.socialIcon}>
                <a href="">
                    <div className="social-facebok"></div>
                </a>
                <a href="">
                    <div className="social-twitter"></div>
                </a>
                <a href="">
                    <div className="social-instagram"></div>
                </a>
            </div>
            <div className="footer-categories" style={styles.categoriesContainer}>
                <div className="footer-category" style={styles.category}>
                    <h3>Om oss</h3>
                    <ul style={styles.subCategory}>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
                <div className="footer-category" style={styles.category}>
                    <h3>Kontakt</h3>
                    <ul style={styles.subCategory}>
                        <li>FAQ</li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className="footer-category" style={styles.category}>
                    <h3>Profil</h3>
                    <ul style={styles.subCategory}>
                        <li>Mina sidor</li>
                        <li>2</li>
                        <li>3</li>
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
        maxWidth: '100px',
    },
    socialIcon: {
        fontSize: '24px',
        margin: '0 10px',
        color: '#fff',
    },
    categoriesContainer: {
        display: 'flex',
        color: '#53b067',
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