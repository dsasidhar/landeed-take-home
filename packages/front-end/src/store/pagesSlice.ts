/* eslint-disable @typescript-eslint/no-magic-numbers */
import { IFormConfig, IFormPage } from 'dynamic-survey-common'
import staticQuestions from 'dynamic-survey-common/staticQuestions.json'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = staticQuestions as IFormConfig

export const pagesSlice = createSlice({
	name: 'pages',
	initialState: {
		pages: initialState.pages,
		currentPage: 0
	},
	reducers: {
		addPages: (state, action: PayloadAction<IFormPage>) => {
			const existingPageIds = new Set(state.pages.map(page => page.id))
			if (existingPageIds.has(action.payload.id)) {
				return
			}
			state.pages.push(action.payload)
		},
		nextPage: state => {
			if (state.currentPage === state.pages.length - 1) {
				return
			}
			state.currentPage += 1
		},
		previousPage: state => {
			if (state.currentPage === 0) {
				return
			}
			state.currentPage -= 1
		},
		resetPages: state => {
			state.currentPage = 0
		}
	}
})
export const { addPages, nextPage, previousPage, resetPages } =
	pagesSlice.actions
