import { EmergencyEvent } from '@/app/types/emergency';
import { filterDataByTimestamp } from './filters';

export interface Facets {
	type: Record<string, number>;
	priority: Record<string, number>;
	properties: {
		hasMedia: number;
		hasAdditionalInfo: number;
		isNew: number;
		hasBetterLocation: number;
	};
}

export function calculateFacets(
	data: EmergencyEvent[],
	timeToShow: number,
): Facets {
	const filteredData = data.filter((item) =>
		filterDataByTimestamp(item, timeToShow),
	);
	const typeCount = filteredData.reduce((acc, item) => {
		if (item.type) {
			acc[item.type] = (acc[item.type] || 0) + 1;
		}
		return acc;
	}, {} as Record<string, number>);

	const priorityCount = filteredData.reduce((acc, item) => {
		if (item.priority) {
			acc[item.priority] = (acc[item.priority] || 0) + 1;
		}
		return acc;
	}, {} as Record<string, number>);

	const sortedTypes = Object.entries(typeCount).sort(([, a], [, b]) => b - a);

	const sortedPriorities = Object.entries(priorityCount).sort(
		([, a], [, b]) => b - a,
	);

	return {
		type: Object.fromEntries(sortedTypes),
		priority: Object.fromEntries(sortedPriorities),
		properties: {
			hasMedia: filteredData.filter((item) => item.hasMedia).length,
			hasAdditionalInfo: filteredData.filter(
				(item) => item.hasAdditionalInfo,
			).length,
			isNew: filteredData.filter((item) => item.isNew).length,
			hasBetterLocation: filteredData.filter(
				(item) => item.hasBetterLocation,
			).length,
		},
	};
}
