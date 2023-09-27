import React from 'react';

export default function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-logo">
                <img src="" alt="Logo" />
            </div>
            <div className="footer-social-icons">
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
            <div className="footer-categories">
                <div className="footer-category">
                    <h3>Om oss</h3>
                    <ul>
                        <li> 1</li>
                        <li> 2</li>
                        <li> 3</li>
                    </ul>
                </div>
                <div className="footer-category">
                    <h3>Kontakt</h3>
                    <ul>
                        <li>FAQ</li>
                        <li> </li>
                        <li> </li>
                    </ul>
                </div>
                <div className="footer-category">
                    <h3>Profil</h3>
                    <ul>
                        <li>Mina sidor</li>
                        <li> 2</li>
                        <li> 3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
