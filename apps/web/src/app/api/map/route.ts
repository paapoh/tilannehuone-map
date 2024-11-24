import {
	parseEmergencyData,
	parseEmergencyTranslations,
} from 'tilannehuone-shared';

import { transformEmergencyData } from 'tilannehuone-shared';

export async function GET() {
	try {
		const response = await fetch(
			'https://www.tilannehuone.fi/halytysmap.php?zoom=&aikavali=48',
			{
				next: {
					revalidate: 600,
				},
			},
		);
		const text = await response.text();

		const emergencyTranslations = parseEmergencyTranslations(text);
		const emergencyData = parseEmergencyData(text);

		const transformedData = transformEmergencyData(
			emergencyData,
			emergencyTranslations,
		);

		return Response.json(transformedData);
	} catch (error) {
		console.error('Error fetching data:', error);
		if (error instanceof SyntaxError) {
			return Response.json(
				{
					error: 'JSON parsing failed',
					message: error.message,
				},
				{ status: 500 },
			);
		}
		return Response.json(
			{ error: 'Failed to fetch data' },
			{ status: 500 },
		);
	}
}
