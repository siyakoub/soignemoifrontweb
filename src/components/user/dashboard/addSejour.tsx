import React from "react";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Linked from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {createSejour, SejourRegister} from "../../../service_api/sejour_service";
import {Alert, FormControl, InputLabel, MenuItem, Select, Snackbar} from '@mui/material';
import {getAllMedecinActif, Medecin} from "../../../service_api/medecin_service";
import {getUserById, User} from "../../../service_api/user_service";
import Container from "@mui/material/Container";


const defaultTheme = createTheme();

const AddSejour: React.FC = () => {

    const user_id = localStorage.getItem("user_id");

    const user_email = localStorage.getItem("email");

    const [medecins, setMedecins] = useState<Medecin[]>([]);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [user, setUser] = useState<User>();

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

        const fetchUserData = async () => {
            try {
                const userData = await getUserById(Number(user_id));
                setUser(userData);
            } catch (error) {
                console.log("Une erreur est survenue lors de la récupération de l'utilisateur", error);
            }
        }

        fetchData();
        fetchUserData();
    }, [user_id]);

    const [formData, setFormData] = useState({
        userEmail: user_email,
        medecinEmail: '',
        dateDebut: '',
        dateFin: '',
        motif: '',
        speciality: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const formattedData: SejourRegister = {
            date_debut: formData.dateDebut.replace('T', ' ') + ':00',
            date_fin: formData.dateFin.replace('T', ' ') + ':00',
            user_email: formData.userEmail || '', // S'assurer que cela n'est jamais 'null'
            medecin_email: formData.medecinEmail,
            motif: formData.motif,
            speciality: formData.speciality
        };

        console.log(formattedData);

        try {
            const response = await createSejour(formattedData);
            if (response) {
                console.log("Nouveau Séjour ajouté avec succès !");
                setOpenSnackbar(true);
            }
        } catch (e) {
            console.log("Une erreur est survenue lors de la soumission du formulaire...", e)
        }
        // Ici, vous pouvez gérer la soumission des données du formulaire
    };


    return(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxHeight: "100vh", overflowY: "auto", width: "100%" , marginTop: "80px"}}>
            <Container maxWidth="sm">
                <Typography variant="h6" gutterBottom>
                    Nouveau rendez-vous
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="medecin-label">Email du médecin</InputLabel>
                                <Select
                                    labelId="medecin-label"
                                    name="medecinEmail"
                                    value={formData.medecinEmail}
                                    label="Email du médecin"
                                    onChange={handleChange}
                                >
                                    {medecins.map(medecin => (
                                        <MenuItem key={medecin.medecin_id} value={medecin.email}>
                                            {medecin.name} {medecin.firstName} ({medecin.speciality})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Date de début"
                                name="dateDebut"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formData.dateDebut}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Date de fin"
                                name="dateFin"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formData.dateFin}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Motif"
                                name="motif"
                                value={formData.motif}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Spécialité"
                                name="speciality"
                                value={formData.speciality}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Soumettre
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Nouveau Séjour ajouté avec succès !
                </Alert>
            </Snackbar>
        </div>
    );
}


export default AddSejour;
