import { createSlice } from '@reduxjs/toolkit';
import { IPlanet } from '../../../types/IPlanets';
import { getPlanets, getPlanetsById } from '../../services/planets';

interface initialState {
	selectedPlanets: IPlanet | null;
	planets: IPlanet[];
	error: boolean | null;
	loading: boolean | null;
}

const initialState: initialState = {
	selectedPlanets: null,
	planets: [],
	error: null,
	loading: null
};

const PlanetsSlice = createSlice({
	name: 'PlanetsImage',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPlanets.pending, (state) => {
				state.loading = true;
			})
			.addCase(getPlanets.fulfilled, (state, action) => {
				state.loading = false;
				state.planets = action.payload;
			})
			.addCase(getPlanets.rejected, (state) => {
				state.error = true;
				state.loading = false;
			})
			.addCase(getPlanetsById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getPlanetsById.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedPlanets = action.payload;
			})
			.addCase(getPlanetsById.rejected, (state) => {
				state.error = true;
				state.loading = false;
			});
	}
});

export default PlanetsSlice.reducer;
