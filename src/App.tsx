import React, {useCallback, useState} from 'react';
import {UploadPage} from "./pages/UploadPage";
import {DefaultAppBar} from "./DefaultAppBar";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {ProjectionPage} from "./pages/ProjectionPage";
import {makeStyles} from '@material-ui/core/styles';
import {NumberParseResult} from "./components/Upload";

const useStyles = makeStyles({
    app: {},
});

function App() {

    const [columnNames, setColumnNames] = useState<string[] | undefined>(undefined);
    const [rows, setRows] = useState<Record<'label' | string, number>[] | undefined>(undefined);

    const handleDataChange = useCallback((data: NumberParseResult[]) => {
        if (data.length > 0) {
            setColumnNames(data[0].meta.fields)
            setRows(data.map(row => row.data))
        }
    }, [])

    const columnNamesNoLabel = columnNames ? [...columnNames]: undefined;
    if (columnNamesNoLabel)
    {
        columnNamesNoLabel.pop();
    }

    const classes = useStyles();

    return (
        <div className={classes.app}>
            <DefaultAppBar/>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <UploadPage columnNames={columnNames} rows={rows} handleDataChange={handleDataChange}/>
                    </Route>
                    {rows ?
                        <Route path="/embedding">
                            <ProjectionPage columnNames={columnNamesNoLabel} rawRows={rows}/>
                        </Route>
                        :
                        <Redirect to="/"/>
                    }
                </Switch>
            </Router>
        </div>
    );
}

export default App;
