import React from 'react'
import { CSVReader } from 'react-papaparse'

interface UploadProps {
    readonly handleDataChange: (data: any, file?: any) => void;
}

export const Upload: React.FC<UploadProps> = (props) => {
    return (
            <CSVReader
                onDrop={props.handleDataChange}
                addRemoveButton>
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
    )
}