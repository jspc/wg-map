import React, {useState} from 'react';

import axios from 'axios';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
} from 'react-leaflet';

import ServerMarker from './serverMarker';
import PeerMarker from './peerMarker';

export default function Map(props) {
    const [server, setServer] = useState();
    const [peers,setPeers] = useState([]);

    React.useEffect(() => {
        axios.get(`http://192.168.10.1/stats`)
            .then(res => {
                if (res.data) {
                    const serverPos = [res.data.lat, res.data.long];

                    setServer(<ServerMarker pos={serverPos}
                                            address={res.data.address}
                                            publicKey={res.data.publicKey}
                                            received={res.data.received}
                                            sent={res.data.sent}
                              />);

                    setPeers(res.data.peer.map((o) => (
                        <PeerMarker serverPos={serverPos} peer={o} />
                    )));
                }
            })
            .catch(error => {
                console.log(error);
            });
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
          <MapContainer style={{ height: "50vh", width: "100vw" }}
                        center={[51.505, -0.09]}
                        zoom={3}
                        scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {server}
            {peers}
          </MapContainer>
        </>
    );
}
