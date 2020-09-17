import React, {useCallback, useState} from "react";
import {Button, Grid, Snackbar} from "@material-ui/core";
import {DataTable} from "../components/DataTable";
import {NumberParseResult, Upload} from "../components/Upload";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

interface UploadPageProps {
    readonly columnNames: string[] | undefined;
    readonly rows: Record<'label' | string, number>[] | undefined;
    readonly handleDataChange: (data: NumberParseResult[]) => void;
}

const useStyles = makeStyles({
    uploadInfoSnackBar: {},
    projectButton: {
        height: "140px",
        width: "100%"
    }
});

export const UploadPage: React.FC<UploadPageProps> = ({columnNames, rows, handleDataChange}) => {
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const handleUploadError = useCallback(_ => setSnackBarOpen(true), [])
    const handleSnackBarClose = useCallback(() => setSnackBarOpen(false), []);

    const classes = useStyles();

    return (
        <div>
            <Snackbar className={classes.uploadInfoSnackBar}
                      anchorOrigin={{vertical: "top", horizontal: "center"}}
                      open={snackBarOpen}
                      autoHideDuration={3000}
                      onClose={handleSnackBarClose}
                      message="An error occurred parsing the CSV."/>
            <Grid container>
                <Grid container item xs={12}>
                    <Grid item xs={12} sm={6}>
                        <Upload handleDataChange={handleDataChange} handleUploadError={handleUploadError}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Link to="/embedding">
                            <Button disabled={!rows} className={classes.projectButton} variant="outlined"
                                    color="primary">
                                Project
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {columnNames && rows && <DataTable header={columnNames} data={rows}/>}
                </Grid>
            </Grid>
        </div>
    )
}