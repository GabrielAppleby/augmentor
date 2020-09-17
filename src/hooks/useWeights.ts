import {useEffect, useState} from "react";


export function useWeights(columnNames: string[] | undefined) {

    const [weights, setWeights] = useState<undefined | Record<string, number>>(undefined);

    useEffect(() => {
        if (columnNames) {
            const tempWeights: Record<string, number> = {}
            columnNames.forEach(function (key) {
                tempWeights[key] = 1.0
            })
            setWeights(tempWeights)
        }
    }, [columnNames]);

    return {
        weights, setWeights
    };
}