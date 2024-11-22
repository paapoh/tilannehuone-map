'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from '@/components/ui/card';
import { EmergencyEvent } from '../types/emergency';
import MarkerIcon from './MarkerIcon';
import { calculateFacets } from '@/utils/facets';
import {
	DEFAULT_FILTERS,
	filterDataByTimestamp,
	filterDataFunction,
	Filters,
} from '@/utils/filters';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import StatisticDrawer from './StatisticDrawer';
import { Filter, Info, PanelRightOpen } from 'lucide-react';
import FilterDrawer from './FilterDrawer';
import SideDrawer from './SideDrawer';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import createClusterCustomIcon from './ClusterIcon';

const getMapData = async (): Promise<EmergencyEvent[]> => {
	const response = await fetch('/api/map');
	const data = await response.json();
	return data;
};

const MapComponent = ({ isDebug }: { isDebug: boolean }) => {
	const [emergencyEvents, setEmergencyEvents] = useState<EmergencyEvent[]>(
		[],
	);
	const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
	const [timeToShow, setTimeToShow] = useState<number>(24);

	const facets = useMemo(
		() => calculateFacets(emergencyEvents, timeToShow),
		[emergencyEvents, timeToShow],
	);

	const hasFilters = useMemo(() => {
		return Object.values(filters).some((filter) => filter.length > 0);
	}, [filters]);

	useEffect(() => {
		getMapData().then((data) => {
			setEmergencyEvents(data);
		});
	}, []);

	return (
		<div className="mx-auto size-full relative">
			<Drawer>
				<DrawerTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="absolute top-4 left-4 z-[1000]"
					>
						<Info />
					</Button>
				</DrawerTrigger>
				<StatisticDrawer facets={facets} />
			</Drawer>
			<Drawer>
				<DrawerTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="absolute top-4 left-16 z-[1000]"
					>
						<Filter />
					</Button>
				</DrawerTrigger>
				<FilterDrawer
					filters={filters}
					setFilters={setFilters}
					facets={facets}
					hasFilters={hasFilters}
					timeToShow={timeToShow}
					setTimeToShow={setTimeToShow}
				/>
			</Drawer>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="absolute top-4 left-28 z-[1000]"
					>
						<PanelRightOpen />
					</Button>
				</SheetTrigger>
				<SideDrawer content={emergencyEvents} />
			</Sheet>

			<Card className="size-full">
				<CardContent className="p-0 size-full">
					<MapContainer
						center={[65.001515, 25.427857]}
						zoomControl={false}
						zoom={6}
						className="size-full rounded-md overflow-hidden"
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
							url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
							zIndex={1}
						/>
						<MarkerClusterGroup
							maxClusterRadius={40}
							iconCreateFunction={createClusterCustomIcon}
						>
							{emergencyEvents
								.filter((emergencyEvent) =>
									filterDataByTimestamp(
										emergencyEvent,
										timeToShow,
									),
								)
								.filter((emergencyEvent) =>
									hasFilters
										? filterDataFunction(
												emergencyEvent,
												filters,
											)
										: true,
								)
								.map((emergencyEvent) => (
									<Marker
										key={emergencyEvent.id}
										position={emergencyEvent.position}
										icon={MarkerIcon(emergencyEvent)}
									>
										<Popup>
											{isDebug ? (
												<DebugEmergencyEventInfo
													emergencyEvent={
														emergencyEvent
													}
												/>
											) : (
												<EmergencyEventInfo
													emergencyEvent={
														emergencyEvent
													}
												/>
											)}
										</Popup>
									</Marker>
								))}
						</MarkerClusterGroup>
					</MapContainer>
				</CardContent>
			</Card>
		</div>
	);
};

const DebugEmergencyEventInfo = ({
	emergencyEvent,
}: {
	emergencyEvent: EmergencyEvent;
}) => {
	const variables = emergencyEvent.variables;
	const variablesDecimal = parseInt(variables.join(''), 2);

	return (
		<div className="flex flex-col gap-1">
			{Object.entries(emergencyEvent).map(([key, value]) => (
				<span key={key}>
					<strong>{key}:</strong> {value}
					{key === 'variables' && <pre>{variablesDecimal}</pre>}
				</span>
			))}
		</div>
	);
};

const EmergencyEventInfo = ({
	emergencyEvent,
}: {
	emergencyEvent: EmergencyEvent;
}) => {
	return (
		<div className="flex flex-col gap-1">
			<strong>{emergencyEvent.location}</strong>
			<span>{emergencyEvent.type}</span>
			<div
				dangerouslySetInnerHTML={{
					__html: emergencyEvent.description ?? '',
				}}
			/>
		</div>
	);
};

export default MapComponent;
