import { ReactNode } from 'react';
import backgroundVideo from '../../assets/space.mp4';
interface BackgroundVideoProps {
	children: ReactNode;
}

const BackgroundVideo = ({ children }: BackgroundVideoProps) => {
	return (
		<div className="relative w-full min-h-screen overflow-hidden">
			<video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover object-center z-0">
				<source src={backgroundVideo} type="video/mp4" />
			</video>
			<div className="relative z-10">{children}</div>
		</div>
	);
};

export default BackgroundVideo;
