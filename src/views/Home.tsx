const Home = () => {
	return (
		<div className="font-star relative h-screen">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
				<h1 className="xxl:text-8xl xl:text-8xl lg:text-8xl md:text-7xl sm:text-5xl xs:text-4xl inline-block font-bold text-yellow-500">Star Wars</h1>

				<div className="flex xxl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col mt-8">
					<a href="/people" className="text-xl font-semibold text-white hover:bg-white hover:text-black px-4 py-2 rounded-full transition duration-300">
						People
					</a>
					<a href="/films" className="text-xl font-semibold text-white hover:bg-white hover:text-black px-4 py-2 rounded-full transition duration-300 ml-4">
						Films
					</a>
					<a href="/planets" className="text-xl font-semibold text-white hover:bg-white hover:text-black px-4 py-2 rounded-full transition duration-300 ml-4">
						Planets
					</a>
					<a href="/starships" className="text-xl font-semibold text-white hover:bg-white hover:text-black px-4 py-2 rounded-full transition duration-300 ml-4">
						StarShips
					</a>
				</div>
			</div>
		</div>
	);
};

export default Home;
