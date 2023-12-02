import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Linked from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from "../assets/Image";
import {createUser, User} from "../service_api/user_service";
import {UserRegister} from "../service_api/user_service";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {createMedecin, MedecinRegister} from "../service_api/medecin_service";
import {brown} from "@mui/material/colors";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Linked color="inherit" href="/signin">
                SoigneMoi
            </Linked>{' '}
            {new Date().getFullYear()}
            {'.'}
            <br/>
            <br/>
            <br/>
            <br/>
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

    const [userType, setUserType] = useState('');
    const [medecinFields, setMedecinFields] = useState(false);
    const [userFlieds, setUserField] = useState(false);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUserType(event.target.value);
        if (event.target.value === 'Médecin') {
            setMedecinFields(true);
        } else {
            setMedecinFields(false);
        }
        if (event.target.value == "Client") {
            setUserField(true);
        } else {
            setUserField(false);
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            if (data.get('userType') == 'Client') {
                const user: UserRegister = {
                    name: String(data.get("name") || ''), // Assurez-vous que la valeur n'est pas nulle et forcez-la à être une chaîne de caractères
                    firstName: String(data.get("firstName") || ''),
                    address: String(data.get("address") || ''), // Assurez-vous que la valeur n'est pas nulle et forcez-la à être une chaîne de caractère
                    zipCode: String(data.get("zipCode") || ''), // Assurez-vous que la valeur n'est pas nulle et forcez-la à être une chaîne de caractères
                    city : String(data.get("city") || ''),
                    email: String(data.get("email") || ''),
                    password: String(data.get("password") || ''),
                    userType: String(data.get("userType") || '')
                };
                const response = await createUser(user);
                if (response) {
                    console.log("Utilisateur inscrit avec succès...")
                    setOpenSuccessSnackbar(true)
                    navigate('/');
                }else {
                    console.log("Une erreur est survenue...")
                }
            } else if (data.get('userType') == "Médecin") {
                const medecin: MedecinRegister = {
                    name: String(data.get("name")), // Assurez-vous que la valeur n'est pas nulle et forcez-la à être une chaîne de caractères
                    firstName: String(data.get("firstName")),
                    address: String(data.get("address")), // Assurez-vous que la valeur n'est pas nulle et forcez-la à être une chaîne de caractère
                    zipCode: Number(data.get("zipCode")), // Assurez-vous que la valeur n'est pas nulle et forcez-la à être une chaîne de caractères
                    city : String(data.get("city")),
                    email: String(data.get("email")),
                    password: String(data.get("password")),
                    userType: String(data.get("userType")),
                    matricule: Number(data.get("matricule")),
                    limiteClient: Number(data.get("limitCustomer")),
                    speciality: String(data.get("speciality"))
                };
                const response = await createMedecin(medecin);
                if (response) {
                    console.log("Utilisateur inscrit avec succès...")
                    setOpenSuccessSnackbar(true)
                    navigate('/');
                }else {
                    console.log("Une erreur est survenue...")
                }
            }
        } catch (e) {
            console.log("Une erreur est survenue lors de l'inscription de l'utilisateur...");
            console.log(e)
        }
    }

    const handleCloseSuccessSnackbar = () => {
        setOpenSuccessSnackbar(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Image/>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="name"
                                    name="name"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Adresse"
                                    name="address"
                                    autoComplete="address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="zipCode"
                                    label="Code Postal"
                                    type="text"
                                    id="zipCode"
                                    autoComplete="zipCode"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="city"
                                    label="Ville"
                                    type="text"
                                    id="city"
                                    autoComplete="city"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="email"
                                    label="Adresse E-mail"
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                    autoComplete="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth sx={{ mt: 1 }}>
                                    <InputLabel id="user-type-label">Type d'utilisateur</InputLabel>
                                    <Select
                                        labelId="user-type-label"
                                        id="userType"
                                        name="userType"
                                        value={userType}
                                        label="Type d'utilisateur"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'Médecin'}>Médecin</MenuItem>
                                        <MenuItem value={'Client'}>Client</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {medecinFields && (
                                <>
                                    <Grid item xs={12}>
                                        {/* Additional fields specific to Médecin */}
                                        <TextField
                                            required
                                            fullWidth
                                            name="matricule"
                                            label="Matricule"
                                            type="text"
                                            id="matricule"
                                        />
                                        {/* ... other fields for Médecin */}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Additional fields specific to Médecin */}
                                        <TextField
                                            required
                                            fullWidth
                                            name="speciality"
                                            label="Spécialité"
                                            type="text"
                                            id="speciality"
                                        />
                                        {/* ... other fields for Médecin */}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Additional fields specific to Médecin */}
                                        <TextField
                                            required
                                            fullWidth
                                            name="limitCustomer"
                                            label="Limite prise en charge"
                                            type="text"
                                            id="limitCustomer"
                                        />
                                        {/* ... other fields for Médecin */}
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Je souhaite recevoir des promotions marketing et des mises à jour par e-mail."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Linked variant="body2">
                                    <Link to="/signin">
                                        Vous avez déjà un compte? Connectez-vous
                                    </Link>
                                </Linked>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
