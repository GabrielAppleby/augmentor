import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface EmbeddingTableProps {
    readonly data: any[][];
}

const useStyles = makeStyles({
    container: {
        maxHeight: '50vh',
    }
});

export const EmbeddingTable: React.FC<EmbeddingTableProps> = (props) => {

    console.log("why");
    const header = props.data[0];
    const body = props.data.slice(1);
    console.log(header);
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {header.map((column: any, idx: number) => (
                            <TableCell key={idx}> {column} </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {body.map((row: any, idx: number) => (
                        <TableRow key={idx}>
                            {row.map((column: any) => (
                                <TableCell> {column} </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}