import { createSlice } from '@reduxjs/toolkit';
import { IStarships } from '../../../types/IStarship';
import { getStarships, getStarshipsById } from '../../services/starships';

interface initialState {
	selectedStarships: IStarships | null;
	starships: IStarships[];
	error: boolean | null;
	loading: boolean | null;
}

const initialState: initialState = {
	selectedStarships: null,
	starships: [],
	error: null,
	loading: null
};

const StarshipsSlice = createSlice({
	name: 'StarshipsImage',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getStarships.pending, (state) => {
				state.loading = true;
			})
			.addCase(getStarships.fulfilled, (state, action) => {
				state.loading = false;
				state.starships = action.payload;
			})
			.addCase(getStarships.rejected, (state) => {
				state.error = true;
				state.loading = false;
			})
			.addCase(getStarshipsById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getStarshipsById.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedStarships = action.payload;
			})
			.addCase(getStarshipsById.rejected, (state) => {
				state.error = true;
				state.loading = false;
			});
	}
});

export default StarshipsSlice.reducer;
