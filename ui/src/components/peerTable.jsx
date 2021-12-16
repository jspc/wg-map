import React, {useState} from 'react';

import Flag from 'react-world-flags';

import Timestamp from './timestamp';
import { ByName } from './countryCode';

function PeerRow(props) {
    const {peer} = props;

    return (
        <tr>
          <td>
            <Flag
              code={ByName(peer.addr.country)}
              height={16}
            />
          </td>
          <td title={peer.owner.email}>
            {peer.owner.name}
          </td>
          <td>
            {peer.addr.city}
          </td>
          <td>
            {peer.allowedIPs}
          </td>
          <td title={peer.addr.ptr}>
            {peer.addr.addr}
          </td>
          <td>
            {peer.sent}
          </td>
          <td>
            {peer.received}
          </td>
          <td>
            <Timestamp when={peer.handshake}/>
          </td>
        </tr>
    );
}

export default function PeerTable(props) {
    const {data} = props;
    const [peers, setPeers] = useState([]);

    React.useEffect(() => {
        setPeers(
            data && data.peer.map((o) => (
            <PeerRow peer={o}/>
        )));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
          <h3>Peers</h3>

          <table className="stats">
            <thead>
              <tr>
                <th>
                </th>
                <th>
                  Peer
                </th>
                <th>
                  City
                </th>
                <th>
                  IP Address
                </th>
                <th>
                  Peer Address
                </th>
                <th>
                  Sent
                </th>
                <th>
                  Received
                </th>
                <th>
                  Last Seen
                </th>
              </tr>
            </thead>

            <tbody>
              { peers }
            </tbody>
          </table>
        </>
    );
}