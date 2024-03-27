import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStarships, getStarshipsById } from '../../store/services/starships';
import { RootState, AppDispatch } from '../../store/store';
import { MdMovie } from 'react-icons/md';
import { SiStarship } from 'react-icons/si';
import { FaUser } from 'react-icons/fa';
import { getPeople } from '../../store/services/people';
import { getFilms } from '../../store/services/films';

const StarshipsDetail = () => {
	const { id } = useParams<string>();
	const dispatch = useDispatch<AppDispatch>();
	const selectedStarship = useSelector((state: RootState) => state.startships.selectedStarships);
	const characters = useSelector((state: RootState) => state.people.people);
	const films = useSelector((state: RootState) => state.films.films);
	useEffect(() => {
		dispatch(getStarships());
		dispatch(getStarshipsById(id));
		dispatch(getPeople());
		dispatch(getFilms());
	}, [dispatch, id]);

	const characterNames = selectedStarship?.pilots.map((characterId) => {
		const character = characters.find((char) => char._id === characterId.toString());
		return character ? character.name : '';
	});

	const characterLinks = selectedStarship?.pilots.map((characterId) => {
		const character = characters.find((char) => char._id === characterId.toString());
		return character ? character._id : '';
	});

	const filmName = selectedStarship?.films.map((filmUrl) => {
		const filmId = filmUrl.split('/')[5]; // Obtener el ID de la URL del film
		return films?.find((film) => film._id === filmId); // Buscar el film por su ID
	});

	const filmLinks = selectedStarship?.films.map((filmUrl) => {
		const filmSplit = filmUrl.split('/')[5]; // Obtener el ID de la URL del film
		const filmId = films.find((char) => char._id === filmSplit);
		return filmId ? filmId._id : '';
	});
	console.log(characterNames);

	return (
		<main className="font-orbit w-full h-full text-white">
			<section className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col xl:justify-around lg:justify-center md:justify-center sm:justify-center xs:justify-center md:items-center sm:items-center xs:items-center mt-12 p-8">
				<article className="flex flex-col gap-5 w-1/2 ">
					<section className="flex flex-col gap-2 p-2 rounded-lg">
						<div className="flex flex-row items-center text-center gap-1 text-3xl font-bold text-yellow-500 mb-4">
							<SiStarship />
							<h1>{selectedStarship?.name}</h1>
						</div>
						<p>
							Model: <span className="text-yellow-500 font-semibold">{selectedStarship?.model}</span>{' '}
						</p>
						<p>
							Manufacturer: <span className="text-yellow-500 font-semibold">{selectedStarship?.manufacturer}</span>
						</p>
						<p>
							Cost in credits: <span className="text-yellow-500 font-semibold">{selectedStarship?.cost_in_credits}</span>
						</p>
						<p>
							Length: <span className="text-yellow-500 font-semibold">{selectedStarship?.length}</span>
						</p>
						<p>
							Max atmosphering speed: <span className="text-yellow-500 font-semibold">{selectedStarship?.max_atmosphering_speed}</span>
						</p>
						<p>
							Crew: <span className="text-yellow-500 font-semibold">{selectedStarship?.crew}</span>
						</p>
						<p>
							Passengers: <span className="text-yellow-500 font-semibold">{selectedStarship?.passengers}</span>
						</p>
						<p>
							Cargo capacity: <span className="text-yellow-500 font-semibold">{selectedStarship?.cargo_capacity}</span>
						</p>
						<p>
							Consumables: <span className="text-yellow-500 font-semibold">{selectedStarship?.consumables}</span>
						</p>
						<p>
							Hyperdrive rating: <span className="text-yellow-500 font-semibold">{selectedStarship?.hyperdrive_rating}</span>
						</p>
						<p>
							Starship class: <span className="text-yellow-500 font-semibold">{selectedStarship?.starship_class}</span>
						</p>
					</section>

					<section className="grid grid-cols-1 p-2 rounded-lg gap-4 md:grid-cols-2">
						<article className="flex flex-col gap-2">
							<div className="flex flex-col gap-4">
								<div className="flex text-xl  text-yellow-500 font-semibold items-center text-center flex-row gap-2">
									<FaUser />
									<h2>Pilots</h2>
								</div>
								<ul>
									<section className="grid grid-cols-3 justify-center items-center text-center gap-5">
										{characterNames?.map((name, index) => (
											<div key={index} className="">
												<a href={`/people/${characterLinks?.[index]}`} className="text-white hover:text-yellow-500 font-semibold">
													{name}
												</a>
											</div>
										))}
									</section>
								</ul>
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
							</div>
						</article>
					</section>
				</article>
				<img
					src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
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

export default StarshipsDetail;
