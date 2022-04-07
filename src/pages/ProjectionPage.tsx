import React, {useCallback, useMemo, useState} from "react";
import {Grid} from "@material-ui/core";
// import {useUmap} from "../hooks/UseUmap";
// import {EmbeddingChart} from "../components/EmbeddingChart";
import {UmapControl} from "../components/UmapControl";
import {UMAPParameters} from "umap-js";
import {WeightingSliders} from "../components/WeightingSliders";
// import {useUnlabeledRows} from "../hooks/useUnlabeledRows";
import {useWeights} from "../hooks/useWeights";
// import {useLabels} from "../hooks/useLabels";
// import {makeStyles} from "@material-ui/core/styles";
import {EmbeddingChart} from "../components/EmbeddingChart";
import {ParsedData} from "../App";
import {useUmapParams} from "../hooks/useUmapParams";
import {useSeparateLabelsFromParsedData} from "../hooks/useSeparateLabelsFromParsedData";
import {useUmap} from "../hooks/UseUmap";
import * as heap from "umap-js/dist/heap";


interface ProjectionPageProps {
    readonly parsedData: ParsedData;
}

// const useStyles = makeStyles({
//     controlGridItem: {
//         margin: "auto"
//     },
// });

export const ProjectionPage: React.FC<ProjectionPageProps> = ({parsedData}) => {
    console.log("Projection Panel");

    const separatedParsedData = useSeparateLabelsFromParsedData(parsedData);
    const {weights, handleWeightsChange} = useWeights(separatedParsedData);
    const {umapParams, handleUmapParamsChange} = useUmapParams();

    const umapProps = useMemo(() => {
        return {separatedParsedData, umapParams, weights}
        }, [separatedParsedData, umapParams, weights]);

    console.log(umapProps);
    const results = useUmap(umapProps);

    // const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12} sm={4}>
                {results && <EmbeddingChart data={results.to_display}/>}
            </Grid>
            <Grid item xs={12} sm={2}>
                <WeightingSliders columnNames={separatedParsedData?.unlabeledParsedData.columnNames} weights={weights}
                                  handleWeightsChange={handleWeightsChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <UmapControl params={umapParams} handleParamsChange={handleUmapParamsChange}/>
            </Grid>
        </Grid>
    )
}
