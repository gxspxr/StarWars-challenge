import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFilms } from '../../../types/IFilm';

const URL = import.meta.env.VITE_DEV_BACKEND;

export const getFilms = createAsyncThunk('Films/getFilms', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<IFilms[]>(`${URL}/films`);
		console.log('Films got', response);
		return response.data;
	} catch (error) {
		console.error(error);
		return rejectWithValue('Error getting Films');
	}
});

export const getFilmsById = createAsyncThunk('Films/getFilmsById', async (id: string | undefined, { rejectWithValue }) => {
	try {
		const response = await axios.get<IFilms>(`${URL}/Films/${id}`);
		console.log('Films got', response);
		return response.data;
	} catch (error) {
		console.error(error);
		return rejectWithValue('Error getting Films');
	}
});
