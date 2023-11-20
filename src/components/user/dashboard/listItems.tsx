import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import AssignmentIcon from '@mui/icons-material/Assignment';

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
                <SportsFootballIcon />
            </ListItemIcon>
            <ListItemText primary="Match à venir" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Parier" />
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
            <ListItemText primary="récapitulatif des match" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <CurrencyExchangeIcon />
            </ListItemIcon>
            <ListItemText primary="Historiques des mises" />
        </ListItemButton>
    </React.Fragment>
);
