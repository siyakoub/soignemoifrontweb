import React, {useEffect, useState} from "react";
import Title from "./Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {styled} from "@mui/system";
import Card from "@mui/material/Card";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import {
    getAllPrescriptionByUser,
    Prescription
} from "../../../service_api/prescription_service";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
    Backdrop,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel, MenuItem, Select,
    SpeedDial
} from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const PrescriptionTab : React.FC<{ userId: string | null }> = ({ userId }) => {

    const PrescriptionCard = styled(Card)({
        width: "100%"
    });

    const [speciality, setSpeciality] = useState('');
    const actions = [
        { icon: <FileCopyIcon />, name: 'Nouvelle Prescription' }
    ];
    const [open, setOpen] = React.useState(false);
    const [openAddPrescription, setOpenAddPrescription] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenAddPrescription = () => setOpenAddPrescription(true);

    const handleCloseAddPrescription = () => setOpenAddPrescription(false);
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSpeciality(event.target.value);
    };
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    function convertirEnDate(dateString: string): Date {
        const cleanedString = dateString.replace(" GMT", "");
        const date = new Date(cleanedString);
        return date;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const prescriptionsData = await getAllPrescriptionByUser(Number(userId));
                setPrescriptions(prescriptionsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des prescriptions:", error);
                // Gérer l'erreur ici (par exemple afficher un message d'erreur à l'utilisateur)
            }
        };

        fetchData();
    }, [userId]);
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", maxHeight: "100vh", alignItems:'center', overflowY: "auto", width: "100%", marginTop: "80px" }}>
                <h1>Mes Prescriptions</h1>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", // Pour centrer horizontalement
                    alignItems: "center", width: "90%" }}>
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
        </>
    );
}

export default PrescriptionTab;
