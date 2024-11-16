import {
  EmergencyEvent,
  EmergencyTranslation,
  parseEmergencyData,
  parseEmergencyTranslations,
  RawEmergencyData,
} from "@/app/types/emergency";

function transformEmergencyData(
  rawData: RawEmergencyData[],
  translations: EmergencyTranslation[]
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

export async function GET() {
  try {
    const response = await fetch(
      "https://www.tilannehuone.fi/halytysmap.php?zoom=&aikavali=48"
    );
    const text = await response.text();

    const emergencyTranslations = parseEmergencyTranslations(text);
    const emergencyData = parseEmergencyData(text);

    const transformedData = transformEmergencyData(
      emergencyData,
      emergencyTranslations
    );

    return Response.json(transformedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error instanceof SyntaxError) {
      return Response.json(
        {
          error: "JSON parsing failed",
          message: error.message,
        },
        { status: 500 }
      );
    }
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
