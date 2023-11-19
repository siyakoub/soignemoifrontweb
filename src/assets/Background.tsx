import React from "react";
import background from "./background.jpeg"

const Background: React.FC = () => {
    const imageStyle = {
        width: "100px", // Largeur souhaitée
        height: "100px",  // Hauteur automatique pour maintenir les proportions
    };
    return (
        <>
            <img src={background} alt="Arriere plan" style={imageStyle}/>
        </>
    )
}

export default Background;
