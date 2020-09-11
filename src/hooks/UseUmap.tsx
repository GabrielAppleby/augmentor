import {UMAP} from 'umap-js';
import {useEffect, useState} from "react";

export function useUmap(data: undefined | number[][]) {

    const [results, setResults] = useState<undefined | number[][]>(undefined);

    useEffect(() => {
        if (data) {
            const umap = new UMAP();
            const embedding = umap.fit(data);
            setResults(embedding);
        }
    }, [data]);

    return {
        results
    };
}