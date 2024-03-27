import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IStarships } from '../../../types/IStarship';

const URL = import.meta.env.VITE_DEV_BACKEND;

export const getStarships = createAsyncThunk('Starships/getStarships', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<IStarships[]>(`${URL}/starships`);
		console.log('Starships got', response);
		return response.data;
	} catch (error) {
		console.error(error);
		return rejectWithValue('Error getting Starships');
	}
});

export const getStarshipsById = createAsyncThunk('Starships/getStarshipsById', async (id: string | undefined, { rejectWithValue }) => {
	try {
		const response = await axios.get<IStarships>(`${URL}/starships/${id}`);
		console.log('Starships got', response);
		return response.data;
	} catch (error) {
		console.error(error);
		return rejectWithValue('Error getting Starships');
	}
});
