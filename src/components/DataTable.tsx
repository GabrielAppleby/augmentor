import React from "react";
import MUIDataTable from "mui-datatables";

interface EmbeddingTableProps {
    readonly data: any[][];
    readonly header: string[];
}

export const DataTable: React.FC<EmbeddingTableProps> = (props) => {

    const header = props.header
    const body = props.data;

    return (
        <MUIDataTable
            title={"Employee List"}
            data={body}
            columns={header}
        />
    );
}