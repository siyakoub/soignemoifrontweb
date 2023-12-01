import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { getAllPrescriptionByMedecin, Prescription } from "../../../service_api/prescription_service";
import Box from "@mui/material/Box";
import {
    Backdrop,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    InputLabel, MenuItem, Select,
    SpeedDial
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ListPrescription: React.FC<{ medecinId: string }> = ({ medecinId }) => {
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
            <Box sx={{ height: 780, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <Backdrop open={open} />
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    sx={{ position: 'absolute', bottom: 16, right: 16}}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    color="inherit"
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={handleOpenAddPrescription}
                        />
                    ))}
                </SpeedDial>
                <Dialog open={openAddPrescription} onClose={handleCloseAddPrescription}>
                    <DialogTitle>Créer une nouvelle prescription</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Renseigner les informations nécessaire pour crée une nouvelle prescription.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="user_email"
                            label="Email Client"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="motif"
                            label="Motif"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="dateDebut"
                            label="Début"
                            type="datetime-local"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="dateFin"
                            label="Fin"
                            type="datetime-local"
                            fullWidth
                            variant="standard"
                        />
                        <FormControl fullWidth sx={{ mt: 1 }}>
                            <InputLabel id="speciality">Spécialité</InputLabel>
                            <Select
                                labelId="speciality"
                                id="speciality"
                                value={speciality}
                                label="Spécialité"
                                name="speciality"
                                onChange={handleChange}
                            >
                                <MenuItem value={'Chirurgie'}>Chirurgie</MenuItem>
                                <MenuItem value={'Consultation'}>Consultation</MenuItem>
                                <MenuItem value={'Urgence'}>Urgence</MenuItem>
                                <MenuItem value={'Autopsie'}>Autopsie</MenuItem>
                                <MenuItem value={'Autre'}>Autre</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Annuler</Button>
                        <Button onClick={handleCloseAddPrescription}>Créer</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
};

export default ListPrescription;
