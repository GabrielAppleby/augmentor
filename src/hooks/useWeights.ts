import {useCallback, useEffect, useState} from "react";
import {SeperatedParsedData} from "../App";


const createWeights = (columnNames: string[]) => {
    const tempWeights: Record<string, number> = {}
    columnNames.forEach(function (key) {
        tempWeights[key] = 1.0
    })

    console.log("use those weights")


    return tempWeights;
}

export function useWeights(seperatedParsedData: SeperatedParsedData | undefined) {

    const [weights, setWeights] = useState<Record<string, number>>();

    useEffect(() => {
        if (seperatedParsedData)
        {
            const tempWeights = createWeights(seperatedParsedData.unlabeledParsedData.columnNames);
            setWeights(tempWeights);
        }

    }, [seperatedParsedData]);

    const handleWeightsChange = useCallback((key: string, value: number) => {
        const tempWeights: Record<string, number> = {...weights}
        tempWeights[key] = value;
        setWeights(tempWeights)
    }, [weights])

    return {
        weights, handleWeightsChange
    };
}
