import { parseEmergencyData, parseEmergencyTranslations, transformEmergencyData } from 'tilannehuone-shared'
export const fetchData = async () => {
    try {
        const response = await fetch(
            'https://www.tilannehuone.fi/halytysmap.php?zoom=&aikavali=48',
            {
                cache: 'no-store',
            },
        );
        const text = await response.text();

        const emergencyTranslations = parseEmergencyTranslations(text);
        const emergencyData = parseEmergencyData(text);

        const transformedData = transformEmergencyData(
            emergencyData,
            emergencyTranslations,
        );

        return transformedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        if (error instanceof SyntaxError) {
            return {
                error: 'JSON parsing failed',
                message: error.message,
            }
        }
        return {
            error: 'Failed to fetch data',
        }
    }
}
