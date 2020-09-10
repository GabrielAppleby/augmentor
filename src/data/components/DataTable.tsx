import React from "react";
import MUIDataTable from "mui-datatables";

interface EmbeddingTableProps {
    readonly data: any[][];
}

export const DataTable: React.FC<EmbeddingTableProps> = (props) => {

    const header = props.data[0];
    const body = props.data.slice(1);

    return (
        <MUIDataTable
            title={"Employee List"}
            data={body}
            columns={header}
        />
    );
}