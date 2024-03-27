import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFilms } from '../../store/services/films';
import { AppDispatch } from '../../store/store';
import { IFilms } from '../../types/IFilm';
import Pagination from '../utils/pagination';
import SearchBar from '../utils/SearchBar';
import crash from '../../assets/crash.webp';

const FilmsCards: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [filmsData, setFilmsData] = useState<IFilms[]>([]);
	const [filteredFilms, setFilteredFilms] = useState<IFilms[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const filmsPerPage: number = 9;

	const [filterDirector, setFilterDirector] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<string>('');
	const [originalFilmsData, setOriginalFilmsData] = useState<IFilms[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await dispatch(getFilms());
				if (Array.isArray(response.payload)) {
					const data: IFilms[] = response.payload;
					setFilmsData(data);
					setFilteredFilms(data);
					setOriginalFilmsData(data);
				} else {
					console.error('Error: Payload is not an array');
				}
			} catch (error) {
				console.error('Error fetching Films:', error);
			}
		};

		fetchData();
	}, [dispatch]);

	const handleSearch = (searchTerm: string) => {
		const filtered = filmsData.filter((film: IFilms) => film.title.toLowerCase().includes(searchTerm.toLowerCase()));
		setFilteredFilms(filtered);
		setCurrentPage(1);
	};

	const handleFilterDirector = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setFilterDirector(value);
		if (!value) {
			setFilteredFilms(originalFilmsData);
			return;
		}
		const filtered = filmsData.filter((film: IFilms) => film.director.toLowerCase() === value.toLowerCase());
		setFilteredFilms(filtered);
		setCurrentPage(1);
	};

	const handleSortOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSortOrder(value);
		if (value === '') {
			setFilteredFilms(filmsData);
		} else {
			const sorted = [...filteredFilms].sort((a, b) => {
				if (value === 'asc') {
					return a.title.localeCompare(b.title);
				} else if (value === 'desc') {
					return b.title.localeCompare(a.title);
				} else {
					return 0;
				}
			});
			setFilteredFilms(sorted);
		}
	};

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const indexOfLastCharacter: number = currentPage * filmsPerPage;
	const indexOfFirstCharacter: number = indexOfLastCharacter - filmsPerPage;
	const currentCharacters = filteredFilms.slice(indexOfFirstCharacter, indexOfLastCharacter);
	const totalCharacters: number = filteredFilms.length;

	return (
		<div className="mx-auto p-4">
			<div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col items-center text-center gap-5 justify-center">
				<SearchBar onSearch={handleSearch} />
				<div className="flex flex-row -mb-3">
					<select value={filterDirector} onChange={handleFilterDirector} className="mr-4 p-2 border border-gray-300 rounded-md ">
						<option value="">Filter by director</option>
						<option value="George Lucas">George Lucas</option>
						<option value="Irvin Kershner">Irvin Kershner</option>
						<option value="Richard Marquand">Richard Marquand</option>
						{/* Add more options as needed */}
					</select>
					<select value={sortOrder} onChange={handleSortOrder} className="p-2 border border-gray-300 rounded-md ">
						<option value="">Sort by</option>
						<option value="asc">A-Z</option>
						<option value="desc">Z-A</option>
					</select>
				</div>
			</div>
			<div className="grid mt-5 grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
				{currentCharacters.length > 0 ? (
					currentCharacters.map((film, index) => (
						<div key={index} className="flex flex-col items-center">
							<Link to={`/Films/${film._id}`}>
								<article className="duration-300 cursor-pointer ease-in-out hover:scale-105">
									<img src={`https://starwars-visualguide.com/assets/img/films/${film._id}.jpg`} alt={film.title} className="w-[20em] h-[20em] rounded-t-xl tran" />
									<div className="w-[20em] text-center">
										<div className="bg-white p-2 transition duration-300 ease-in-out hover:bg-gray-300">
											<p className="text-black font-semibold">{film.title}</p>
										</div>
									</div>
								</article>
							</Link>
						</div>
					))
				) : (
					<div className="flex flex-col mx-auto text-center justify-center items-center">
						<h2 className="text-xl text-center font-semibold mb-4 text-yellow-500">No data</h2>
						<img src={crash} alt="Nave de Star Wars chocando" className="" />
					</div>
				)}
			</div>

			<Pagination itemsPerPage={filmsPerPage} totalItems={totalCharacters} paginate={paginate} currentPage={currentPage} />
		</div>
	);
};

export default FilmsCards;
