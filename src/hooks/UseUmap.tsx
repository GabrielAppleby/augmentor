import {UMAP, UMAPParameters} from 'umap-js';
import {useEffect, useState} from "react";

export function useUmap(data: Record<string, number>[] | undefined, umapParams: UMAPParameters, weights: Record<string, number> | undefined, initialProjection?: number[][]) {

    const [results, setResults] = useState<undefined | number[][]>(undefined);

    useEffect(() => {
        if (data && umapParams && weights) {
            const rows = data.map((obj) => {
                const tempObj = {...obj};
                Object.entries(weights).forEach(([key, val], idx) => {
                    tempObj[key] = obj[key] * val
                })
                return Object.values(tempObj);
            })
            const umap = new UMAP(umapParams);
            if (initialProjection && initialProjection.length > 0)
            {
                if (initialProjection[0].length > 2)
                {
                    initialProjection.forEach(item => item.pop());
                }
                umap.setPrecomputedEmbedding(initialProjection);
            }
            const embedding = [...umap.fit(rows)];
            setResults(embedding);
        }
    }, [data, umapParams, weights]);

    return results;
}