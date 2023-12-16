import React, {useEffect, useState} from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import {getMedecinById, Medecin} from "../../service_api/medecin_service";
import {styled} from "@mui/system";
import Typography from "@mui/material/Typography";

const MedecinProfile: React.FC = () => {

    const medecin_id = localStorage.getItem('medecin_id');

    const [medecin, setMedecin] = useState<Medecin>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const medecinData = await getMedecinById(Number(medecin_id));
                setMedecin(medecinData);
            } catch (error) {
                console.error("Erreur lors de la récupération des séjours:", error);
                // Gérer l'erreur ici (par exemple afficher un message d'erreur à l'utilisateur)
            }
        };

        fetchData();
    }, []);

    const MedecinCard = styled(Card)({
        width: "100%"
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxHeight: "100vh", overflowY: "auto", width: "100%" , marginTop: "80px"}}>
            <h1>Profil Médecin</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",
                alignItems: "center", width: "90%" }}>

            </div>
            <MedecinCard key={medecin?.medecin_id}>
                <Typography variant="h6" component="div">
                    E-mail : {medecin?.email}
                </Typography>
                <Typography variant="h6" component="div">
                    Matricule : {medecin?.matricule}
                </Typography>
                <Typography variant="h6" component="div">
                    Nom : {medecin?.name}
                </Typography>
                <Typography variant="h6" component="div">
                    Prénom : {medecin?.firstName}
                </Typography>
                <Typography variant="h6" component="div">
                    Limite Client : {medecin?.limitCustomer}
                </Typography>
                <Typography variant="h6" component="div">
                    Adresse : {medecin?.address}
                </Typography>
                <Typography variant="h6" component="div">
                    Code Postal : {medecin?.zipCode}
                </Typography>
                <Typography variant="h6" component="div">
                    Ville : {medecin?.city}
                </Typography>
                <Typography variant="h6" component="div">
                    Spécialité : {medecin?.speciality}
                </Typography>
            </MedecinCard>
        </div>
    );
};

export default MedecinProfile;
