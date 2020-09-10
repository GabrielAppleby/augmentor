import React, {useCallback, useState} from "react";
import {Grid} from "@material-ui/core";

interface EmbeddingPanelProps {
    readonly data: any[][];
}

export const EmbeddingPanel: React.FC<EmbeddingPanelProps> = (props) => {
    const data = props.data;

    return (
        <Grid container>
            <Grid item/>
        </Grid>
    )
}