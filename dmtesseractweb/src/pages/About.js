import styles from 'styles/About.module.css';
import teamBanner from 'media/TheTeam.png';
import tessLabyrinth from 'media/Tess-Lab-Logo.gif';
import profileDan from 'media/ProfilePic_Dan.jpg';
import profileAdam from 'media/ProfilePic_Adam.jpeg';

export default function About(props) {
    
    return (
        <div className={styles["main-container"]}>
            <div className={styles["background-static"]}></div>
            <div className={styles["main-container-inner"]}>
                <div className={styles["brand-section"]}>
                    <div className={styles["brand-section-title"]}>
                        About the company 
                    </div>
                    <div className={styles["brand-section-body"]}>
                    A new startup game studio, lead by TesseracT front-man Daniel Tompkins, DMTesseracT was created to bridge the gap between Music and Gaming industries with innovative and 
                    unique game experiences. Starting with their first title War of Being, based on TesseracT's latest concept album. The DMTesseracT team are currently developing the full title after
                    a wildly successful Kickstarter campaign, following the release of the early-access demo.  With ambitious plans for the future, the team are excited and eager to carve their names in the 
                    industry and build lasting relationships with their community.
                    </div>
                </div>
                <div className={styles["team-section"]}>
                    <img className={styles["team-section-banner"]} src={teamBanner}/>

                    <div className={styles["team-info-container"]}>
                        <div className={styles["team-pic-container"]}>
                            <img className={styles["team-profile-pic"]} src={profileDan}/> 
                        </div>
                        <div className={styles["team-info-title"]}>
                        Daniel Tompkins - Lead Game and Level Designer, Sound Design and Project Management. 
                        <br/>Nottinghamshire, UK 
                        <p/>
                        <div className={styles["team-info-body"]}>
                            "My personal experience in game design has rocketed over the past year with my time in Unreal Engine 5. My main roles in this project have spanned designing the game's look and layout, including lighting and audio design. I have also recorded elements of the games' narrative. Within the Early Access I created the voice of Fear, The Scribe and Ex and El as well as creating parts of the in game soundtrack. 
                            <p/>
                            As a huge gamer with graphic and sound design experience and as someone that appreciates great looking games, I'm over the moon to be directing and producing the game as well as lending my voice to the narrative."
                        </div>
                        </div>
                    </div>

                    <div className={styles["team-info-container"]}>
                        <div className={styles["team-pic-container"]}>
                            <img className={styles["team-profile-pic"]} src={profileAdam}/> 
                        </div>
                        <div className={styles["team-info-title"]}>
                        Adam Boyt - Developer and Project Management
                        <br/> Carmarthenshire, Wales, UK
                        <p/>
                        <div className={styles["team-info-body"]}>
                        "I studied Applied Computer Science at Swansea University and graduated in August 2023 with a First Class Degree with Honours. I've been working in Unreal Engine for over 10 years and my role in this project is to support Daniel and the team by creating the tools and systems required in order to build a fully developed game. I also lend myself to elements of the environment and audio design as well animating assets.
                        <p/>
                        As a fan of gaming and TesseracT this really was a project that I could not resist being a part of. We have a big vision for the game and considering how much we have all learnt and developed so far in over a years collaboration, I'm very excited for what we hope to achieve."
                         </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}