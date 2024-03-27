import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const NavBar = () => {
	const location = useLocation();
	const getClassForRoute = (route: string) => {
		if (location.pathname === route) {
			return 'text-yellow-500';
		} else {
			return 'text-white';
		}
	};
	const PlanetsClass = getClassForRoute('/planets');
	const StarShipsClass = getClassForRoute('/starships');
	const FilmsClass = getClassForRoute('/films');
	const PeopleClass = getClassForRoute('/people');

	return (
		<nav className="bg-black p-4 xl:gap-7 lg:gap-5 md:gap-3 sm:gap-2 xs:gap-1 flex flex-row items-center justify-center w-screen fixed top-0 z-50">
			<div className="flex flex-row xl:gap-7 lg:gap-5 md:gap-3 sm:gap-2 xs:gap-2 font-orbit  text-white">
				<NavLink to="/planets" className={`transition-all duration-300 ease-out hover:text-yellow-500 ${PlanetsClass}`}>
					Planets
				</NavLink>
				<NavLink to="/starships" className={`transition-all duration-300 ease-out hover:text-yellow-500 ${StarShipsClass}`}>
					StarShips
				</NavLink>
			</div>
			<div className="flex items-center">
				<NavLink to="/">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/320px-Star_Wars_Logo.svg.png"
						alt="Star Wars Logo"
						className="hidden md:block h-14"
					/>
				</NavLink>
			</div>
			<div className="flex flex-row xl:gap-7 lg:gap-5 md:gap-3 sm:gap-2 xs:gap-2 font-orbit  text-white">
				<NavLink to="/people" className={`transition-all duration-300 ease-out hover:text-yellow-500 ${PeopleClass}`}>
					People
				</NavLink>
				<NavLink to="/films" className={`transition-all duration-300 ease-out hover:text-yellow-500 ${FilmsClass}`}>
					Films
				</NavLink>
			</div>
		</nav>
	);
};

export default NavBar;
