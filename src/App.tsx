import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home';
import People from './views/People';
import BackgroundVideo from './components/utils/Backdround';
import PeopleDetail from './components/Characters/CharacterDetail';
import Films from './views/Films';
import FilmsDetail from './components/Films/FilmDetail';
import Planets from './views/Planets';
import PlanetsDetail from './components/Planets/PlanetDetails';
import Starships from './views/Starships';
import StarshipsDetail from './components/Starships/StarshipsDetail';
import ChangeTitle from './components/utils/ChangeTitle';
import Page404 from './views/Page404';
function App() {
	return (
		<main className=" overflow-x-hidden ">
			<ChangeTitle />
			<NavBar />
			<BackgroundVideo>
				<Routes>
					<Route path="/*" element={<Page404 />} />
					<Route path="/" element={<Home />} />
					<Route path="/people" element={<People />} />
					<Route path="/films" element={<Films />} />
					<Route path="/planets" element={<Planets />} />
					<Route path="/starships" element={<Starships />} />
					<Route path="/people/:id" element={<PeopleDetail />} />
					<Route path="/films/:id" element={<FilmsDetail />} />
					<Route path="/planets/:id" element={<PlanetsDetail />} />
					<Route path="/starships/:id" element={<StarshipsDetail />} />
				</Routes>
			</BackgroundVideo>
		</main>
	);
}

export default App;
