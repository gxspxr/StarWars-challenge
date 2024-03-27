import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPeople } from '../../store/services/people';
import { AppDispatch } from '../../store/store';
import { IPeople } from '../../types/IPeople';
import Pagination from '../utils/pagination';
import SearchBar from '../utils/SearchBar';
import crash from '../../assets/crash.webp';

const PeopleCards: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [peopleData, setPeopleData] = useState<IPeople[]>([]);
	const [filteredPeople, setFilteredPeople] = useState<IPeople[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const charactersPerPage: number = 9;

	const [filterGender, setFilterGender] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await dispatch(getPeople());
				if (Array.isArray(response.payload)) {
					const data: IPeople[] = response.payload;
					setPeopleData(data);
					setFilteredPeople(data);
				} else {
					console.error('Error: Payload is not an array');
				}
			} catch (error) {
				console.error('Error fetching people:', error);
			}
		};

		fetchData();
	}, [dispatch]);

	const handleSearch = (searchTerm: string) => {
		const filtered = peopleData.filter((person: IPeople) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));
		setFilteredPeople(filtered);
		setCurrentPage(1);
	};

	const handleFilterGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setFilterGender(value);
		if (value === '') {
			setFilteredPeople(peopleData);
		} else {
			const filtered = peopleData.filter((person: IPeople) => person.gender === value);
			setFilteredPeople(filtered);
		}
		setCurrentPage(1);
	};

	const handleSortOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSortOrder(value);
		if (value === '') {
			setFilteredPeople(peopleData);
		} else {
			const sorted = [...filteredPeople].sort((a, b) => {
				if (value === 'asc') {
					return a.name.localeCompare(b.name);
				} else if (value === 'desc') {
					return b.name.localeCompare(a.name);
				} else {
					return 0;
				}
			});
			setFilteredPeople(sorted);
		}
	};

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const indexOfLastCharacter: number = currentPage * charactersPerPage;
	const indexOfFirstCharacter: number = indexOfLastCharacter - charactersPerPage;
	const currentCharacters = filteredPeople.slice(indexOfFirstCharacter, indexOfLastCharacter);
	const totalCharacters: number = filteredPeople.length;

	return (
		<div className="mx-auto p-4">
			<div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col items-center text-center gap-5 justify-center">
				<SearchBar onSearch={handleSearch} />
				<div className="flex flex-row -mb-3">
					<select value={filterGender} onChange={handleFilterGender} className="mr-4 p-2 border border-gray-300 rounded-md ">
						<option value="">Filter by gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="n/a">N/A</option>
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
					currentCharacters.map((character: IPeople) => (
						<div key={character._id} className="flex flex-col items-center">
							<Link to={`/people/${character._id}`}>
								<article className="duration-300 cursor-pointer ease-in-out hover:scale-105">
									<img src={`https://starwars-visualguide.com/assets/img/characters/${character._id}.jpg`} alt={character.name} className="w-[20em] h-[20em] rounded-t-xl tran" />
									<div className="w-[20em] text-center">
										<div className="bg-white p-2 transition duration-300 ease-in-out hover:bg-gray-300">
											<p className="text-black font-semibold">{character.name}</p>
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
			<Pagination itemsPerPage={charactersPerPage} totalItems={totalCharacters} paginate={paginate} currentPage={currentPage} />
		</div>
	);
};

export default PeopleCards;
