import L, { MarkerCluster } from 'leaflet';

const createClusterCustomIcon = (cluster: MarkerCluster) => {
	const childCount = cluster.getChildCount();
	const iconSize = 30 + childCount / 7;
	return L.divIcon({
		html: `<div class="border-[1.5px] border-gray-500 rounded-full flex p- flex-col items-center justify-center size-full"><span class="font-semibold text-gray-600 text-[10px] leading-none">${childCount}</span></div>`,
		className:
			'rounded-full border-2 border-white bg-white shadow-marker text-center p-[1px]',
		iconSize: L.point(iconSize, iconSize, true),
	});
};

export default createClusterCustomIcon;
