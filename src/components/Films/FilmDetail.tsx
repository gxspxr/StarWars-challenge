import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFilms, getFilmsById } from '../../store/services/films';
import { RootState, AppDispatch } from '../../store/store';
import { MdMovie } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { IoMdPlanet } from 'react-icons/io';
import { getPeople } from '../../store/services/people';
import { getPlanets } from '../../store/services/planets';

const FilmsDetail = () => {
	const { id } = useParams<string>();
	const dispatch = useDispatch<AppDispatch>();
	const selectedFilm = useSelector((state: RootState) => state.films.selectedFilm);
	const characters = useSelector((state: RootState) => state.people.people);
	const planets = useSelector((state: RootState) => state.planets.planets);
	useEffect(() => {
		dispatch(getFilmsById(id));
		dispatch(getPeople());
		dispatch(getFilms());
		dispatch(getPlanets());
	}, [dispatch, id]);

	// Obtener los personajes asociados a la película
	const characterNames = selectedFilm?.characters.map((characterId) => {
		const character = characters.find((char) => char._id === characterId.toString());
		return character ? character.name : '';
	});

	const characterLinks = selectedFilm?.characters.map((characterId) => {
		const character = characters.find((char) => char._id === characterId.toString());
		return character ? character._id : '';
	});

	// Obtener los planetas asociados a la película
	const planetNames = selectedFilm?.planets.map((filmUrl) => {
		const filmId = filmUrl.split('/')[5]; // Obtener el ID de la URL del film
		return planets?.find((film) => film._id === filmId); // Buscar el film por su ID
	});

	const planetLinks = selectedFilm?.planets.map((filmUrl) => {
		const filmSplit = filmUrl.split('/')[5]; // Obtener el ID de la URL del film
		const filmId = planets.find((char) => char._id === filmSplit);
		return filmId ? filmId._id : '';
	});
	console.log(characterNames);

	return (
		<main className="font-orbit w-full h-full text-white">
			{/* Contenido del componente */}
			<section className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col xl:justify-around lg:justify-center md:justify-center sm:justify-center xs:justify-center md:items-center sm:items-center xs:items-center mt-10 p-8">
				<article className="flex flex-col gap-5 w-1/2 ">
					{/* Detalles de la película */}
					<section className="flex flex-col gap-2 p-2 rounded-lg">
						<div className="flex flex-row items-center text-center gap-1 text-3xl font-bold text-yellow-500 mb-4">
							{/* Icono y título */}
							<MdMovie />
							<h1>{selectedFilm?.title}</h1>
						</div>
						{/* Otros detalles de la película */}
						<p>
							Director: <span className="text-yellow-500 font-semibold">{selectedFilm?.director}</span>{' '}
						</p>
						<p>
							Episode: <span className="text-yellow-500 font-semibold">{selectedFilm?.episode_id}</span>
						</p>
						<p>
							Openinig crawl: <span className="text-yellow-500 font-semibold">{selectedFilm?.opening_crawl}</span>
						</p>
						<p>
							Producer: <span className="text-yellow-500 font-semibold">{selectedFilm?.producer}</span>
						</p>
						<p>
							Release date: <span className="text-yellow-500 font-semibold">{selectedFilm?.release_date ? new Date(selectedFilm.release_date).toLocaleDateString() : '-'}</span>
						</p>
					</section>

					{/* Lista de personajes */}
					<section className="grid grid-cols-1 p-2 rounded-lg gap-4 md:grid-cols-2">
						<article className="flex flex-col gap-5">
							<div>
								<div className="flex text-xl mb-2 text-yellow-500 font-semibold items-center text-center flex-row gap-2">
									<FaUser />
									<h2>Characters</h2>
								</div>
								{/* Lista de nombres de personajes */}
								<ul>
									<section className="grid grid-cols-2 justify-center items-center text-center gap-5">
										{characterNames?.map((name, index) => (
											<div key={index} className="">
												<a href={`/people/${characterLinks?.[index]}`} className="text-white hover:text-yellow-500 font-semibold">
													{name}
												</a>
											</div>
										))}
									</section>
								</ul>
							</div>
							<div>
								<div className="flex text-xl mb-2 text-yellow-500 font-semibold items-center text-center flex-row gap-2">
									<IoMdPlanet />
									<h2>Planets</h2>
								</div>
								{/* Lista de nombres de personajes */}
								<ul>
									<section className="grid grid-cols-2 justify-center items-center text-center gap-5">
										{planetNames?.map((planet, index) => (
											<div key={index} className="">
												<a href={`/planet/${planetLinks?.[index]}`} className="text-white hover:text-yellow-500 font-semibold">
													{planet?.name}
												</a>
											</div>
										))}
									</section>
								</ul>
							</div>
						</article>
					</section>
				</article>
				<img src={`https://starwars-visualguide.com/assets/img/films/${id}.jpg`} className="w-auto h-full" alt="" />
			</section>
		</main>
	);
};

export default FilmsDetail;
