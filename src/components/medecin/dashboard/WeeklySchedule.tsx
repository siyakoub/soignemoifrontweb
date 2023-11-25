import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

const TimeSlot = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "50px",
    border: "1px solid #ccc",
    margin: "2px",
    width: "100%"
});

const WeeklySchedule: React.FC = () => {
    const daysOfWeek: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    // Création des plages horaires
    const hours: string[] = [];
    for (let i: number = 8; i <= 18; i++) {
        for (let j: number = 0; j < 2; j++) {
            const time: string = `${i.toString().padStart(2, "0")}:${j === 0 ? "00" : "30"}`;
            hours.push(time);
        }
    }

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={2}>
                    {daysOfWeek.map((day, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={2}>
                            <Paper sx={{ p: 2, textAlign: "center" }}>
                                <h3>{day}</h3>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    {hours.map((time, index) => (
                                        <div key={index} style={{ display: "flex" }}>
                                            <p>{time}</p>
                                            <TimeSlot />
                                        </div>
                                    ))}
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default WeeklySchedule;
