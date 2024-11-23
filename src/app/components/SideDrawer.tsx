'use client';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { EmergencyEvent } from '../types/emergency';
import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { findMarkerByPosition, searchFrom } from '@/lib/utils';
import { Map, Marker } from 'leaflet';
interface SideDrawerProps {
	content: EmergencyEvent[];
	map: RefObject<Map>;
	setSheetOpen: Dispatch<SetStateAction<boolean>>;
	markers: RefObject<Marker[]>;
}
const SideDrawer: React.FC<SideDrawerProps> = ({
	content,
	map,
	markers,
	setSheetOpen,
}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	const handleClick = (event: EmergencyEvent) => {
		map.current?.flyTo(event.position, 15);
		setSheetOpen(false);
		const foundMarker = findMarkerByPosition(event.position, markers);
		map.current?.on('moveend', () => {
			foundMarker ? foundMarker.openPopup() : null;
		});
	};
	return (
		<SheetContent className="z-[1000]">
			<SheetHeader className="mb-3">
				<SheetTitle>Listaus tapahtumista</SheetTitle>
				<Input
					placeholder="Tyyppi, paikka, aika"
					value={searchTerm}
					onChange={handleChange}
				/>
			</SheetHeader>
			<div className="overflow-y-auto max-h-full">
				{searchFrom(content, searchTerm).map((item) => {
					return (
						<div
							key={item.id}
							className="hover:bg-gray-50 cursor-pointer"
							onClick={(_) => handleClick(item)}
						>
							<span className="font-bold">{item.location}</span>{' '}
							<span>{item.timestamp}</span>
							<p className="mb-4">{item.type}</p>
						</div>
					);
				})}
			</div>
		</SheetContent>
	);
};
export default SideDrawer;
