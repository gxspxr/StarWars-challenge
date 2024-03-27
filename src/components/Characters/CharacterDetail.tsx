import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFilms } from '../../store/services/films';
import { getPeopleById } from '../../store/services/people';
import { RootState, AppDispatch } from '../../store/store';
import { MdMovie } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { SiStarship } from 'react-icons/si';
import { getPlanets } from '../../store/services/planets';
import { getStarships } from '../../store/services/starships';

const PeopleDetail = () => {
	const { id } = useParams<string>();
	const dispatch = useDispatch<AppDispatch>();
	const selectedPeople = useSelector((state: RootState) => state.people.selectedPeople);
	const films = useSelector((state: RootState) => state.films.films);
	const planets = useSelector((state: RootState) => state.planets.planets);
	const starships = useSelector((state: RootState) => state.startships.starships);
	useEffect(() => {
		dispatch(getPeopleById(id));
		dispatch(getFilms());
		dispatch(getPlanets());
		dispatch(getStarships());
	}, [dispatch, id]);

	const homeworld = selectedPeople?.homeworld ? planets.find((planet) => planet._id === selectedPeople.homeworld.split('/')[5]) : null;
	// Filtrar los films asociados al personaje seleccionado
	const characterFilms = selectedPeople?.films.map((filmUrl) => {
		const filmId = filmUrl.split('/')[5]; // Obtener el ID de la URL del film
		return films?.find((film) => film._id === filmId); // Buscar el film por su ID
	});

	const characterLinks = selectedPeople?.films.map((filmUrl) => {
		const filmSplit = filmUrl.split('/')[5]; // Obtener el ID de la URL del film
		const filmId = films.find((char) => char._id === filmSplit);
		return filmId ? filmId._id : '';
	});

	const characterStarships = selectedPeople?.starships.map((starshipsUrl) => {
		const starshipsId = starshipsUrl.split('/')[5]; // Obtener el ID de la URL del film
		return starships?.find((starship) => starship._id === starshipsId); // Buscar el film por su ID
	});

	const starshipLinks = selectedPeople?.starships.map((starshipsUrl) => {
		const starshipsSplit = starshipsUrl.split('/')[5]; // Obtener el ID de la URL del film
		const starshipsId = starships.find((char) => char._id === starshipsSplit);
		return starshipsId ? starshipsId._id : '';
	});

	return (
		<main className=" font-orbit w-full h-full  text-white">
			<section className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col xl:justify-around lg:justify-center md:justify-center sm:justify-center xs:justify-center md:items-center sm:items-center xs:items-center mt-10 p-8">
				<article className="flex flex-col gap-5 w-1/2 ">
					<section className="flex flex-col  gap-2 p-2 rounded-lg">
						<div className="flex flex-row items-center text-center gap-1 text-3xl font-bold text-yellow-500 mb-4">
							<FaUser />
							<h1>{selectedPeople?.name}</h1>
						</div>
						<p>
							Birth Year: <span className="text-yellow-500 font-semibold">{selectedPeople?.birth_year}</span>{' '}
						</p>
						<p>
							Gender: <span className="text-yellow-500 font-semibold">{selectedPeople?.gender}</span>
						</p>
						<p>
							Height: <span className="text-yellow-500 font-semibold">{selectedPeople?.height}</span>
						</p>
						<p>
							Homeworld:{' '}
							<a href={`/planets/${homeworld?._id}`} className="text-yellow-500 underline font-semibold">
								{homeworld?.name}
							</a>
						</p>
						<p>
							Eye color: <span className="text-yellow-500 font-semibold">{selectedPeople?.eye_color}</span>
						</p>
						<p>
							Skin color: <span className="text-yellow-500 font-semibold">{selectedPeople?.skin_color}</span>
						</p>
					</section>

					<section className="grid grid-cols-1  p-2 rounded-lg gap-4 md:grid-cols-2">
						<article className="flex flex-col gap-2 ">
							<div>
								<div className="flex text-xl mb-2 text-yellow-500 font-semibold items-center text-center flex-row gap-2">
									<MdMovie />
									<h2>Films</h2>
								</div>

								<ul>
									{characterFilms?.map((film, index) => (
										<li key={index} className="mb-2  ">
											<a href={`/films/${characterLinks?.[index]}`} className="cursor-pointer hover:text-yellow-500">
												{film?.title}
											</a>
										</li>
									))}
								</ul>
							</div>
							{selectedPeople && selectedPeople.starships && selectedPeople.starships.length > 0 && (
								<div>
									<div className="flex flex-row items-center text-center gap-2 text-xl font-semibold mb-2 text-yellow-500">
										<SiStarship />
										<h2>Starships</h2>
									</div>
									<ul>
										{characterStarships?.map((starship, index) => (
											<li key={index} className="mb-2  ">
												<a href={`/starships/${starshipLinks?.[index]}`} className="cursor-pointer hover:text-yellow-500">
													{starship?.name}
												</a>
											</li>
										))}
									</ul>
								</div>
							)}
						</article>
					</section>
				</article>
				<img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="" className="h-full" />
			</section>
		</main>
	);
};

export default PeopleDetail;
