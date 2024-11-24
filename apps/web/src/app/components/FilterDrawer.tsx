import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { Facets } from '@/utils/facets';
import { DEFAULT_FILTERS, Filters } from '@/utils/filters';
import { fiFI } from '../dictionaries/fi-FI';
import { StatisticBox } from './StatisticDrawer';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface FilterDrawerProps {
	filters: Filters;
	setFilters: (filters: Filters) => void;
	facets: Facets;
	hasFilters: boolean;
	timeToShow: number;
	setTimeToShow: (timeToShow: number) => void;
}

const FilterDrawer = ({
	filters,
	setFilters,
	facets,
	hasFilters,
	timeToShow,
	setTimeToShow,
}: FilterDrawerProps) => {
	const onChecked = (
		facetCategory: string,
		facetTitle: string,
		checked: boolean | string,
	) => {
		if (!Object.keys(filters).includes(facetCategory)) {
			return;
		}
		const currentFilterValue = filters[facetCategory as keyof Filters];
		let newFilterValue = [];
		if (checked) {
			newFilterValue = [...currentFilterValue, facetTitle];
		} else {
			newFilterValue = currentFilterValue.filter(
				(title) => title !== facetTitle,
			);
		}
		setFilters({ ...filters, [facetCategory]: newFilterValue });
	};

	const clearFilters = () => {
		setFilters(DEFAULT_FILTERS);
	};

	return (
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>Suodattaminen</DrawerTitle>
				<DrawerDescription>
					Valitse tilannehuoneen näkymän suodatus
				</DrawerDescription>
			</DrawerHeader>

			<ScrollArea className="overflow-y-auto">
				<div className="px-4 flex flex-col gap-4">
					<TimeToShowSlider
						timeToShow={timeToShow}
						setTimeToShow={setTimeToShow}
					/>
					{Object.entries(facets).map(
						([facetCategory, value]: [
							string,
							Record<string, number>,
						]) => (
							<StatisticBox
								key={facetCategory}
								title={fiFI[facetCategory] || facetCategory}
							>
								<div className="flex flex-col gap-2 relative">
									{Object.entries(value).map(
										([facetTitle, facetValue]) => (
											<div
												key={facetTitle}
												className="flex justify-between"
											>
												<span className="text-sm text-muted-foreground capitalize">
													{fiFI[facetTitle] ||
														facetTitle}
												</span>
												<div className="flex gap-3 items-center">
													<span className="text-xs  ">
														{facetValue}
													</span>
													<Checkbox
														checked={filters[
															facetCategory as keyof Filters
														].includes(facetTitle)}
														onCheckedChange={(
															checked,
														) =>
															onChecked(
																facetCategory,
																facetTitle,
																checked,
															)
														}
														id={facetTitle}
														className="size-6"
													/>
												</div>
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
				{hasFilters && (
					<Button variant="outline" onClick={clearFilters}>
						Tyhjennä valinnat
					</Button>
				)}
				<DrawerClose asChild>
					<Button>OK</Button>
				</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	);
};

const TimeToShowSlider = ({
	timeToShow,
	setTimeToShow,
}: {
	timeToShow: number;
	setTimeToShow: (timeToShow: number) => void;
}) => {
	return (
		<div className="py-4 flex flex-col gap-2">
			<span className="text-sm text-muted-foreground">
				Näytä tapahtumat viimeiseltä{' '}
				{timeToShow === 1 ? 'tunnilta' : `${timeToShow} tunnilta`}
			</span>
			<Slider
				className=""
				value={[timeToShow]}
				onValueChange={(value) => setTimeToShow(value[0])}
				min={1}
				max={48}
				step={1}
			/>
		</div>
	);
};

export default FilterDrawer;
