import { Link } from 'react-router-dom';
import image from '../assets/error.webp';

const Page404 = () => {
	return (
		<main className="font-orbit flex flex-col justify-center w-screen h-screen overflow-x-hidden">
			<section className="px-16 h-screen w-screen overflow-x-hidden flex flex-col justify-center items-center ">
				<article className="flex flex-row justify-center gap-14">
					<div className="flex flex-col justify-center items-start align-middle gap-10">
						<div className="flex flex-col gap-0">
							<h1 className="text-8xl font-bold text-yellow-500">Oh no! Error 404</h1>
							<h3 className="text-4xl text-white">The page you are looking for does not exist</h3>
						</div>
						<Link to="/">
							<button className="bg-yellow-500 rounded-lg hover:bg-white text-black text-4xl py-1 px-2">Return Home</button>
						</Link>
					</div>
					<div>
						<img src={image} alt="" className="h-96 hidden md:block" />
					</div>
				</article>
			</section>
		</main>
	);
};

export default Page404;
