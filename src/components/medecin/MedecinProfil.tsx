import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';

const UserProfile: React.FC = () => {
    const userData = {
        actif: 1,
        adresseEmail: "potter@example.com",
        dateInscription: Date.now(),
        motDePasse: "43e8afc76259b0ac31f2c2de6af3da122b01f867262f4c89ef16125f52bd3966",
        nom: "Potter",
        prenom: "Atlas",
        userID: 1
    }
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Profil Médecin</h2>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {
                                    userData.prenom
                                }
                                {
                                    userData.nom
                                }
                            </Card.Title>
                            <Card.Text>
                                <strong>E-mail : </strong>{userData.adresseEmail}
                                <strong>Date d'inscription : </strong>{userData.dateInscription}
                                <strong>Nom : </strong>{userData.nom}
                                <strong>Prénom : </strong>{userData.prenom}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
