import React from 'react'
import {CSVReader} from 'react-papaparse'
import {ParseResult} from "papaparse";

interface UploadProps {
    readonly handleDataChange: (data: ParseResult<string>[]) => void;
}

export const Upload: React.FC<UploadProps> = (props) => {
    return (
        <div>
            <CSVReader onFileLoad={props.handleDataChange}
                       onError={blah => console.log(blah)}
                       onRemoveFile={blah => console.log(blah)}
                       addRemoveButton
                       noDrag
                       style={{
                           dropArea: {
                               borderRadius: 20,
                               height: 100,
                           }
                       }}>
                <span>Click to upload.</span>
            </CSVReader>
        </div>
    )
}