import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BookOnlineIcon />
            </ListItemIcon>
            <ListItemText primary="Mes rendez-vous" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <EditNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Mes prescriptions" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Prendre rendez-vous"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <MedicationLiquidIcon />
            </ListItemIcon>
            <ListItemText primary="Médecins disponibles" />
        </ListItemButton>
    </React.Fragment>
);
