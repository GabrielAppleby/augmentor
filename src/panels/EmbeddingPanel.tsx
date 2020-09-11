import React from "react";
import {Grid} from "@material-ui/core";
import {useUmap} from "../hooks/UseUmap";
import {EmbeddingChart} from "../components/EmbeddingChart";

interface EmbeddingPanelProps {
    readonly data: number[][];
}

export const EmbeddingPanel: React.FC<EmbeddingPanelProps> = (props) => {
    let data = props.data;
    const embedding = useUmap(data).results;


    return (
        <Grid container>
            <Grid item>
                {embedding && <EmbeddingChart data={embedding}/>}
            </Grid>
        </Grid>
    )
}