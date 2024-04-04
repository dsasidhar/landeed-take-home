import { IFormQuestionText, validate } from 'dynamic-survey-common'
import useDebouncedDispatch from 'hooks/useDebouncedDispatch'
import { ReactElement, useEffect, useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { selectAnswers } from 'store/selectors'

interface IProperties {
	question: IFormQuestionText
	validateNow: number
}

export default function TextFormElement(properties: IProperties): ReactElement {
	const { question, validateNow } = properties
	const defaultValue = useAppSelector(selectAnswers)[question.id]
	const [inputValue, setInputValue] = useState<string | undefined>(
		defaultValue ?? ''
	)
	const [error, setError] = useState<string | undefined>('')

	useDebouncedDispatch(question.id, inputValue)

	useEffect(() => {
		// Trick this component to validate the input value
		if (validateNow !== 0) {
			setError(validate(inputValue, question.validations))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [validateNow])

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
		setError(validate(event.target.value, question.validations))
	}

	const onBlur = () => {
		setError(validate(inputValue, question.validations))
	}

	return (
		<div className='flex flex-col space-y-2'>
			<div className='flex space-x-4'>
				<div className='w-1/3 text-lg font-bold'>
					{question.label}
					{question.validations.required ? '*' : ''}
				</div>
				<div className='flex w-2/3 flex-col'>
					<input
						className={`rounded-md border-2 p-2 focus:outline-none ${
							error
								? 'border-red-500 focus:border-red-500'
								: 'border-gray-300 focus:border-blue-500'
						}`}
						autoComplete='off'
						type='text'
						value={inputValue}
						onChange={onInputChange}
						onBlur={onBlur}
					/>
					{error ? (
						<div className='mt-1 flex text-red-500'>{error}</div>
					) : undefined}
				</div>
			</div>
		</div>
	)
}
