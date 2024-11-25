import L from 'leaflet';
import { EmergencyEvent } from 'tilannehuone-shared';

// Cache to store created icons
const iconCache = new Map<string, L.Icon>();

const MarkerIcon = (emergencyEvent: EmergencyEvent) => {
	const iconUrl = `https://www.tilannehuone.fi/halytys/kuvat/${
		emergencyEvent.icon ?? emergencyEvent.iconLowerQuality
	}`;

	// Create cache key using URL and priority
	const cacheKey = `${iconUrl}-${emergencyEvent.priority}`;

	// Return cached icon if it exists
	if (iconCache.has(cacheKey)) {
		return iconCache.get(cacheKey)!;
	}

	// Create new icon if not found in cache
	const icon = new L.Icon({
		iconUrl,
		className: 'w-5 h-5 rounded-full border-2 border-white shadow-marker',
		iconSize: [emergencyEvent.priority, emergencyEvent.priority],
		iconAnchor: [15, 30],
		popupAnchor: [0, -30],
	});

	// Cache the new icon
	iconCache.set(cacheKey, icon);

	return icon;
};

export default MarkerIcon;
