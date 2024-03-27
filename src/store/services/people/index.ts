import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPeople } from '../../../types/IPeople';

const URL = import.meta.env.VITE_DEV_BACKEND;

export const getPeople = createAsyncThunk('people/getPeople', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<IPeople[]>(`${URL}/people`);
		console.log('people got', response);
		return response.data;
	} catch (error) {
		console.error(error);
		return rejectWithValue('Error getting people');
	}
});

export const getPeopleById = createAsyncThunk('people/getPeopleById', async (id: string | undefined, { rejectWithValue }) => {
	try {
		const response = await axios.get<IPeople>(`${URL}/people/${id}`);
		console.log('people got', response);
		return response.data;
	} catch (error) {
		console.error(error);
		return rejectWithValue('Error getting people');
	}
});
