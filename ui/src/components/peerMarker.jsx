import {
    Marker,
    Popup,
    Polyline
} from 'react-leaflet';
import Gravatar from 'react-gravatar';
import {
    FcUpload,
    FcDownload,
} from "react-icons/fc";

import Curve from './curve';
import Timestamp from './timestamp';

export default function PeerMarker(props) {
    const {peer, serverPos} = props;
    const pos = [peer.addr.lat, peer.addr.long];

    return (
        <span key={peer.publicKey} >
          <Marker position={pos}>
            <PeerPopup peer={peer} />
          </Marker>
          <Polyline pathOptions={{color: 'black'}} positions={Curve({server: serverPos, peer: pos})} />
        </span>

    );
}

function PeerPopup(props) {
    const {peer} = props;

    return (
        <Popup>
          <div className="popup">
            <Gravatar email={peer.owner.email} default="robohash" size={50} />

            <h2>
              {peer.owner ? peer.owner.name : peer.publicKey}
            </h2>

            <FcUpload /> {peer.received}
            <FcDownload /> {peer.sent}
          </div>
          <div>
            <p>
              <i>Last seen: <Timestamp when={peer.handshake}/></i>
            </p>

            <pre>
              {peer.addr ? peer.addr.addr : peer.address}
            </pre>

            <pre>
              {peer.addr ?
               peer.addr.isp :
               ''
              }
            </pre>
          </div>
        </Popup>
    );
}
