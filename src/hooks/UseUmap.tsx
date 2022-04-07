import {UMAP, UMAPParameters} from 'umap-js';
import {useEffect, useMemo, useState} from "react";
import {DataRow, SeperatedParsedData, UnlabeledParsedData} from "../App";
import * as heap from "umap-js/dist/heap";


interface FitResults
{
    embedding: number[][];
    graph: heap.Heap | undefined;
}

interface UmapProps
{
    separatedParsedData?: SeperatedParsedData,
    umapParams: UMAPParameters,
    weights?: DataRow
}

interface umapResults
{
    fitResults?: FitResults,
    to_display: number[][]
}

const runUmap = (separatedParsedData: SeperatedParsedData, umapParams: UMAPParameters, weights: DataRow, results?: umapResults): umapResults => {
    const fitResults = results?.fitResults;
    const newRows = separatedParsedData.unlabeledParsedData.rows.map((obj) => {
        const tempObj = {...obj};
        Object.entries(weights).forEach(([key, val], idx) => {
            tempObj[key] = obj[key] * val
        })
        return Object.values(tempObj);
    })
    const umap = new UMAP(umapParams);
    let newResults;
    if (fitResults && fitResults.graph)
    {
        umap.setPrecomputedEmbedding(fitResults.embedding);
        umap.setPrecomputedGraph(fitResults.graph)
        const nEpochs = umap.initializeFit(newRows);
        for (let i = 0; i < nEpochs; i++) {
            umap.step();
        }
        newResults = umap.getEmbedding();
    }
    else {

        newResults = umap.fit(newRows);
    }

    console.log("This should never run twice");

    const to_display = newResults.embedding.map((item, idx) => {
        const newItem = [...item]
        newItem.push(separatedParsedData.labels[idx]);
        return newItem;
    })

    return {fitResults: newResults, to_display};
}


export function useUmap(umapProps: UmapProps) {

    const [results, setResults] = useState<umapResults>();

    useEffect(() => {
        if (umapProps.separatedParsedData && umapProps.weights)
        {
            console.log("because theere is no other reason this should run")
            const tempResults = runUmap(umapProps.separatedParsedData, umapProps.umapParams, umapProps.weights, results);
            setResults(tempResults)
        }
    }, [umapProps]);

    return results
}
