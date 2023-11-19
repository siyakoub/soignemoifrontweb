import React from "react";

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} SoigneMoi</p>
            </div>
        </footer>
    )
}

export default Footer;
