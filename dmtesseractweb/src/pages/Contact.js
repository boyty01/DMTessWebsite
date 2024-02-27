import styles from 'styles/Contact.module.css';

export default function Contact(props) {

    return (
        <div className={styles["main-container"]}>
            <div className={styles["background-static"]}></div>
            <div className={styles["main-container-inner"]}> 
                <div className={styles["contact-title"]}>
                    Company Information
                </div>
                <div className={styles["contact-body"]}>
                    Email:
                    <br/>
                    DMTesseracT@gmail.com
                    <p/> 
                    Address:
                    <br/>
                    83-89 Phoenix Street
                    <br/>
                    Sutton in Ashfield
                    <br/>
                    Nottinghamshire
                    <br/>
                    NG17 4HL
                </div>
            </div>
        </div>
    )
}