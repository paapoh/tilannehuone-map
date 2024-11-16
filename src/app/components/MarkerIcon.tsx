import L from "leaflet";
import { EmergencyEvent } from "../types/emergency";

const MarkerIcon = (emergencyEvent: EmergencyEvent) => {

    return new L.Icon({
        iconUrl: `https://www.tilannehuone.fi/halytys/kuvat/${emergencyEvent.icon ?? emergencyEvent.iconLowerQuality}`,
        className: `w-5 h-5 rounded-full border-2 border-white shadow-marker`,
        iconSize: [emergencyEvent.priority, emergencyEvent.priority],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    });
}

export default MarkerIcon;
