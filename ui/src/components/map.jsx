import {
    MapContainer,
    TileLayer,
} from 'react-leaflet';

export default function Map(props) {
    const {server, peers} = props;

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
