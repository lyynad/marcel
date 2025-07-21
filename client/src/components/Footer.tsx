import "./Footer.css";

function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-item">
                <a href="https://www.github.com/lyynad" target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="footer-item-img" alt="GitHub logo" />
                    <span className="footer-item-text">lyynad</span>
                </a>
            </div>
            <div className="footer-item">
                <a href="https://www.linkedin.com/in/danil-kostenko-0b1a4b1b2/" target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" className="footer-item-img" alt="LinkedIn logo" />
                    <span className="footer-item-text">Danil Kostenko</span>
                </a>
            </div>
        </div>
    );
}

export default Footer;