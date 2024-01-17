import styles from "styles/Navigation.module.css";
import Logo from 'media/HolderLogo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation(props) {

    const [gameMenuOpen, setGameMenuOpen] = useState(false);
    const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
    const [contactMenuOpen, setContactMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    // called when the mouse enters any menu
    const handleMouseEnter = (event, setMenuFunc) => {
        setMenuFunc(true);
        const { top, left, height } = event.currentTarget.getBoundingClientRect();
        setMenuPosition({ top: top + height, left: left });
    };

    // called when the mouse leaves any menu
    const handleMouseLeave = (setMenuFunc) => {
        setMenuFunc(false);
    };

    var liStyle = {
        display: gameMenuOpen ? 'block' : 'none',
        position: "absolute",
        top: menuPosition.top + 5,
        left: menuPosition.left,
        backgroundColor: "black",
        listStyleType: "none",
        padding: "5px",
        fontSize: "16px",
        border: "solid 1px rgb(50,50,50)"
    };

    return (
        <div className={styles["navigation-container"]}>
            <Link to="/">
                <div className={styles["brand-logo"]} />
            </Link>

            <ul className={styles["navigation-links-container"]}>
                <li className={styles["navigation-link-item"]} onMouseEnter={(e) => { handleMouseEnter(e, setGameMenuOpen) }} onMouseLeave={() => { handleMouseLeave(setGameMenuOpen) }}>
                    Games
                    <ul style={liStyle}>
                        <li className={styles["navigation-link-item"]}>
                            <Link onClick={() => { handleMouseLeave(setGameMenuOpen) }} className={styles["link-dropdown"]} to="/warofbeing">
                                War of Being
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className={styles["navigation-link-item"]} onMouseEnter={(e) => { handleMouseEnter(e, setAboutMenuOpen) }} onMouseLeave={() => { handleMouseLeave(setAboutMenuOpen) }}>
                    About
                </li>

                <li className={styles["navigation-link-item"]} onMouseEnter={(e) => { handleMouseEnter(e, setContactMenuOpen) }} onMouseLeave={() => { handleMouseLeave(setContactMenuOpen) }}>
                    Contact
                </li>
                
            </ul>
        </div>
    )
}