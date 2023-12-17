import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ListPrescription from "./listPrescription";
import ListSejour from "./listesejour";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Soigne Moi
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const homeDraw : React.FC = () => {
    let medecin_id = localStorage.getItem('medecin_id');
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Element 1 */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
                            <ListSejour medecinId={String(medecin_id)} />
                        </Paper>
                    </Grid>
                    {/* Element 2 */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <ListPrescription medecinId={String(medecin_id)} />
                        </Paper>
                    </Grid>
                </Grid>
                {/* Autres éléments ou contenu ici */}
            </Container>
        </Box>
    );
}

export default homeDraw;
