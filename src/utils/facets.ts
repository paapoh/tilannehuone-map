import { EmergencyEvent } from "@/app/types/emergency";

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

export function calculateFacets(data: EmergencyEvent[]): Facets {
  const typeCount = data.reduce((acc, item) => {
    if (item.type) {
      acc[item.type] = (acc[item.type] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const priorityCount = data.reduce((acc, item) => {
    if (item.priority) {
      acc[item.priority] = (acc[item.priority] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedTypes = Object.entries(typeCount).sort(([, a], [, b]) => b - a);

  const sortedPriorities = Object.entries(priorityCount).sort(
    ([, a], [, b]) => b - a
  );

  return {
    type: Object.fromEntries(sortedTypes),
    priority: Object.fromEntries(sortedPriorities),
    properties: {
      hasMedia: data.filter((item) => item.hasMedia).length,
      hasAdditionalInfo: data.filter((item) => item.hasAdditionalInfo).length,
      isNew: data.filter((item) => item.isNew).length,
      hasBetterLocation: data.filter((item) => item.hasBetterLocation).length,
    },
  };
}
