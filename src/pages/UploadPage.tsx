import React, {useCallback, useState} from "react";
import {Button, Grid, Snackbar} from "@material-ui/core";
import {DataTable} from "../components/DataTable";
import {NumberParseResult, Upload} from "../components/Upload";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {ParsedData} from "../App";

interface UploadPageProps {
    readonly parsedData?: ParsedData;
    readonly handleDataChange: (data: NumberParseResult[]) => void;
    readonly handleParsingError: (errors: any) => void;
}

// const useStyles = makeStyles({
//     projectButton: {
//         height: "140px",
//         width: "100%"
//     }
// });

export const UploadPage: React.FC<UploadPageProps> = ({parsedData, handleDataChange, handleParsingError}) => {

    // const classes = useStyles();

    console.log("Upload page");

    return (
        <div>
            <Grid container>
                <Grid container item xs={12}>
                    <Grid item xs={12} sm={6}>
                        <Upload handleDataChange={handleDataChange} handleUploadError={handleParsingError}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Link to="/embedding">
                            {/*<Button disabled={!parsedData} className={classes.projectButton} variant="outlined"*/}
                            <Button disabled={!parsedData} variant="outlined"
                                    color="primary">
                                Project
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {parsedData && <DataTable header={parsedData.columnNames} data={parsedData.rows}/>}
                </Grid>
            </Grid>
        </div>
    )
}
