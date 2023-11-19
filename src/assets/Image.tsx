import React from "react";
import logo from "./logoPlein.png";

const Image: React.FC = () => {
    const imageStyle = {
        width: "100px", // Largeur souhaitée
        height: "100px",  // Hauteur automatique pour maintenir les proportions
    };

    return (
        <>
            <img src={logo} alt="Logo" style={imageStyle} />
        </>
    );
};

export default Image;

