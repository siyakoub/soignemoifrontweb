import React, {useEffect, useState} from "react";
import {styled} from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Medecin, getAllMedecinActif} from "../../../service_api/medecin_service";
import {getAllSejourByUser} from "../../../service_api/sejour_service";

const ListMedecins: React.FC<{user_id : string | null}> = ({user_id}) => {

    const MedecinCard = styled(Card)({
        width: "100%"
    });

    const [medecins, setMedecins] = useState<Medecin[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sejoursData = await getAllMedecinActif();
                setMedecins(sejoursData);
            } catch (error) {
                console.error("Erreur lors de la récupération des séjours:", error);
                // Gérer l'erreur ici (par exemple afficher un message d'erreur à l'utilisateur)
            }
        };

        fetchData();
    }, []);

    return(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxHeight: "100vh", overflowY: "auto", width: "100%" , marginTop: "80px"}}>
            <h1>Médecins disponibles</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",
                alignItems: "center", width: "90%" }}>
                {medecins.map((medecins) => (
                    <MedecinCard key={medecins.medecin_id}>
                        <Typography variant="h6" component="div">
                            Nom : {medecins.name}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Prénom : {medecins.firstName}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Matricule : {medecins.matricule}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Limite Client : {medecins.limitCustomer}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Spécialité : {medecins.speciality}
                        </Typography>
                    </MedecinCard>
                ))}
            </div>
        </div>
    );
}

export default ListMedecins;
