import {useEffect, useState} from "react";

export function useUnlabeledRows(rawRows: Record<'label' | string, number>[] | undefined) {

    const [unlabeledRows, setUnlabeledRows] = useState<undefined | Record<string, number>[]>(undefined);

    useEffect(() => {
        if (rawRows) {
            rawRows.forEach(item => delete item.label);
            setUnlabeledRows(rawRows)
        }
    }, [rawRows]);

    return unlabeledRows;
}