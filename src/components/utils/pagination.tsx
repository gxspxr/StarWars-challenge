import React from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

interface PaginationProps {
	itemsPerPage: number;
	totalItems: number;
	currentPage: number;
	paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handleClick = (pageNumber: number) => {
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			paginate(pageNumber);
		}
	};

	const renderPageNumbers = () => {
		const visiblePageNumbers: number[] = [];
		let startPage = currentPage - 2;
		let endPage = currentPage + 1;

		if (startPage <= 0) {
			startPage = 1;
			endPage = Math.min(totalPages, 4); // Mostrar hasta 4 páginas si hay menos de 4 páginas en total
		}

		if (endPage > totalPages) {
			startPage = Math.max(totalPages - 3, 1); // Ajustar el inicio para mostrar 4 páginas si es posible
			endPage = totalPages;
		}

		for (let i = startPage; i <= endPage; i++) {
			visiblePageNumbers.push(i);
		}

		return visiblePageNumbers.map((number) => (
			<li key={number} className="mx-2">
				<button
					onClick={() => handleClick(number)}
					className={`bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 ${number === currentPage ? 'bg-yellow-700' : ''}`}
				>
					{number}
				</button>
			</li>
		));
	};

	return (
		<nav className="mt-4 flex justify-center">
			<button
				onClick={() => handleClick(currentPage - 1)}
				disabled={currentPage === 1}
				className="mr-2 bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
			>
				<FaArrowLeft />
			</button>
			<ul className="flex">{renderPageNumbers()}</ul>
			<button
				onClick={() => handleClick(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="ml-2 bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
			>
				<FaArrowRight />
			</button>
		</nav>
	);
};

export default Pagination;
