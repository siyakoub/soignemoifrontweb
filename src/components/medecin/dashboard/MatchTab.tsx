import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Tableau des matchs disponibles
const matches = [
    {
        id: 1,
        date: '2023-09-30',
        teams: 'Équipe A vs Équipe B',
        location: 'Stade XYZ',
        type: 'Match de championnat',
        price: 50.0,
    },
    {
        id: 2,
        date: '2023-10-05',
        teams: 'Équipe C vs Équipe D',
        location: 'Stade ABC',
        type: 'Match amical',
        price: 35.0,
    },
    // Ajoutez plus de matchs ici
];



const MatchTab: React.FC = () => {

    return (
        <React.Fragment>
            <Title>Matchs à venir</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Équipes</TableCell>
                        <TableCell>Lieu</TableCell>
                        <TableCell>Type de match</TableCell>
                        <TableCell align="right">Prix du billet</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matches.map((match) => (
                        <TableRow key={match.id}>
                            <TableCell>{match.date}</TableCell>
                            <TableCell>{match.teams}</TableCell>
                            <TableCell>{match.location}</TableCell>
                            <TableCell>{match.type}</TableCell>
                            <TableCell align="right">{`$${match.price}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default MatchTab;
