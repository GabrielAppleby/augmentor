import React, {useCallback, useState} from 'react';
import './App.css';
import {DataPanel} from "./data/DataPanel";
import {DefaultAppBar} from "./DefaultAppBar";


function App() {

    const [data, setData] = useState<any[][] | null>(null);

    const handleDataChange = useCallback((data) => {
        setData(data.map((item: any) => item.data))
    }, [])

    return (
        <div className="App">
            <DefaultAppBar/>
            <DataPanel data={data} handleDataChange={handleDataChange}/>
        </div>
  );
}

export default App;
