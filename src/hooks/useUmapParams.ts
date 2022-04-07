import {useCallback, useEffect, useState} from "react";
import {UMAPParameters} from "umap-js";


const INITIAL_UMAP_PARAMS = {
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
};

export function useUmapParams() {

    const [umapParams, setUmapParams] = useState<UMAPParameters>(INITIAL_UMAP_PARAMS)

    const handleUmapParamsChange = useCallback((params: UMAPParameters) => {
        setUmapParams(params)
    }, [])

    return {
        umapParams, handleUmapParamsChange
    };
}
