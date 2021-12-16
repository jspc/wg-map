import {
    Marker,
    Popup,
} from 'react-leaflet';

import { wireguardLogo } from './wireguardLogo';

import {
    FcUpload,
    FcDownload,
} from "react-icons/fc";

export default function ServerMarker(props) {
    let {pos, address, publicKey, received, sent} = props;

    return (
        <Marker key={publicKey} position={pos} icon={wireguardLogo} >
          <ServerPopup address={address} publicKey={publicKey} received={received} sent={sent} />
        </Marker>

    );
}

function ServerPopup(props) {
    let {address, publicKey, received, sent} = props;

    return (
          <Popup>
            <h2>Wireguard Server {address}</h2>
            <p>
              {publicKey}
            </p>
            <p>
              <FcUpload /> {received}
              <FcDownload /> {sent}
            </p>
          </Popup>
    );
}
