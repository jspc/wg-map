import './App.css';

import React, {useState} from 'react';
import axios from 'axios';

import ServerMarker from './components/serverMarker';
import PeerMarker from './components/peerMarker';

import Map from './components/map';
import Table from './components/table';
import {PeerRow} from './components/peerTable';

const gateway = process.env.REACT_APP_GATEWAY || 'http://gateway';

function App() {
    const [serverMarker, setServerMarker] = useState();
    const [peerMarkers,setPeerMarkers] = useState([]);

    const [data,setData] = useState();
    const [peerRows,setPeerRows] = useState();

    const getStats = async () => {
        try {
            const res = await axios.get(`${gateway}/stats`);
            if (res.data) {
                setData(res.data);

                const serverPos = [res.data.lat, res.data.long];

                setServerMarker(<ServerMarker pos={serverPos}
                                         address={res.data.address}
                                         publicKey={res.data.publicKey}
                                         received={res.data.received}
                                         sent={res.data.sent}
                            />);

                setPeerRows(res.data.peer.map((o) => (
                    <PeerRow peer={o} />
                )));

                setPeerMarkers(res.data.peer.map((o) => (
                    <PeerMarker serverPos={serverPos} peer={o} />
                )));
            }
        } catch (error) {
           console.log(error);
        }
    };

    React.useEffect(() => {
        getStats();

        const interval = setInterval(()=>{
            getStats();
        }, 30000);

        return ()=>clearInterval(interval);
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
            <div className="App">
              <h1>
                Wireguard ❤️
              </h1>

              <Map server={serverMarker} peers={peerMarkers} />
              <Table data={data} peerRows={peerRows} />
            </div>
    );
}

export default App;
