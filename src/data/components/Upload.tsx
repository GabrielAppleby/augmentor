import React from 'react'
import { CSVReader } from 'react-papaparse'

interface UploadProps {
    readonly handleDataChange: (data: any, file?: any) => void;
}

export const Upload: React.FC<UploadProps> = (props) => {
    return (
        <div>
            <CSVReader onDrop={props.handleDataChange}
                       addRemoveButton
                       style={{
                           dropArea: {
                               borderRadius: 20,
                               height: 100,
                           }
                       }}>
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
        </div>
    )
}