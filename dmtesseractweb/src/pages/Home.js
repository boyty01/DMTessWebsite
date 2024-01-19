import styles from 'styles/Home.module.css';
import { Link } from 'react-router-dom';
import wobVideo from "media/wob_trailer_env.mp4";
import wobBanner from 'media/Wob-banner.gif';
import availableSteam from 'media/available_on_steam.png';

export default function Home() {

    return (

        <div className={styles["home-container"]}>
            <div className={styles["section-one-container"]}>
                <video className={styles["video-settings"]} autoPlay={true} muted={true} loop={true}>
                    <source src={wobVideo} type="video/mp4"/>
                </video>
            </div>

            <div className={styles["section-one-overlay-container"]}>
                <div className={styles["section-one-overlay-inner"]}>
                    <div className={styles["section-one-title"]}>In Development</div>
                    <Link className={styles["section-one-banner-container"]} to="/warofbeing">
                        <img className={styles["section-one-banner"]} src={wobBanner} />
                    </Link>
                    <div className={styles["steam-link-container"]}>
                        <a target='_blank' rel='noopener noreferrer' href="https://store.steampowered.com/app/2475790/War_Of_Being/">
                            <img className={styles["steam-link-image"]} src={availableSteam} />
                        </a>
                    </div>
                </div>
                <div className={styles["section-two-container"]}>
                    <div className={styles["section-two-inner"]}>
                        <div className={styles["section-two-title"]}>
                            Welcome to DMTesseracT
                        </div>
                        <div className={styles["section-two-body"]}>
                            We're a small Indie game studio with big ambitions and ideas. We're currently knee deep in our first full-length title "War of Being", based on the concept album by the progressive metal band TesseracT.
                            War of Being takes players through an invigorating, story-driven world where they experience the story behind the concept while experiencing the album. War of Being seeks to branch two mediums and bring
                            both music enthusiasts and gamers together for a unique experience.
                        </div>
                    </div>
                </div>
            </div>



        </div>);
}