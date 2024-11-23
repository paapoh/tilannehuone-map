import { EmergencyEvent, EmergencyTranslation, RawEmergencyData } from "../types/emergency";

export function transformEmergencyData(
    rawData: RawEmergencyData[],
    translations: EmergencyTranslation[],
): EmergencyEvent[] {
    return rawData.map((item) => ({
        id: item.h,
        timestamp: item.d,
        position: item.pos,
        location: translations[item.p] || null,
        type: translations[item.t] || null,
        locationIndex: item.p,
        typeIndex: item.t,
        icon: item.iconhi,
        iconLowerQuality: item.icon,
        description:
            item.txt?.replace('src="/', 'src="https://www.tilannehuone.fi/') ||
            undefined,
        variables: item.var,
        hasAdditionalInfo: item.var[0] === 1,
        isNew: item.var[1] === 1,
        hasBetterLocation: item.var[2] === 1,
        hasMedia: item.var[3] === 1,
        priority: item.icons,
    }));
}
