import React, { useState } from 'react';

interface SearchBarProps {
	onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSearch(searchTerm);
	};

	return (
		<form onSubmit={handleSubmit} className="flex justify-center mt-4">
			<input
				type="text"
				value={searchTerm}
				onChange={handleChange}
				placeholder="Search..."
				className="bg-gray-100 border w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
			/>
			<button type="submit" className="ml-2 bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
				Search
			</button>
		</form>
	);
};

export default SearchBar;
