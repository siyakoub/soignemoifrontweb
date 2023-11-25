import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { getAllPrescriptionByMedecin, Prescription } from "../../../service_api/prescription_service";

const ListPrescription: React.FC<{ medecinId: string }> = ({ medecinId }) => {
    const PrescriptionCard = styled(Card)({
        width: "100%"
    });

    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

    function convertirEnDate(dateString: string): Date {
        const cleanedString = dateString.replace(" GMT", "");
        const date = new Date(cleanedString);
        return date;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prescriptionsData = await getAllPrescriptionByMedecin(Number(medecinId));
                setPrescriptions(prescriptionsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des prescriptions:", error);
                // Gérer l'erreur ici (par exemple afficher un message d'erreur à l'utilisateur)
            }
        };

        fetchData();
    }, [medecinId]);

    return (
        <div style={{ display: "flex", flexDirection: "column", maxHeight: "100vh", overflowY: "auto", width: "100%", marginTop: "80px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                {prescriptions.map((prescription) => (
                    <PrescriptionCard key={prescription.prescription_id}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Date de début: {convertirEnDate(prescription.dateDebutTraitement)?.toLocaleDateString("fr-FR")}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Date de fin: {convertirEnDate(prescription.dateFinTraitement)?.toLocaleDateString("fr-FR")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Liste des médicaments et podologie: {prescription.listeMedicamentAndPodologie}
                            </Typography>
                            {/* Affichez d'autres informations de la prescription ici */}
                        </CardContent>
                    </PrescriptionCard>
                ))}
            </div>
        </div>
    );
};

export default ListPrescription;
