import PeopleCards from '../components/Characters/Cards';

const People = () => {
	return (
		<main className=" h-auto w-screen">
			<section className="mt-24  gap-10">
				<div className="flex font-star flex-col items-center text-center justify-center">
					<h1 className="xl:text-8xl lg:text-8xl md:text-6xl sm:text-6xl xs:text-xl inline-block font-bold text-yellow-500">Star Wars</h1>
					<h2 className="xl:text-4xl lg:text-2xl md:text-xl sm:text-xl inline-block font-bold text-white">Characters</h2>
				</div>
				<PeopleCards />
			</section>
		</main>
	);
};

export default People;
