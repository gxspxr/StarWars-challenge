import { createSlice } from '@reduxjs/toolkit';
import { IPeople } from '../../../types/IPeople';
import { getPeople, getPeopleById } from '../../services/people';

interface initialState {
	selectedPeople: IPeople | null;
	people: IPeople[];
	error: boolean | null;
	loading: boolean | null;
}

const initialState: initialState = {
	selectedPeople: null,
	people: [],
	error: null,
	loading: null
};

const peopleSlice = createSlice({
	name: 'peopleImage',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPeople.pending, (state) => {
				state.loading = true;
			})
			.addCase(getPeople.fulfilled, (state, action) => {
				state.loading = false;
				state.people = action.payload;
			})
			.addCase(getPeople.rejected, (state) => {
				state.error = true;
				state.loading = false;
			})
			.addCase(getPeopleById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getPeopleById.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedPeople = action.payload;
			})
			.addCase(getPeopleById.rejected, (state) => {
				state.error = true;
				state.loading = false;
			});
	}
});

export default peopleSlice.reducer;
