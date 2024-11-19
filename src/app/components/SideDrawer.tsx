'use client'
import {
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import { EmergencyEvent } from "../types/emergency";

function SideDrawer(content: { content: EmergencyEvent[] }) {
	const contentArray = content.content as EmergencyEvent[];
	const sorted = contentArray.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
	return (
		<SheetContent className="z-[1000]">
			<SheetHeader className="mb-3">
				<SheetTitle>Listaus tapahtumista</SheetTitle>
			</SheetHeader>
			<div className="overflow-y-auto max-h-full">
				{sorted.map(item => {
					return (
						<div>
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
