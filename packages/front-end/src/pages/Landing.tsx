import getFormPages from 'api/getFormPages'
import submitAnswers from 'api/submitAnswers'
import FormPageComp from 'components/FormPage'
import { validate } from 'dynamic-survey-common'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { resetAnswers } from 'store/answersSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addPages, nextPage, previousPage, resetPages } from 'store/pagesSlice'
import {
	selectAllPages,
	selectAnswers,
	selectCurrentPageNumber
} from 'store/selectors'

import { useMutation, useQuery } from '@tanstack/react-query'

const LAST_PAGE_INDEX_OFFSET = 1

export default function Landing(): ReactElement {
	const [validateNow, setValidateNow] = useState(0)

	const dispatch = useAppDispatch()
	const currentPage = useAppSelector(selectCurrentPageNumber)
	const allPages = useAppSelector(selectAllPages)
	const allAnswers = useAppSelector(selectAnswers)
	const { data } = useQuery({
		queryKey: ['formPages'],
		queryFn: async () => getFormPages()
	})

	const submitAnswersMutation = useMutation({
		mutationFn: submitAnswers
	})

	const resetForm = useCallback(() => {
		dispatch(resetAnswers())
		dispatch(resetPages())
		setValidateNow(Date.now())
	}, [dispatch])

	useEffect(() => {
		if (data) {
			for (const page of data.pages) {
				dispatch(addPages(page))
			}
		}
	}, [data, dispatch])

	const checkIfAllQuestionsInThePageAreValidated = () => {
		const currentPageQuestions = allPages[currentPage].questions
		const isValidated = currentPageQuestions.every(
			question =>
				validate(allAnswers[question.id], question.validations) === undefined
		)
		return isValidated
	}
	const onNext = () => {
		setValidateNow(Date.now())
		if (!checkIfAllQuestionsInThePageAreValidated()) {
			alert('Form is not filled correctly, please check the form.')
			return
		}
		dispatch(nextPage())
		setValidateNow(0)
	}
	const onPrevious = () => {
		dispatch(previousPage())
	}

	const onFormSubmit = () => {
		if (!checkIfAllQuestionsInThePageAreValidated()) {
			alert('Form is not filled correctly, please check the form')
			return
		}
		submitAnswersMutation.mutate(allAnswers, {
			onSuccess: () => {
				alert('Form submitted')
				// Reset form and show the first page and reset the answers
				resetForm()
			},
			onError: () => {
				alert('Form submission failed')
			}
		})
	}

	return (
		<div className='m-auto mt-4 flex h-full w-5/6 flex-col justify-between bg-slate-700 p-8'>
			<div className='text-center'>
				<div className='text-4xl font-bold text-white'>Interest Survey</div>
				<div className='text-lg text-white'>
					Please fill out this survey to help us serve you better
				</div>

				<div className='py-2 text-center text-lg font-bold text-white'>
					{currentPage + LAST_PAGE_INDEX_OFFSET} / {allPages.length}
				</div>
				<div className='mt-5'>
					<FormPageComp validateNow={validateNow} />
				</div>
			</div>
			<div className='mt-5 flex justify-between'>
				<button
					type='button'
					className={`h-12 w-12 cursor-pointer rounded-md bg-blue-500 p-2 text-lg text-white ${
						currentPage === 0 ? 'invisible' : ''
					}`}
					aria-label='Previous'
					onClick={onPrevious}
				>
					<i className='fas fa-arrow-left' />
				</button>
				<button
					type='button'
					className={`h-12 w-12 cursor-pointer rounded-md bg-blue-500 p-2 text-lg text-white ${
						currentPage === allPages.length - LAST_PAGE_INDEX_OFFSET
							? 'invisible'
							: ''
					}`}
					aria-label='Next'
					onClick={onNext}
				>
					<i className='fas fa-arrow-right' />
				</button>
				{currentPage === allPages.length - LAST_PAGE_INDEX_OFFSET ? (
					<button
						type='button'
						className='h-12 cursor-pointer rounded-md bg-blue-500 p-2 text-lg text-white'
						aria-label='Submit'
						onClick={onFormSubmit}
					>
						Submit
					</button>
				) : undefined}
			</div>
		</div>
	)
}
