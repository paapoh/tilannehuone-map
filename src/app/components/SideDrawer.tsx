'use client'
import {
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

import { EmergencyEvent } from "../types/emergency";
import { useEffect, useState } from "react";
import { searchFrom } from "@/lib/utils";

function SideDrawer({ content }: EmergencyEvent[]) {
	const [search, setSearch] = useState('');
	const [results, setResults] = useState(content || []);
	const [filteredResults, setFilteredResults] = useState([]);
	const [debouncedSearch, setDebouncedSearch] = useState('');

	const handleChange = (e) => {
		setSearch(e.target.value);
		setDebouncedSearch(e.target.value)
	}

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

			updatedResults.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

			setFilteredResults(updatedResults);
		}, 300); // 300ms debounce delay for better ux

		return () => clearTimeout(handler);
	}, [debouncedSearch, results]);
	return (
		<SheetContent className="z-[1000]">
			<SheetHeader className="mb-3">
				<SheetTitle>Listaus tapahtumista</SheetTitle>
				<Input placeholder="Tyyppi, paikka, aika" value={search} onChange={handleChange} />
			</SheetHeader>
			<div className="overflow-y-auto max-h-full">
				{filteredResults.map(item => {
					return (
						<div key={item.id}>
							<span className="font-bold">{item.location}</span> <span>{item.timestamp}</span>
							<p className="mb-4">{item.type}</p>
						</div>
					)
				})}
			</div>
		</SheetContent>

	)
}

export default SideDrawer;
