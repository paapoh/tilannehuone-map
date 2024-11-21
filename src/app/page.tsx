import { Card, CardContent } from '@/components/ui/card';
import dynamic from 'next/dynamic';

const DynamicMapComponent = dynamic(() => import('./components/MapComponent'), {
	loading: () => (
		<Card className="size-full">
			<CardContent className="p-0 h-full w-full flex items-center justify-center rounded-md bg-map-background"></CardContent>
		</Card>
	),
	ssr: false,
});

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const isDebug = (await searchParams).debug === 'penttipasanen';

	return (
		<div className="h-screen w-screen md:p-4 p-0">
			<DynamicMapComponent isDebug={isDebug} />
		</div>
	);
}
