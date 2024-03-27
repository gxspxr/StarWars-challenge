interface character {
	id: string;
}
export interface IFilms {
	_id: string;
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: Date;
	characters: character[];
	planets: string[];
	created: Date;
	edited: Date;
	url: string;
}
