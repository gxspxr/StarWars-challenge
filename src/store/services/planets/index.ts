import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPlanet } from '../../../types/IPlanets';

const URL = import.meta.env.VITE_DEV_BACKEND;

export const getPlanets = createAsyncThunk('Planets/getPlanets', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<IPlanet[]>(`${URL}/planets`);
		console.log('Planets got', response);
		return response.data;
	} catch (error) {
		console.error(error);
		return rejectWithValue('Error getting Planets');
	}
});

export const getPlanetsById = createAsyncThunk('Planets/getPlanetsById', async (id: string | undefined, { rejectWithValue }) => {
	try {
		const response = await axios.get<IPlanet>(`${URL}/planets/${id}`);
		console.log('Planets got', response);
		return response.data;
	} catch (error) {
		console.error(error);
		return rejectWithValue('Error getting Planets');
	}
});
