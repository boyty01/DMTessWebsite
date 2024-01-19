import styles from "styles/Navigation.module.css";
import Logo from 'media/HolderLogo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation(props) {

    const [gameMenuOpen, setGameMenuOpen] = useState(false);
    const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
    const [contactMenuOpen, setContactMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

    // called when the mouse enters any menu
    const handleMouseEnter = (event, setMenuFunc) => {
        if (setMenuFunc) setMenuFunc(true);

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

    var burgerMenuStyle = {
        display: burgerMenuOpen ? 'block' : 'none',
        position: "fixed",
        top: 0,
        left: 0,
        height:"100vh",
        width:"50%",
        backgroundColor: "black",
        listStyleType: "none",
        padding: "0px",
        fontSize: "16px",
        border: "solid 1px rgb(50,50,50)"
    };

    var overlayStyle = {
        display: burgerMenuOpen ? 'block' : 'none',
        position: "fixed",
        width: burgerMenuOpen ? "80%" : "0%",
        top: 0,
        left: 0,
        height:"100vh",
        backgroundColor: "black",
        listStyleType: "none",
        padding: "0",
        fontSize: "16px",
        border: "solid 1px rgb(50,50,50)",
        transition: "0.5s"
    }

    const burgerClick = () => {
        setBurgerMenuOpen(!burgerMenuOpen);
    }

    const closeBurger = () => {
        setBurgerMenuOpen(false);
    }

    return (
        <div className={styles["navigation-container"]}>
            <Link to="/">
                <div className={styles["brand-logo"]} />
            </Link>

            <div className={styles["navigation-burger-menu"]} onClick={() => { burgerClick() }} onMouseEnter={(e) => { handleMouseEnter(e, null) }}>
                <div className={styles["burger-menu-line"]} />
                <div className={styles["burger-menu-line"]} />
                <div className={styles["burger-menu-line"]} />

                <div className={overlayStyle}>
                <ul style={burgerMenuStyle}>          
                    <li className={styles["burger-menu-link-item"]}>
                        <Link onClick={() => {closeBurger() }} className={styles["burger-menu-link"]} to="/warofbeing">
                            War of Being
                        </Link>
                        </li>
                        <li className={styles["burger-menu-link-item"]}>
                        <Link onClick={() => {closeBurger()}} className={styles["burger-menu-link"]} to="/about">
                            About Us
                        </Link>
                        </li>
                        <li className={styles["burger-menu-link-item"]}>
                        <Link onClick={() => {closeBurger()}} className={styles["burger-menu-link"]} to="/contact">
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
            </div>


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
                    <Link className={styles["link-dropdown"]} to="/about">About</Link>
                </li>

                <li className={styles["navigation-link-item"]} onMouseEnter={(e) => { handleMouseEnter(e, setContactMenuOpen) }} onMouseLeave={() => { handleMouseLeave(setContactMenuOpen) }}>
                    <Link className={styles["link-dropdown"]} to="/contact">Contact</Link>
                </li>

            </ul>




        </div>
    )
}