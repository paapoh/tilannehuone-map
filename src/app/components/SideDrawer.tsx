'use client';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

import { EmergencyEvent } from '../types/emergency';
import {
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
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
	const [results, setResults] = useState<EmergencyEvent[]>(content || []);
	const [filteredResults, setFilteredResults] = useState<EmergencyEvent[]>(
		[],
	);
	const [debouncedSearch, setDebouncedSearch] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDebouncedSearch(e.target.value);
	};

	const handleClick = (event: EmergencyEvent) => {
		map.current?.flyTo(event.position, 15);
		setSheetOpen(false);
		const foundMarker = findMarkerByPosition(event.position, markers);
		map.current?.on('moveend', () => {
			foundMarker ? foundMarker.openPopup() : null;
		});
	};

	useEffect(() => {
		if (content?.length) {
			setResults(content);
			setFilteredResults(content);
		}
	}, [content]);

	useEffect(() => {
		const handler = setTimeout(() => {
			let updatedResults = results;

			if (debouncedSearch.trim().length > 0) {
				updatedResults = searchFrom(results, debouncedSearch);
			}

			updatedResults.sort(
				(a, b) =>
					new Date(b.timestamp).getTime() -
					new Date(a.timestamp).getTime(),
			);

			setFilteredResults(updatedResults);
		}, 300); // 300ms debounce delay for better ux

		return () => clearTimeout(handler);
	}, [debouncedSearch, results]);
	return (
		<SheetContent className="z-[1000]">
			<SheetHeader className="mb-3">
				<SheetTitle>Listaus tapahtumista</SheetTitle>
				<Input
					placeholder="Tyyppi, paikka, aika"
					value={debouncedSearch}
					onChange={handleChange}
				/>
			</SheetHeader>
			<div className="overflow-y-auto max-h-full">
				{filteredResults.map((item) => {
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
