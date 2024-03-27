import { createSlice } from '@reduxjs/toolkit';
import { IFilms } from '../../../types/IFilm';
import { getFilms, getFilmsById } from '../../services/films';

interface initialState {
	selectedFilm: IFilms | null;
	films: IFilms[];
	error: boolean | null;
	loading: boolean | null;
}

const initialState: initialState = {
	selectedFilm: null,
	films: [],
	error: null,
	loading: null
};

const FilmSlice = createSlice({
	name: 'FilmImage',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getFilms.pending, (state) => {
				state.loading = true;
			})
			.addCase(getFilms.fulfilled, (state, action) => {
				state.loading = false;
				state.films = action.payload;
			})
			.addCase(getFilms.rejected, (state) => {
				state.error = true;
				state.loading = false;
			})
			.addCase(getFilmsById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getFilmsById.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedFilm = action.payload;
			})
			.addCase(getFilmsById.rejected, (state) => {
				state.error = true;
				state.loading = false;
			});
	}
});

export default FilmSlice.reducer;
