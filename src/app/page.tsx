import MapComponent from './components/MapComponent';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const isDebug = (await searchParams).debug === 'penttipasanen';

	return (
		<div className="h-screen w-screen md:p-4 p-0">
			<MapComponent isDebug={isDebug} />
		</div>
	);
}
