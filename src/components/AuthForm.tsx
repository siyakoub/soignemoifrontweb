import * as React from 'react';
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
import { loginUser } from '../service_api/user_service';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Image from '../assets/Image';
import Checkbox from "@mui/material/Checkbox";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Linked color="inherit" href="/">
                SoigneMoi
            </Linked>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const AuthForm = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const medecin_id = localStorage.getItem('medecin_id');
        const user_id = localStorage.getItem('user_id');
        const admin_id = localStorage.getItem('admin_id');

        if (token) {
            if (medecin_id || admin_id || user_id) {
                if (medecin_id) navigate('/medecin-dashboard');
                else if (admin_id) navigate('/admin-dashboard');
                else if (user_id) navigate('/user-dashboard');
            }
        }
    }, [navigate]);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUserType(event.target.value);
    };

    const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form = {
            email: String(data.get('email') || ''),
            password: String(data.get('password') || ''),
            userType: String(data.get('userType') || ''),
        };
        //console.log(form);
        try {
            const response = await loginUser(form);
            const userTypeBase = form.userType;
            if (response) {
                if (userTypeBase == "Administrateur") {
                    if (response["connected"] === true){
                        const token = response["sessions"]["token"]
                        const userActif = response["administrateur"]["actif"];
                        const address = response["administrateur"]["address"];
                        const admin_id = response["administrateur"]["admin_id"];
                        const administrateur_role = response["administrateur"]["administrateur_role"];
                        const city = response["administrateur"]["city"];
                        const email = response["administrateur"]["email"];
                        const firstName = response["administrateur"]["firstName"];
                        const name = response["administrateur"]["name"];
                        const password = response["administrateur"]["password"];
                        const userType = response["administrateur"]["userType"];
                        const user_id = response["administrateur"]["user_id"];
                        const zipCode = response["administrateur"]["zipCode"];
                        if (userType == userTypeBase) {
                            localStorage.setItem('token', token);
                            localStorage.setItem("admin_id", admin_id);
                            localStorage.setItem("userType", userType);
                            localStorage.setItem("email", email);
                            localStorage.setItem("name", name);
                            localStorage.setItem("firstName", firstName);
                            navigate("/admin-dashboard");
                        } else {
                            console.log("Mauvais type d'utilisateur selectionnée...");
                            navigate("/")
                        }
                    }else {
                        console.log("Aucun Administrateur trouvé...");
                        navigate("/")
                    }
                } else if (userTypeBase == "Médecin") {
                    if (response["connected"] === true){
                        const token = response["sessions"]["token"];
                        const userActif = response["medecin"]["actif"];
                        const address = response["medecin"]["address"];
                        const city = response["medecin"]["city"];
                        const email = response["medecin"]["email"];
                        const firstName = response["medecin"]["firstName"];
                        const limiteClient = response["medecin"]["limitCustomer"];
                        const matricule = response["medecin"]["matricule"];
                        const medecin_id = response["medecin"]["medecin_id"];
                        const name = response["medecin"]["name"];
                        const password = response["medecin"]["password"];
                        const speciality = response["medecin"]["speciality"];
                        const userType = response["medecin"]["userType"];
                        const user_id = response["medecin"]["user_id"];
                        const zipCode = response["medecin"]["zipCode"];
                        if (userType == userTypeBase) {
                            localStorage.setItem('token', token);
                            localStorage.setItem('medecin_id', medecin_id);
                            localStorage.setItem("userType", userType);
                            localStorage.setItem("email", email);
                            localStorage.setItem("name", name);
                            localStorage.setItem("firstName", firstName);
                            navigate("/medecin-dashboard");
                        } else {
                            console.log("Mauvais type d'utilisateur selectionnée...")
                        }
                    }else {
                        console.log("Aucun Administrateur trouvé...");
                        navigate("/")
                    }
                } else if (userTypeBase == "Client") {
                    if (response["connected"] === true) {
                        const token = response["sessions"]["token"];
                        const userActif = response["utilisateur"]["actif"];
                        const address = response["utilisateur"]["address"];
                        const city = response["utilisateur"]["city"];
                        const email = response["utilisateur"]["email"];
                        const firstName = response["utilisateur"]["firstName"];
                        const name = response["utilisateur"]["name"];
                        const password = response["utilisateur"]["password"];
                        const userType = response["utilisateur"]["userType"];
                        const user_id = response["utilisateur"]["user_id"];
                        const zipCode = response["utilisateur"]["zipCode"];
                        if (userType == userTypeBase) {
                            localStorage.setItem('token', token);
                            localStorage.setItem('user_id', user_id);
                            localStorage.setItem("userType", userType);
                            localStorage.setItem("email", email);
                            localStorage.setItem("name", name);
                            localStorage.setItem("firstName", firstName);
                            navigate("/user-dashboard");
                        } else {
                            console.log("Mauvais type d'utilisateur séléctionnée...");
                        }
                    } else {
                        console.log("Aucune utilisateur Client trouvé...");
                        navigate("/");
                    }
                }
            } else {
                console.error('Échec de la connexion de l\'utilisateur');
                // Gérez les erreurs de connexion
            }
        } catch (error) {
            console.error('Erreur lors de l\'appel API :', error);
            // Gérez les erreurs de l'appel API
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://medias.vie-publique.fr/data_storage_s3/en_bref/image_principale/drees_etablissements_de_sante_enquete_2860620_Drupal.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image/>
                        <br/>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Adresse Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="user-type-label">Type d'utilisateur</InputLabel>
                                <Select
                                    labelId="user-type-label"
                                    id="userType"
                                    value={userType}
                                    label="Type d'utilisateur"
                                    name="userType"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Médecin'}>Médecin</MenuItem>
                                    <MenuItem value={'Client'}>Client</MenuItem>
                                    <MenuItem value={'Administrateur'}>Administrateur</MenuItem>
                                </Select>
                            </FormControl>


                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Se souvenir de moi"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Linked href="#" variant="body2">
                                        <Link to="/forget-password">
                                            Mot de passe oublié ?
                                        </Link>
                                    </Linked>
                                </Grid>
                                <Grid item>
                                    <Linked href="#" variant="body2">
                                        <Link to="/signup">
                                            {"Vous n'avez pas encore de compte? Inscrivez-vous"}
                                        </Link>
                                    </Linked>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default AuthForm;
