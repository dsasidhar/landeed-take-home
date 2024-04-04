import { configureStore } from '@reduxjs/toolkit'

import { answerSlice } from './answersSlice'
import { pagesSlice } from './pagesSlice'

const store = configureStore({
	reducer: {
		pages: pagesSlice.reducer,
		answers: answerSlice.reducer
	}
})
export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
