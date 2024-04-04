import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AddAnswerPayload = {
	questionId: number
	answer: string | undefined
}

export const answerSlice = createSlice({
	name: 'answers',
	initialState: {
		answers: {} as Record<number, string | undefined>
	},
	reducers: {
		addAnswer: (state, action: PayloadAction<AddAnswerPayload>) => {
			state.answers[action.payload.questionId] = action.payload.answer
		},
		resetAnswers: state => {
			state.answers = {}
		}
	}
})
export const { addAnswer, resetAnswers } = answerSlice.actions
