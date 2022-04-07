import React, {useCallback, useState} from 'react';
import {UploadPage} from "./pages/UploadPage";
import {DefaultAppBar} from "./DefaultAppBar";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {ProjectionPage} from "./pages/ProjectionPage";
import {NumberParseResult} from "./components/Upload";
import {Snackbar} from "@material-ui/core";

// const useStyles = makeStyles({
//     app: {},
//     snackBar: {},
// });

export type DataRow = Record<string, number>;

export type LabelDataRow = DataRow & Record<'label' | string, number>

export interface ParsedData extends UnlabeledParsedData{
    rows: LabelDataRow[];
}

export interface UnlabeledParsedData  {
    columnNames: string[];
    rows: DataRow[];
}

export interface SeperatedParsedData  {
    unlabeledParsedData: UnlabeledParsedData;
    labels: number[];
}

export interface SnackBarStatus {
    readonly open: boolean;
    readonly message: string;
}

const defaultSnackBarStatus = {open: false, message: "This should not appear."};

function App() {

    console.log("App");

    const [parsedData, setParsedData] = useState<ParsedData | undefined>(undefined);
    const [snackBarStatus, setSnackBarStatus] = useState<SnackBarStatus>(defaultSnackBarStatus);

    const handleParsingError = useCallback(_ => setSnackBarStatus({open: true, message: "An error occurred parsing the CSV."}), [])
    const handleSnackBarClose = useCallback(() => setSnackBarStatus(defaultSnackBarStatus), []);

    const handleDataChange = useCallback((data: NumberParseResult[]) => {
        console.log("Handle data change");
        if (data.length > 0) {
            if (data[0].meta && data[0].meta.fields && data[0].data)
            {
                setParsedData({columnNames: data[0].meta.fields, rows: data.map(row => row.data)});
            }
            else
            {
                handleParsingError(undefined);
            }
        }
        else
        {
            handleParsingError(undefined);
        }
    }, [handleParsingError])

    // const classes = useStyles();

    return (
        // <div className={classes.app}>
        <div>
            <DefaultAppBar/>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <UploadPage parsedData={parsedData}
                                    handleDataChange={handleDataChange}
                                    handleParsingError={handleParsingError}/>
                    </Route>
                    {parsedData ?
                        <Route path="/embedding">
                            <ProjectionPage parsedData={parsedData}/>
                        </Route>
                        :
                        <Redirect to="/"/>
                    }
                </Switch>
                {/*<Snackbar className={classes.snackBar}*/}
                <Snackbar
                          anchorOrigin={{vertical: "top", horizontal: "center"}}
                          open={snackBarStatus.open}
                          autoHideDuration={3000}
                          onClose={handleSnackBarClose}
                          message={snackBarStatus.message}/>
            </Router>
        </div>
    );
}

export default App;
