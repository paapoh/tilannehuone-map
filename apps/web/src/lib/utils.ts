import { EmergencyEvent } from 'tilannehuone-shared';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Marker } from 'leaflet';
import { RefObject } from 'react';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function searchFrom(events: EmergencyEvent[], searchTerm: string) {
	return events.filter(
		(item) =>
			item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.timestamp?.includes(searchTerm) ||
			item.location?.toLowerCase().includes(searchTerm.toLowerCase()),
	);
}

export const findMarkerByPosition = (
	position: [number, number],
	markerRefs: RefObject<Marker[]>,
): Marker | null => {
	if (markerRefs.current) {
		for (const marker of markerRefs.current) {
			const markerLatLng = marker.getLatLng();
			if (
				Math.abs(markerLatLng.lat - position[0]) < 0.00001 && // Adjust tolerance as needed
				Math.abs(markerLatLng.lng - position[1]) < 0.00001
			) {
				return marker;
			}
		}
	}
	return null;
};
