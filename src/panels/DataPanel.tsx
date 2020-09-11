import React from "react";
import {Button, Grid} from "@material-ui/core";
import {DataTable} from "../components/DataTable";
import {Upload} from "../components/Upload";
import {Link} from "react-router-dom";

interface DataPanelProps {
    readonly data: number[][] | undefined;
    readonly header: string[] | undefined;
    readonly handleDataChange: (data: any) => void;
}

export const DataPanel: React.FC<DataPanelProps> = (props) => {
    const data = props.data;
    const header = props.header;
    const handleDataChange = props.handleDataChange

    return (
        <>
            <Grid container>
                <Grid container item xs={12}>
                    <Grid item xs={12} sm={6}>
                        <Upload handleDataChange={handleDataChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Link to="/embedding">
                            <Button variant="outlined" color="primary" style={{height: "140px", width: "100%"}}>
                                Embedding
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {header && data && <DataTable header={header} data={data}/>}
                </Grid>
            </Grid>
            {/*<Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={true} message="I love snacks"/>*/}
        </>
    )
}