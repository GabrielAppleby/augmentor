import React, {useCallback, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import {DataTable} from "./components/DataTable";
import {Upload} from "./components/Upload";

interface DataPanelProps {
    readonly data: any[][] | null;
    readonly handleDataChange: (data: any, file?: any) => void;
}

export const DataPanel: React.FC<DataPanelProps> = (props) => {
    const data = props.data;
    const handleDataChange = props.handleDataChange

    return (
        <Grid container>
            <Grid container item xs={12}>
                <Grid item xs={12} sm={6}>
                    <Upload handleDataChange={handleDataChange}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="outlined" color="primary" style={{height:"140px", width:"100%"}}>
                        Continue
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {data && <DataTable data={data}/>}
            </Grid>
        </Grid>
    )
}