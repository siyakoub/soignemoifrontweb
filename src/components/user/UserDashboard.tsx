import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoMenu from "../../assets/LogoMenu";
import {useEffect, useState} from "react";
import {Menu, MenuItem} from "@mui/material";
import {logoutUser} from "../../service_api/user_service";
import {useNavigate} from "react-router-dom";
import HomeDraw from "./dashboard/homeDraw";
import PrescriptionTab from "./dashboard/PrescriptionTab";
import ListSejour from "./dashboard/ListSejour";
import ListMedecins from "./dashboard/listMedecins";
import AddSejour from "./dashboard/addSejour";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import UserProfile from "./UserProfil";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                SuperBowl Betting
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'GREEN',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function UserDashboard() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [selectedComponent, setSelectedComponent] = useState<string>('Home');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    const userType = localStorage.getItem("userType");

    useEffect(() => {
        if (user_id === null || token === null) {
            console.log("Utilisateur non authentifié...");
            navigate("/");
        } else {
            console.log("Utilisateur authentifié...");
        }
    }, [navigate, token]);


    const handleMenuLogout = async () => {
        if (token) {
            const response = await logoutUser(token);
            if (response["deconnected"] === true) {
                // Gérez la déconnexion avec succès
                console.log(response);
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                navigate("/");
            }else {
                console.log("Une erreur est survenue...");
            }
        } else {
            // Gérez le cas où le token est nul
            console.log("Une erreur est survenue...");
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            navigate("/");
        }
    }


    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (componentName: string) => {
        setSelectedComponent(componentName);
        handleMenuClose();
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <div>
                            <IconButton color="inherit" onClick={handleMenuClick}>
                                <Badge color="secondary">
                                    <SettingsIcon/>
                                </Badge>
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={isMenuOpen}
                                onClose={handleMenuClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => handleMenuItemClick('myProfil')}>Mon Profil</MenuItem>
                                <MenuItem onClick={handleMenuLogout}>Déconnexion</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <LogoMenu/>
                        <h5>Soigne Moi</h5>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <ListItemButton onClick={() => handleMenuItemClick('Home')}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleMenuItemClick('Rdv')}>
                            <ListItemIcon>
                                <BookOnlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mes rendez-vous" />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleMenuItemClick('prescription')}>
                            <ListItemIcon>
                                <EditNoteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mes prescriptions" />
                        </ListItemButton>
                        <Divider sx={{ my: 1 }} />
                        <ListSubheader component="div" inset>
                            Saved reports
                        </ListSubheader>
                        <ListItemButton onClick={() => handleMenuItemClick('newRdv')}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Prendre rendez-vous"/>
                        </ListItemButton>
                        <ListItemButton onClick={() => handleMenuItemClick('medecinDispo')}>
                            <ListItemIcon>
                                <MedicationLiquidIcon />
                            </ListItemIcon>
                            <ListItemText primary="Médecins disponibles" />
                        </ListItemButton>
                    </List>
                </Drawer>
                {selectedComponent === 'Home' && <HomeDraw/>}
                {selectedComponent === 'Rdv' && <ListSejour user_id={user_id}/>}
                {selectedComponent === 'prescription' && <PrescriptionTab userId={user_id}/>}
                {selectedComponent === 'newRdv' && <AddSejour/>}
                {selectedComponent === 'medecinDispo' && <ListMedecins user_id={user_id}/>}
                {selectedComponent === 'myProfil' && <UserProfile/>}
            </Box>
        </ThemeProvider>
    );
}
