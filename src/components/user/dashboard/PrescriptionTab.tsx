import React from "react";
import Title from "./Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";


const PrescriptionTab : React.FC = () => {
    return (
        <React.Fragment>
            <Title>Liste des prescriptions</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </React.Fragment>
    );
}
