import React, {useCallback, useState} from 'react';
import './App.css';
import {DataPanel} from "./panels/DataPanel";
import {DefaultAppBar} from "./DefaultAppBar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {EmbeddingPanel} from "./panels/EmbeddingPanel";
import {ParseResult} from "papaparse";


function App() {

    const [header, setHeader] = useState<string[] | undefined>(undefined);
    const [data, setData] = useState<number[][] | undefined>(undefined);

    const handleDataChange = useCallback((data: ParseResult<string>[]) => {
        const rows = data.map((item) => item.data);
        setHeader(rows[0])
        const numericalData = rows.slice(1).map((row) => row.map((numberStr) => parseFloat(numberStr)));
        setData(numericalData);
    }, [])

    return (
        <div className="App">
            <DefaultAppBar/>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <DataPanel header={header} data={data} handleDataChange={handleDataChange}/>
                    </Route>
                    <Route path="/embedding">
                        {data && <EmbeddingPanel data={data}/>}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
