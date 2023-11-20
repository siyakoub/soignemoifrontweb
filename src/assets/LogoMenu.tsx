import React from "react";
import logo from "./logo.png";

const LogoMenu: React.FC = () => {
    const imageStyle = {
        width: "50px", // Largeur souhaitée
        height: "50px",  // Hauteur automatique pour maintenir les proportions
    };

    return (
        <>
            <img src={logo} alt="Logo" style={imageStyle} />
        </>
    );
};

export default LogoMenu;
