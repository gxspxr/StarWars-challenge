import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ChangeTitle: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
		// Cambia el título de la página basado en la ruta actual
		const baseTitle = 'Challenge';
		if (location.pathname === '/people') {
			document.title = `${baseTitle} | People`;
		} else if (location.pathname === '/starships') {
			document.title = `${baseTitle} | Starships`;
		} else if (location.pathname === '/planets') {
			document.title = `${baseTitle} | Planets`;
		} else if (location.pathname === '/films') {
			document.title = `${baseTitle} | Films`;
		} else {
			document.title = baseTitle;
		}
	}, [location]);

	return null; // Este componente no necesita renderizar nada
};

export default ChangeTitle;
