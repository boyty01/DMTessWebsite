import styles from 'styles/warofbeing.module.css';
import wobMainBanner from 'media/Wob-banner.gif';

export default function WarOfBeing(props) {


    return (
        <div className={styles["main-container"]}>
            <div className={styles["background-static"]}/>
            <div className={styles["main-container-inner"]}>

                <div className={styles["game-synopsis-container"]}>
                    <div className={styles["game-title"]}>
                       
                    </div>
                    <a target='_blank' rel='noopener noreferrer' href="https://store.steampowered.com/app/2475790/War_Of_Being/">
                        <img className={styles["category-image"]} src={wobMainBanner}/>
                    </a>
                    <div className={styles["synopsis-body"]}>
                         
                        War of Being is a single-player VR sci-fi adventure with standard desktop playability, based on the music and concept for TesseracT's 2023 full length album of the same name. Explore ‘The Strangeland’ filled with surreal landscapes and characters, solve puzzles, find hidden objects and fight for survival as you uncover the secrets of the land’s many inhabitants.
                        War Of Being can best be described as an indie, first-person RPG with elements of sci-fi fantasy, horror & puzzle solving.
                        <p/>
                        Since the release of our Early Access Steam build, we’ve been hard at work moving the game to Unreal Engine 5.3 and have begun to develop concepts, music and gameplay elements for the full game.
                        <p/>
                        <span className={`${styles["info-header"]} ${styles["text-blue"]}`}>E X P E R I E N C E</span>
                        <p/>
                        War Of Being is a single-player sci-fi Virtual Reality adventure game also playable in standard mode, created and developed by members of the award winning progressive metal band 'TesseracT'. Enter into the surreal nature of 'The Strangeland' discovering characters from War Of Being, surviving enemies, solving puzzles and collecting items that reveal the band's new music. 
                        <p/>
                        <span className={`${styles["info-header"]} ${styles["text-blue"]}`}>E X P L O R E</span>
                        <p/>
                        <span className={`${styles["inline-bold"]}`} >Immersive Experience:</span> Realistic graphics and a bespoke soundtrack ensure a totally immersive Unreal Engine 5 experience.
                        <br/>
                        <span className={styles["inline-bold"]}>Locations:</span> Explore the many surreal and highly stylised environments each with their hiding spots and detailed surroundings.
                        <br/>
                        <span className={styles["inline-bold"]}>Play Alone:</span> Specifically single-player for an isolated experience.
                        <p/>
                        <span className={`${styles["info-header"]} ${styles["text-blue"]}`}>D I S C O V E R</span>
                        <p/>
                        <span className={styles["inline-bold"]}>Listen:</span> Prepare to dive head first into the bands full album and embrace the games bespoke soundtrack in a way like no other.
                        <br/>
                        <span className={styles["inline-bold"]}>Narrative:</span> Meet the unique characters behind the story and listen attentively as they reveal cryptic details about themselves.
                        <br/>
                        <span className={styles["inline-bold"]}>Puzzles:</span> Solve hidden puzzles scattered around The Strangeland to unlock music from War Of Being.
                        <br/>
                        <span className={styles["inline-bold"]}>Liberate:</span> Locate and free the obsidian statues of the five band members and discover more about each musician.
                        <br/>
                        <span className={styles["inline-bold"]}>Fight:</span> Survive Fear's Legion in hand to hand combat and by crafting essential items to aid the fight
                        <p/>
                    </div>
                    <img className={styles["category-image"]} src={""}/>
                </div>

            </div>
        </div>
    )
}