import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPlanets } from '../../store/services/planets';
import { AppDispatch } from '../../store/store';
import { IPlanet } from '../../types/IPlanets';
import Pagination from '../utils/pagination';
import SearchBar from '../utils/SearchBar';
import crash from '../../assets/crash.webp';

const PlanetsCards: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [planetsData, setPlanetsData] = useState<IPlanet[]>([]);
	const [filteredPlanets, setFilteredPlanets] = useState<IPlanet[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const planetsPerPage: number = 9;
	const [sortOrder, setSortOrder] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await dispatch(getPlanets());
				if (Array.isArray(response.payload)) {
					const data: IPlanet[] = response.payload;
					setPlanetsData(data);
					setFilteredPlanets(data);
				} else {
					console.error('Error: Payload is not an array');
				}
			} catch (error) {
				console.error('Error fetching Planets:', error);
			}
		};

		fetchData();
	}, [dispatch]);

	const handleSearch = (searchTerm: string) => {
		const filtered = planetsData.filter((planet: IPlanet) => planet.name.toLowerCase().includes(searchTerm.toLowerCase()));
		setFilteredPlanets(filtered);
		setCurrentPage(1);
	};

	const handleSortOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSortOrder(value);
		let sorted: IPlanet[];
		if (value === 'asc') {
			sorted = [...filteredPlanets].sort((a, b) => parseFloat(a.population) - parseFloat(b.population));
		} else if (value === 'desc') {
			sorted = [...filteredPlanets].sort((a, b) => parseFloat(b.population) - parseFloat(a.population));
		} else {
			sorted = planetsData;
		}
		setFilteredPlanets(sorted);
	};

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const indexOfLastCharacter: number = currentPage * planetsPerPage;
	const indexOfFirstCharacter: number = indexOfLastCharacter - planetsPerPage;
	const currentCharacters = filteredPlanets.slice(indexOfFirstCharacter, indexOfLastCharacter);
	const totalCharacters: number = filteredPlanets.length;

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
					currentCharacters.map((planet, index) => (
						<div key={index} className="flex flex-col items-center">
							<Link to={`/Planets/${planet._id}`}>
								<article className="duration-300 cursor-pointer ease-in-out hover:scale-105">
									<img
										src={`https://starwars-visualguide.com/assets/img/planets/${planet._id}.jpg`}
										onError={(e) => {
											e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Image+Not+Available';
										}}
										alt={planet.name}
										className="w-[20em] h-[20em] rounded-t-xl tran"
									/>
									<div className="w-[20em] text-center">
										<div className="bg-white p-2 transition duration-300 ease-in-out hover:bg-gray-300">
											<p className="text-black font-semibold">{planet.name}</p>
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

			<Pagination itemsPerPage={planetsPerPage} totalItems={totalCharacters} paginate={paginate} currentPage={currentPage} />
		</div>
	);
};

export default PlanetsCards;
