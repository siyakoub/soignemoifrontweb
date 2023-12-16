import React, {useEffect, useState} from "react";
import {styled} from "@mui/system";
import Card from "@mui/material/Card";
import {getAllSejourByUser, Sejour} from "../../../service_api/sejour_service";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ListSejour: React.FC<{ user_id: string | null }> = ({ user_id }) => {
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
                const sejoursData = await getAllSejourByUser(Number(user_id));
                setSejours(sejoursData);
            } catch (error) {
                console.error("Erreur lors de la récupération des séjours:", error);
                // Gérer l'erreur ici (par exemple afficher un message d'erreur à l'utilisateur)
            }
        };

        fetchData();
    }, [user_id]);

    return(
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
}

export default ListSejour;
