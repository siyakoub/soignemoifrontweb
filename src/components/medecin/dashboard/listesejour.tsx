import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import {createSejour, getAllSejourByMedecin, Sejour, SejourRegister} from "../../../service_api/sejour_service";
import {
    Backdrop,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel, MenuItem, Select,
    SpeedDial
} from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import {responsiveProperty} from "@mui/material/styles/cssUtils";

const ListSejour: React.FC<{ medecinId: string }> = ({ medecinId }) => {

    const medecin_email = localStorage.getItem('email');

    const SejourCard = styled(Card)({
        width: "100%"
    });
    const [open, setOpen] = React.useState(false);

    const actions = [
        { icon: <FileCopyIcon />, name: 'Nouveau Rendez-vous' }
    ];

    const handleCloseAddSejour = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        const data = new FormData(event.currentTarget);
        const form: SejourRegister = {
            user_email: String(data.get('user_email')),
            medecin_email: String(medecin_email),
            date_debut: String(data.get('dateDebut')),
            date_fin: String(data.get('dateFin')),
            motif: String(data.get('motif')),
            speciality: String(specialite)
        };
        console.log(form);
        try {
            const response = await createSejour(form);
            if (response) {
                setOpenAddSejour(false);
            }
        } catch (e) {
            console.log("Une erreur est survenue lors de l'ajout de la prescription...", e);
        }
    }

    const [openAddSejour, setOpenAddSejour] = React.useState(false);

    const handleCloseNewSejour = () => setOpenAddSejour(false);

    const handleOpenAddSejour = () => setOpenAddSejour(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const specialites = ['Chirurgie', 'Consultation', 'Urgence', 'Autopsie', 'Autre'];

    const [specialite, setSpecialite] = React.useState('');

    const handleChangeSpeciality = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSpecialite(event.target.value);
    };

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
            <Box sx={{ height: 780, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <Backdrop open={open} />
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
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
                            onClick={handleOpenAddSejour}
                        />
                    ))}
                </SpeedDial>
                <Dialog open={openAddSejour} onClose={handleClose}>
                    <form onSubmit={handleCloseAddSejour}>
                        <DialogTitle>Créer une nouvelle prescription</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Renseigner les informations nécessaire pour planifier un nouveau rendez vous ou séjour.
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
                            <InputLabel htmlFor="list">Motif</InputLabel>
                            <TextareaAutosize
                                aria-label="Motif"
                                minRows={3}
                                placeholder="Entrez le motif"
                                style={{ width: '100%' }}
                                id="motif"
                                name="motif"
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
                            <InputLabel id="specialite-label">Spécialité</InputLabel>
                            <Select
                                labelId="specialite-label"
                                id="speciality"
                                value={specialite}
                                label="Spécialité"
                                onChange={handleChangeSpeciality}
                                autoWidth
                            >
                                {specialites.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseNewSejour}>Annuler</Button>
                            <Button type="submit">Créer</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </div>
    );
};

export default ListSejour;
