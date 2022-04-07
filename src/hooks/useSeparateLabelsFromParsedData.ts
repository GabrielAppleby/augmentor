import {useEffect, useState} from "react";
import {ParsedData, SeperatedParsedData, UnlabeledParsedData} from "../App";




const createUnlabeledParsedData = (parsedData: ParsedData) => {
    const unlabeledRows = parsedData.rows.map((item) => {
        return {...item}
    })
    const newLabels: number[] = []
    // Javascript is a nightmare
    unlabeledRows.forEach(item => {
        newLabels.push(item.label);
    })
    // unlabeledRows.forEach(item => {
    //     delete item.label;
    // })
    // This is really shitty. I know that labels should be the last column or now..
    // This will go away when we get real csv validation.
    const columnNamesNoLabel = [...parsedData.columnNames];
    columnNamesNoLabel.pop();

    const newUnlabeledParsedData = {rows: unlabeledRows, columnNames: columnNamesNoLabel};

    console.log("separate those labels")

    return {unlabeledParsedData: newUnlabeledParsedData, labels: newLabels};
}


export function useSeparateLabelsFromParsedData(parsedData: ParsedData) {

    const [separatedParsedData, setSeparatedParsedData] = useState<SeperatedParsedData | undefined>(undefined);

    useEffect(() => {
        console.log("Does parsed data change??")
        const newSeparatedParsedData = createUnlabeledParsedData(parsedData);
        setSeparatedParsedData(newSeparatedParsedData)
    }, [parsedData]);

    return separatedParsedData;
}
