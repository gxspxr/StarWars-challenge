import { configureStore } from '@reduxjs/toolkit';
import peopleSlice from './slices/peopleSlice';
import filmSlice from './slices/filmSlice';
import planetSlice from './slices/planetSlice';
import starshipsSlice from './slices/starshipsSlice';
export const store = configureStore({
	reducer: {
		people: peopleSlice,
		films: filmSlice,
		planets: planetSlice,
		startships: starshipsSlice
	}
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
