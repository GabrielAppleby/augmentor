import React, {useCallback, useState} from "react";
import {Grid} from "@material-ui/core";
import {Upload} from "./Upload";
import {EmbeddingTable} from "./EmbeddingTable";
// import {EmbeddingTable} from "./EmbeddingTable";

interface DataTileProps {

}

export const DataTile: React.FC<DataTileProps> = () => {
    const [data, setData] = useState<any[][]>([["test", "item"], [1, 2]]);

    const handleDataChange = useCallback((data) => {
        setData(data.map((item: any) => item.data))
    }, [])

    return (
        <Grid container>
            <Grid item xs={12}>
                <EmbeddingTable data={data}/>
            </Grid>
            <Grid item xs={12}>
                <Upload handleDataChange={handleDataChange}/>
            </Grid>
        </Grid>
    )
}