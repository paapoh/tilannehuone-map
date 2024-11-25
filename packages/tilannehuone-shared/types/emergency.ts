export type Position = [number, number]; // [latitude, longitude]
export type Variables = [number, number, number, number];

export interface RawEmergencyData {
    h: string; // hash/id
    d: string; // date/timestamp
    pos: Position; // position
    p: number; // priority
    t: number; // type
    icon: string; // icon path
    iconhi: string; // highlighted icon path
    txt?: string; // description text
    var: Variables; // variables array
    icons: number; // icons count
}

export interface EmergencyEvent {
    id: string;
    timestamp: string;
    position: Position;
    locationIndex: number;
    typeIndex: number;
    location: string | null;
    type: string | null;
    icon: string;
    iconLowerQuality: string;
    description?: string;
    variables: Variables;
    hasAdditionalInfo: boolean;
    hasMedia: boolean;
    isNew: boolean;
    hasBetterLocation: boolean;
    priority: number;
}

export type EmergencyTranslation = string;

// Function to parse the translations from the response
export function parseEmergencyTranslations(
    text: string,
): EmergencyTranslation[] {
    const startMarker = 'var halytrans = ';
    const endMarker = ';\n';

    const startIndex = text.indexOf(startMarker) + startMarker.length;
    const endIndex = text.indexOf(endMarker, startIndex);

    if (startIndex === -1 || endIndex === -1) {
        throw new Error('Could not find halytrans data');
    }

    const translationsJson = text.substring(startIndex, endIndex).trim();
    return JSON.parse(translationsJson);
}

export function parseEmergencyData(text: string): RawEmergencyData[] {
    const startMarker = 'var halytykset = ';
    const endMarker = ';\n';

    const startIndex = text.indexOf(startMarker) + startMarker.length;
    const endIndex = text.indexOf(endMarker, startIndex);

    if (startIndex === -1 || endIndex === -1) {
        throw new Error('Could not find halytykset data');
    }

    const halytyksetJson = text.substring(startIndex, endIndex).trim();
    return JSON.parse(halytyksetJson);
}

