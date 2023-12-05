import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CommentIcon from '@mui/icons-material/Comment';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoMenu from "../../assets/LogoMenu";
import {useEffect, useState} from "react";
import {Menu, MenuItem} from "@mui/material";
import {logoutUser} from "../../service_api/user_service";
import {useNavigate} from "react-router-dom";
import WeeklySchedule from "./dashboard/WeeklySchedule";
import ListSejour from "./dashboard/listesejour";
import ListPrescription from "./dashboard/listPrescription";
import AvisList from "./dashboard/listAvis";
import HomeDraw from "./dashboard/homeDraw";

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

export default function MedecinDashboard() {
    const [selectedComponent, setSelectedComponent] = useState<string>('Home');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const medecin_id = localStorage.getItem("medecin_id");
    const userType = localStorage.getItem("userType");

    useEffect(() => {
        if (medecin_id === undefined || medecin_id === null) {
            navigate("/");
        }
    }, [navigate, medecin_id]);


    const handleMenuItemClick = (componentName: string) => {
        setSelectedComponent(componentName);
        handleMenuClose();
    };

    const handleMenuLogout = async () => {
        if (token) {
            const response = await logoutUser(token);
            if (response["deconnected"] === true) {
                // Gérez la déconnexion avec succès
                console.log(response);
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                localStorage.removeItem("admin_id");
                localStorage.removeItem("medecin_id");
                navigate("/");
            }else {
                console.log("Une erreur est survenue...");
            }
        } else {
            // Gérez le cas où le token est nul
            localStorage.removeItem("medecin_id");
            localStorage.removeItem("user_id");
            localStorage.removeItem("admin_id");
            console.log("Une erreur est survenue...");
            navigate("/");
        }
    }


    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
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
                                <MenuItem onClick={handleMenuClose}>Mon Profil</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Mes Sejours</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Paramètres</MenuItem>
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
                        <ListItemButton  onClick={() => handleMenuItemClick('Home')}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItemButton>
                        <ListItemButton onClick={() => handleMenuItemClick('WeeklySchedule')}>
                            <ListItemIcon>
                                <DateRangeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Planning" />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleMenuItemClick('ListPrescription')}>
                            <ListItemIcon>
                                <EditNoteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mes Prescription"></ListItemText>
                        </ListItemButton>
                        <ListItemButton onClick={() => handleMenuItemClick('ListSejour')}>
                            <ListItemIcon>
                                <BookOnlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mes Sejours" />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleMenuItemClick('AvisList')}>
                            <ListItemIcon>
                                <CommentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mes avis" />
                        </ListItemButton>
                    </List>
                </Drawer>
                {selectedComponent === 'AvisList' && <AvisList medecinId={String(medecin_id)} />}
                {selectedComponent === 'ListPrescription' && <ListPrescription  medecinId={String(medecin_id)}/>}
                {selectedComponent === 'ListSejour' && <ListSejour  medecinId={String(medecin_id)}/>}
                {selectedComponent === 'WeeklySchedule' && <WeeklySchedule/>}
                {selectedComponent === 'Home' && <HomeDraw/>}
            </Box>
            <Copyright/>
        </ThemeProvider>
    );
}
