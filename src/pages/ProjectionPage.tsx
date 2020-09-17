import React, {useCallback, useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {useUmap} from "../hooks/UseUmap";
import {EmbeddingChart} from "../components/EmbeddingChart";
import {UmapControl} from "../components/UmapControl";
import {UMAPParameters} from "umap-js";
import {WeightingSliders} from "../components/WeightingSliders";
import {useUnlabeledRows} from "../hooks/useUnlabeledRows";
import {useWeights} from "../hooks/useWeights";
import {useLabels} from "../hooks/useLabels";
import {makeStyles} from "@material-ui/core/styles";

interface ProjectionPageProps {
    readonly columnNames: string[] | undefined;
    readonly rawRows: Record<'label' | string, number>[];
}

const useStyles = makeStyles({
    controlGridItem: {
        margin: "auto"
    },
});

export const ProjectionPage: React.FC<ProjectionPageProps> = ({columnNames, rawRows}) => {
    const labels = useLabels(rawRows);
    const unlabeledRows = useUnlabeledRows(rawRows)
    const {weights, setWeights} = useWeights(columnNames);
    const [labeledProjection, setLabeledProjection] = useState<undefined | number[][]>(undefined);
    const [umapParams, setUmapParams] = useState<UMAPParameters>(
        {
            learningRate: 1.0,
            localConnectivity: 1.0,
            minDist: 0.1,
            nComponents: 2,
            nNeighbors: 15,
            negativeSampleRate: 5,
            repulsionStrength: 1.0,
            setOpMixRatio: 1.0,
            spread: 1.0,
            transformQueueSize: 4.0
        })


    const handleWeightsChange = useCallback((key: string, value: number) => {
        const tempWeights: Record<string, number> = {...weights}
        tempWeights[key] = value;
        setWeights(tempWeights)
    }, [weights, setWeights])

    const results = useUmap(unlabeledRows, umapParams, weights, labeledProjection)

    useEffect(() => {
        if (results && labels) {
            results.forEach((item, idx) => item.push(labels[idx]))
            setLabeledProjection(results)
        }
    }, [results, labels]);


    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12} sm={4}>
                {labeledProjection && <EmbeddingChart data={labeledProjection}/>}
            </Grid>
            <Grid item className={classes.controlGridItem} xs={12} sm={2}>
                <WeightingSliders columnNames={columnNames} weights={weights}
                                  handleWeightsChange={handleWeightsChange}/>
            </Grid>
            <Grid item className={classes.controlGridItem} xs={12} sm={6}>
                <UmapControl params={umapParams} setParams={setUmapParams}/>
            </Grid>
        </Grid>
    )
}