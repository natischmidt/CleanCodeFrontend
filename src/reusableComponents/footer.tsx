import React from 'react';

export default function Footer() {
    return (
        <div className="footer-container" style={styles.footer}>
            <div className="footer-logo">
                <img src="" alt="Logo" style={styles.logo} />
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
        // backgroundColor: '#333',
        color: '#fff',
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