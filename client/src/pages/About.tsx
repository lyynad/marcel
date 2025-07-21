import "./About.css";

import reactLogo from "../assets/react.svg";
import nestLogo from "../assets/NestJS.svg";
import mongoDBLogo from "../assets/MongoDB_Logo.svg";
import exrpressLogo from "../assets/expressJS.svg";

function About () {
    return (
        <>
            <div className="home-container">

                <div className="content-container">
                    <p className="content-title">the ultimate itch scratcher</p>
                    <div className="underline">
                        <div className="linedot"></div>
                        <div className="line"></div>
                        <div className="linedot"></div>
                    </div>
                    <div className="recommended-container">
                        
                        <div className="technologies-text">
                            The project was created with primary focus on learning and mastering the MERN stack, which includes:
                        </div>

                        <div className="technologies-block">
                            <div className="technologies-item">
                                <img src={reactLogo} className="technologies-img" alt="React logo" />
                                <span className="technologies-title">React</span>
                                <div className="rotating-border"></div>
                            </div>
                            <div className="technologies-item">                                
                                <img src={nestLogo} className="technologies-img" alt="Nest logo" />
                                <span className="technologies-title">Nest.js</span>
                            </div>
                            <div className="technologies-item">
                                <img src={mongoDBLogo} className="technologies-img" alt="MongoDB logo" />
                                <span className="technologies-title">MongoDB</span>
                            </div>
                            <div className="technologies-item">
                                <img src={exrpressLogo} className="technologies-img" alt="Express logo" />
                                <span className="technologies-title">Express.js</span>
                            </div>
                        </div>

                        <div className="technologies-starred-text">
                            * design was freestyled on the go :)
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default About;