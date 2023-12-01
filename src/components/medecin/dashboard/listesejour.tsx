import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { getAllSejourByMedecin, Sejour } from "../../../service_api/sejour_service";

const ListSejour: React.FC<{ medecinId: string }> = ({ medecinId }) => {
    const SejourCard = styled(Card)({
        width: "100%"
    });

    const [sejours, setSejours] = useState<Sejour[]>([]);

    function convertirEnDate(dateString: string): Date {
        // Supprimer "GMT" de la chaîne de date
        const cleanedString = dateString.replace(" GMT", "");

        // Convertir en objet Date
        const date = new Date(cleanedString);

        return date;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sejoursData = await getAllSejourByMedecin(Number(medecinId));
                setSejours(sejoursData);
            } catch (error) {
                console.error("Erreur lors de la récupération des séjours:", error);
                // Gérer l'erreur ici (par exemple afficher un message d'erreur à l'utilisateur)
            }
        };

        fetchData();
    }, [medecinId]);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxHeight: "100vh", overflowY: "auto", width: "100%" , marginTop: "80px"}}>
            <h1>Mes Rendez-Vous</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",
                alignItems: "center", width: "90%" }}>
                {sejours.map((sejour) => (
                    <SejourCard key={sejour.sejour_id}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Motif: {sejour.motif}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Spécialité: {sejour.speciality}
                            </Typography>
                            {sejour.dateDebut && sejour.dateFin && (
                                <>
                                    <Typography variant="body2" color="text.secondary">
                                        Début: {convertirEnDate(sejour.dateDebut)?.toLocaleString("fr-FR")}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Début: {convertirEnDate(sejour.dateFin)?.toLocaleString("fr-FR")}
                                    </Typography>
                                </>
                            )}
                            {/* Affichez d'autres informations du séjour ici */}
                        </CardContent>
                    </SejourCard>
                ))}
            </div>
        </div>
    );
};

export default ListSejour;
