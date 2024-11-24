import { EmergencyEvent } from '@/app/types/emergency';
import { Facets } from './facets';

export interface Filters {
	type: string[];
	priority: string[];
	properties: (keyof Facets['properties'] | string)[];
}

export const DEFAULT_FILTERS: Filters = {
	type: [],
	priority: [],
	properties: [],
};

export const filterDataFunction = (
	emergencyEvent: EmergencyEvent,
	filters: Filters,
): boolean => {
	return Object.entries(filters).some(([facetCategory, filterValue]) => {
		const facetValue =
			facetCategory === 'properties'
				? filterValue.some(
						(value: keyof Facets['properties']) =>
							emergencyEvent[value],
					)
				: filterValue.includes(
						emergencyEvent[
							facetCategory as keyof EmergencyEvent
						]?.toString(),
					);
		return facetValue;
	});
};

export const filterDataByTimestamp = (
	emergencyEvent: EmergencyEvent,
	timeToShow: number,
): boolean => {
	// Parse the date string in DD.MM.YYYY HH:mm:ss format
	const [datePart, timePart] = emergencyEvent.timestamp.split(' ');
	const [day, month, year] = datePart.split('.');
	const [hours, minutes, seconds] = timePart.split(':');

	const timestamp = new Date(
		parseInt(year),
		parseInt(month) - 1, // Months are 0-based in JavaScript
		parseInt(day),
		parseInt(hours),
		parseInt(minutes),
		parseInt(seconds),
	).getTime();

	const timeToShowDate = new Date().getTime() - timeToShow * 60 * 60 * 1000;
	return timestamp > timeToShowDate;
};
