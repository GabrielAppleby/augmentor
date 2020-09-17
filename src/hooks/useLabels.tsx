import {useEffect, useState} from "react";


export function useLabels(rawRows: Record<'label' | string, number>[] | undefined) {

    const [labels, setLabels] = useState<undefined | number[]>(undefined);

    useEffect(() => {
        if (rawRows) {
            const tempLabels = rawRows.map(item => item.label);
            setLabels(tempLabels);
        }
    }, [rawRows]);

    return labels;
}