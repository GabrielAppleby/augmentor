import React from "react";
import {Grid} from "@material-ui/core";
import {DataTile} from "./data/components/DataTile";

interface DefaultPanelProps {

}

export const DefaultPanel: React.FC<DefaultPanelProps> = () => {

    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Grid container>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <DataTile/>
            </Grid>
        </Grid>
    )
}