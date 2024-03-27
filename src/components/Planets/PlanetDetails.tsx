import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPlanets, getPlanetsById } from '../../store/services/planets';
import { RootState, AppDispatch } from '../../store/store';
import { MdMovie } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { IoMdPlanet } from 'react-icons/io';
import { getPeople } from '../../store/services/people';
import { getFilms } from '../../store/services/films';

const PlanetsDetail = () => {
	const { id } = useParams<string>();
	const dispatch = useDispatch<AppDispatch>();
	const selectedPlanet = useSelector((state: RootState) => state.planets.selectedPlanets);
	const characters = useSelector((state: RootState) => state.people.people);
	const films = useSelector((state: RootState) => state.films.films);
	useEffect(() => {
		dispatch(getPlanets());
		dispatch(getPlanetsById(id));
		dispatch(getPeople());
		dispatch(getFilms());
	}, [dispatch, id]);

	const characterNames = selectedPlanet?.residents.map((characterId) => {
		const character = characters.find((char) => char._id === characterId.toString());
		return character ? character.name : '';
	});

	const characterLinks = selectedPlanet?.residents.map((characterId) => {
		const character = characters.find((char) => char._id === characterId.toString());
		return character ? character._id : '';
	});

	const filmName = selectedPlanet?.films.map((filmUrl) => {
		const filmId = filmUrl.split('/')[5]; // Obtener el ID de la URL del film
		return films?.find((film) => film._id === filmId); // Buscar el film por su ID
	});

	const filmLinks = selectedPlanet?.films.map((filmUrl) => {
		const filmSplit = filmUrl.split('/')[5]; // Obtener el ID de la URL del film
		const filmId = films.find((char) => char._id === filmSplit);
		return filmId ? filmId._id : '';
	});
	console.log(characterNames);

	return (
		<main className="font-orbit w-full h-full text-white">
			<section className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col xl:justify-around lg:justify-center md:justify-center sm:justify-center xs:justify-center md:items-center sm:items-center xs:items-center mt-10 p-8">
				<article className="flex flex-col gap-5 w-1/2 ">
					<section className="flex flex-col gap-2 p-2 rounded-lg">
						<div className="flex flex-row items-center text-center gap-1 text-3xl font-bold text-yellow-500 mb-4">
							<IoMdPlanet />
							<h1>{selectedPlanet?.name}</h1>
						</div>
						<p>
							Population: <span className="text-yellow-500 font-semibold">{selectedPlanet?.population}</span>{' '}
						</p>
						<p>
							Gravity: <span className="text-yellow-500 font-semibold">{selectedPlanet?.gravity}</span>
						</p>
						<p>
							Climate: <span className="text-yellow-500 font-semibold">{selectedPlanet?.climate}</span>
						</p>
						<p>
							Diameter: <span className="text-yellow-500 font-semibold">{selectedPlanet?.diameter}</span>
						</p>
						<p>
							Oribtal period: <span className="text-yellow-500 font-semibold">{selectedPlanet?.orbital_period}</span>
						</p>
						<p>
							Rotation period: <span className="text-yellow-500 font-semibold">{selectedPlanet?.rotation_period}</span>
						</p>
						<p>
							Terrain: <span className="text-yellow-500 font-semibold">{selectedPlanet?.terrain}</span>
						</p>
						<p>
							Surface water: <span className="text-yellow-500 font-semibold">{selectedPlanet?.surface_water}</span>
						</p>
					</section>

					<section className="grid grid-cols-1 p-2 rounded-lg gap-4 md:grid-cols-2">
						<article className="flex flex-col gap-2">
							<div className="flex flex-col gap-4">
								<div className="flex text-xl mb-2 text-yellow-500 font-semibold items-center text-center flex-row gap-2">
									<FaUser />
									<h2>Residents</h2>
								</div>
								<ul>
									<section className="grid xxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 justify-center items-center text-center  xxl:gap-5 xl:gap-5 lg:gap-7 md:gap-8 sm:gap-10 xs:gap-12">
										{characterNames?.map((name, index) => (
											<div key={index} className="">
												<a href={`/people/${characterLinks?.[index]}`} className="text-white ml-2 hover:text-yellow-500 font-semibold">
													{name}
												</a>
											</div>
										))}
									</section>
								</ul>
								{selectedPlanet && selectedPlanet.films && selectedPlanet.films.length > 0 && (
									<div>
										<div className="flex text-xl mb-2 text-yellow-500 font-semibold items-center text-center flex-row gap-2">
											<MdMovie />
											<h2>Films</h2>
										</div>
										<ul>
											{filmName?.map((film, index) => (
												<li key={index} className="mb-2  ">
													<a href={`/films/${filmLinks?.[index]}`} className="cursor-pointer hover:text-yellow-500">
														{film?.title}
													</a>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</article>
					</section>
				</article>
				<img
					src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
					onError={(e) => {
						e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Image+Not+Available';
					}}
					className="w-auto h-full"
					alt=""
				/>
			</section>
		</main>
	);
};

export default PlanetsDetail;
