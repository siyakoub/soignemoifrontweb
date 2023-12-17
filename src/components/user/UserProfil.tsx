import React, {useEffect, useState} from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import {getMedecinById, Medecin} from "../../service_api/medecin_service";
import {getUserById, User} from "../../service_api/user_service";
import {styled} from "@mui/system";
import Typography from "@mui/material/Typography";

const UserProfile: React.FC = () => {

    const user_id = localStorage.getItem('user_id');

    const [user, setUser] = useState<User>();

    const UserCard = styled(Card)({
        width: "100%"
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserById(Number(user_id));
                setUser(userData);
            } catch (error) {
                console.error("Erreur lors de la récupération des séjours:", error);
                // Gérer l'erreur ici (par exemple afficher un message d'erreur à l'utilisateur)
            }
        };

        fetchData();
    }, [user_id]);
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxHeight: "100vh", overflowY: "auto", width: "100%" , marginTop: "80px"}}>
            <h1>Profil Utilisateur</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",
                alignItems: "center", width: "90%" }}>
                <UserCard key={user?.user_id}>
                    <Typography variant="h6" component="div">
                        E-mail : {user?.email}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Nom : {user?.name}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Prénom : {user?.firstName}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Adresse : {user?.address}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Code Postal : {user?.zipCode}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Ville : {user?.city}
                    </Typography>
                </UserCard>
            </div>
        </div>
    );
};

export default UserProfile;
