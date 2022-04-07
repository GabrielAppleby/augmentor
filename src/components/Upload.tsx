import React from 'react'
import {CSVReader} from 'react-papaparse'
import {ParseError, ParseMeta} from "papaparse";

export interface NumberParseResult {
    data: Record<'label' | string, number>;
    errors: ParseError[];
    meta: ParseMeta;
}

interface UploadProps {
    readonly handleDataChange: (data: NumberParseResult[]) => void;
    readonly handleUploadError: (error: any) => void;
}

export const Upload: React.FC<UploadProps> = ({handleDataChange, handleUploadError}) => {
    console.log("Upload component.")

    return (
        <CSVReader onFileLoad={handleDataChange}
                   onError={handleUploadError}
                   addRemoveButton
                   noDrag
                   config={{
                       dynamicTyping: true,
                       header: true
                   }}
                   style={{
                       dropArea: {
                           borderRadius: 20,
                           height: 100,
                       }
                   }}>
            <span>UPLOAD</span>
        </CSVReader>
    )
}
