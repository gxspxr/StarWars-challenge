import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStarships } from '../../store/services/starships';
import { AppDispatch } from '../../store/store';
import { IStarships } from '../../types/IStarship';
import Pagination from '../utils/pagination';
import SearchBar from '../utils/SearchBar';
import crash from '../../assets/crash.webp';

const StarshipsCards: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [starshipsData, setStarshipsData] = useState<IStarships[]>([]);
	const [filteredStarships, setFilteredStarships] = useState<IStarships[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const starshipsPerPage: number = 9;
	const [sortOrder, setSortOrder] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await dispatch(getStarships());
				if (Array.isArray(response.payload)) {
					const data: IStarships[] = response.payload;
					setStarshipsData(data);
					setFilteredStarships(data);
				} else {
					console.error('Error: Payload is not an array');
				}
			} catch (error) {
				console.error('Error fetching Starships:', error);
			}
		};

		fetchData();
	}, [dispatch]);

	const handleSearch = (searchTerm: string) => {
		const filtered = starshipsData.filter((starship: IStarships) => starship.name.toLowerCase().includes(searchTerm.toLowerCase()));
		setFilteredStarships(filtered);
		setCurrentPage(1);
	};

	const handleSortOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSortOrder(value);
		let sorted: IStarships[];
		if (value === 'asc') {
			sorted = [...filteredStarships].sort((a, b) => parseFloat(a.cargo_capacity) - parseFloat(b.cargo_capacity));
		} else if (value === 'desc') {
			sorted = [...filteredStarships].sort((a, b) => parseFloat(b.cargo_capacity) - parseFloat(a.cargo_capacity));
		} else {
			sorted = starshipsData;
		}
		setFilteredStarships(sorted);
	};

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const indexOfLastCharacter: number = currentPage * starshipsPerPage;
	const indexOfFirstCharacter: number = indexOfLastCharacter - starshipsPerPage;
	const currentCharacters = filteredStarships.slice(indexOfFirstCharacter, indexOfLastCharacter);
	const totalCharacters: number = filteredStarships.length;

	return (
		<div className="mx-auto p-4">
			<div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col items-center text-center gap-5 justify-center">
				<SearchBar onSearch={handleSearch} />
				<select value={sortOrder} onChange={handleSortOrder} className="p-2  -mb-3 border border-gray-300 rounded-md">
					<option value="original">Sort by</option>
					<option value="asc">Population: Low to High</option>
					<option value="desc">Population: High to Low</option>
				</select>
			</div>
			<div className="grid mt-5 grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
				{currentCharacters.length > 0 ? (
					currentCharacters.map((starship, index) => (
						<div key={index} className="flex flex-col items-center">
							<Link to={`/Starships/${starship._id}`}>
								<article className="duration-300 cursor-pointer ease-in-out hover:scale-105">
									<img
										src={`https://starwars-visualguide.com/assets/img/starships/${starship._id}.jpg`}
										onError={(e) => {
											e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Image+Not+Available';
										}}
										alt={starship.name}
										className="w-[20em] h-[20em] rounded-t-xl tran"
									/>
									<div className="w-[20em] text-center">
										<div className="bg-white p-2 transition duration-300 ease-in-out hover:bg-gray-300">
											<p className="text-black font-semibold">{starship.name}</p>
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

			<Pagination itemsPerPage={starshipsPerPage} totalItems={totalCharacters} paginate={paginate} currentPage={currentPage} />
		</div>
	);
};

export default StarshipsCards;
