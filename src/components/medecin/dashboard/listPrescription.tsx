import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {
    getAllPrescriptionByMedecin,
    Prescription,
    PrescriptionRegister,
    createPrescription
} from "../../../service_api/prescription_service";
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

    const medecin_email = localStorage.getItem('email');

    const PrescriptionCard = styled(Card)({
        width: "100%"
    });

    const actions = [
        { icon: <FileCopyIcon />, name: 'Nouvelle Prescription' }
    ];

    const [open, setOpen] = React.useState(false);

    const [openAddPrescription, setOpenAddPrescription] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCloseNewPrescription = () => setOpenAddPrescription(false);

    const handleOpenAddPrescription = () => setOpenAddPrescription(true);

    const handleCloseAddPrescription = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        const data = new FormData(event.currentTarget);
        const form: PrescriptionRegister = {
            user_email: String(data.get("user_email")),
            medecin_email: String(medecin_email),
            liste: String(data.get('list')),
            dateDebut: String(data.get('dateDebut')),
            dateFin: String(data.get('dateFin'))
        };
        console.log(form);
        try {
            const response = await createPrescription(form);
            if (response) {
                setOpenAddPrescription(false);
            }
        } catch (e) {
            console.log("Une erreur est survenue lors de l'ajout de la prescription...", e);
        }
    }

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
                    <form onSubmit={handleCloseAddPrescription}>
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
                                name="user_email"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                            <InputLabel htmlFor="list">Liste médicament</InputLabel>
                            <TextareaAutosize
                                aria-label="Liste médicament"
                                minRows={3}
                                placeholder="Entrez la liste des médicaments"
                                style={{ width: '100%' }}
                                id="list"
                                name="list"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="dateDebut"
                                name="dateDebut"
                                label="Début"
                                type="date"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="dateFin"
                                name="dateFin"
                                label="Fin"
                                type="date"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseNewPrescription}>Annuler</Button>
                            <Button type="submit">Créer</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </>
    );
};

export default ListPrescription;
