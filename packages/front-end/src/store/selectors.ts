import { RootState } from './store'

export const selectAnswers = (state: RootState) => state.answers.answers
export const selectAllPages = (state: RootState) => state.pages.pages
export const selectCurrentPage = (state: RootState) =>
	state.pages.pages[state.pages.currentPage]

export const selectCurrentPageNumber = (state: RootState) =>
	state.pages.currentPage
