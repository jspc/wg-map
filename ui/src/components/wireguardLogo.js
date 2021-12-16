import L from 'leaflet';
import l from '../img/wireguard.png';

const wireguardLogo = new L.Icon({
    iconUrl: l,
    iconRetinaUrl: l,
    iconAnchor: [0,0],
    popupAnchor: [0,0],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(35, 35),
    className: 'empty'
});

export { wireguardLogo };
