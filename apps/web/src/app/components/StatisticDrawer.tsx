'use client';

import {
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerClose,
} from '@/components/ui/drawer';
import { Facets } from '@/utils/facets';
import { fiFI } from '../dictionaries/fi-FI';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface StatisticDrawerProps {
	facets: Facets;
}

const StatisticDrawer = ({ facets }: StatisticDrawerProps) => {
	return (
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>Tilastot</DrawerTitle>
				<DrawerDescription>
					Yleinen katsaus tilannehuoneen tapahtumiin
				</DrawerDescription>
			</DrawerHeader>

			<ScrollArea className="overflow-y-auto">
				<div className="px-4 flex flex-col gap-4">
					{Object.entries(facets).map(
						([key, value]: [string, Record<string, number>]) => (
							<StatisticBox key={key} title={fiFI[key] || key}>
								<div className="flex flex-col gap-1 relative">
									{Object.entries(value).map(
										([key, facetValue]) => (
											<div
												key={key}
												className="flex justify-between"
											>
												<span className="text-sm text-muted-foreground capitalize">
													{fiFI[key] || key}
												</span>
												<span className="text-sm font-medium">
													{facetValue}
												</span>
											</div>
										),
									)}
								</div>
							</StatisticBox>
						),
					)}
				</div>
			</ScrollArea>
			<DrawerFooter>
				<DrawerClose asChild>
					<Button>Sulje</Button>
				</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	);
};

export const StatisticBox = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col gap-0">
			<h3 className="text-sm font-semibold mb-2 capitalize">{title}</h3>
			{children}
		</div>
	);
};

export default StatisticDrawer;
