import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CommentIcon from '@mui/icons-material/Comment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useState} from "react";

const [selectedComponent, setSelectedComponent] = useState<string>('');
const handleMenuItemClick = (componentName: string) => {
    setSelectedComponent(componentName);
};

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Home"/>
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
            <ListItemText primary="Mes Prescription"></ListItemText>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <CommentIcon />
            </ListItemIcon>
            <ListItemText primary="Mes avis" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            SubMenu
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profil" />
        </ListItemButton>
    </React.Fragment>
);
