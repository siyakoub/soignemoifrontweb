import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import {Avis, getAllAvisbyMedecin} from "../../../service_api/avis_service";
import {getUserById} from "../../../service_api/user_service";
import {Rating} from "@mui/material";

// Définir une Card personnalisée avec MUI styling
const AvisCard = styled(Card)({
    width: "100%",
});

const AvisList: React.FC<{ medecinId: string }> = ({ medecinId }) => {
    const [avisList, setAvisList] = useState<Avis[]>([]);
    
    useEffect(() => {
        const fetchAvis = async () => {
            try {
                const avisData = await getAllAvisbyMedecin(Number(medecinId));
                setAvisList(avisData);
            } catch (error) {
                console.error("Erreur lors de la récupération des avis :", error);
                // Gérer les erreurs ici
            }
        };

        fetchAvis();
    }, [medecinId]);

    return (
        <div style={{ display: "flex", flexDirection: "column", maxHeight: "100vh", alignItems: "center", overflowY: "auto", width: "100%", marginTop: "80px" }}>
            <h1>Mes Avis Client</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",
                alignItems: "center", width: "90%" }}>
                {avisList.map((avis, index) => (
                    <AvisCard key={index}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                <Rating
                                    name="avis"
                                    value={avis.note}
                                />
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {avis.libelle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {avis.descriptionAvis}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Date: {new Date(avis.dateAvis).toLocaleDateString()}
                            </Typography>
                            {/* Afficher d'autres informations de l'avis ici */}
                        </CardContent>
                    </AvisCard>
                ))}
            </div>
        </div>
    );
};

export default AvisList;
