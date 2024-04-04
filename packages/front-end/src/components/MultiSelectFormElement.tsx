import { IFormQuestionMulti, validate } from 'dynamic-survey-common'
import { ReactElement, useEffect, useState } from 'react'
import { addAnswer } from 'store/answersSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectAnswers } from 'store/selectors'

const NO_OPTION_SELECTED = {
	id: undefined,
	label: 'Select an option'
}

export default function MultiSelectFormElement(properties: {
	question: IFormQuestionMulti
	validateNow: number
}): ReactElement {
	const { question, validateNow } = properties
	const { options, label, allowCustomInput, id, validations } = question
	const allOptions = allowCustomInput
		? [NO_OPTION_SELECTED, ...options, { id: 'custom', label: 'Custom' }]
		: [NO_OPTION_SELECTED, ...options]

	const defaultValue = useAppSelector(selectAnswers)[id]

	let defaultOptionId
	let defaultCustomSelectInputValue

	if (defaultValue) {
		const selectedOption = allOptions.find(option => option.id === defaultValue)

		if (selectedOption) {
			// if there is a default value (coming from the store)
			// and we find that option then an option from drop down is selected
			defaultOptionId = defaultValue
		} else {
			// if there is a default value (coming from the store)
			// and we don't find that option then custom option is selected
			defaultOptionId = 'custom'
			defaultCustomSelectInputValue = defaultValue
		}
	} else {
		// if there is no default value (coming from the store)
		// then the first option is selected which asks the user to select a value
		defaultOptionId = allOptions[0].id
	}

	const [selectedOption, setSelectedOption] = useState(defaultOptionId)
	const [customSelectInputValue, setCustomSelectInputValue] = useState<
		string | undefined
	>(defaultCustomSelectInputValue)

	const [error, setError] = useState<string | undefined>()

	const dispatch = useAppDispatch()

	useEffect(() => {
		// Trick this component to validate the input value
		if (validateNow !== 0) {
			if (selectedOption === 'custom') {
				setError(validate(customSelectInputValue, validations))
			} else {
				setError(
					validate(
						selectedOption ? `${selectedOption}` : undefined,
						validations
					)
				)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [validateNow])

	const onSelectedOptionChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const eventTargetValue =
			event.target.value === NO_OPTION_SELECTED.label
				? undefined
				: event.target.value
		if (eventTargetValue === selectedOption) {
			return
		}
		const selected = options.find(option => option.id === eventTargetValue)
		setSelectedOption(eventTargetValue)
		dispatch(
			addAnswer({
				questionId: id,
				answer: eventTargetValue === 'custom' ? undefined : eventTargetValue
			})
		)
		if (eventTargetValue === 'custom') {
			setError(validate(customSelectInputValue, validations))
		} else {
			setError(
				validate(selected?.id ? selected?.label : undefined, validations)
			)
		}
	}

	const onCustomSelectInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCustomSelectInputValue(event.target.value)
		setError(validate(event.target.value, validations))
		dispatch(
			addAnswer({
				questionId: id,
				answer: event.target.value
			})
		)
	}

	return (
		<div className='flex flex-col space-y-2'>
			<div className='flex space-x-4'>
				<div className='w-1/3 text-lg font-bold'>
					{label}
					{validations.required ? '*' : ''}
				</div>
				<div className='flex w-2/3 flex-col space-y-4'>
					<select
						className={`w-full rounded-md border-2 p-2 focus:outline-none ${
							error && selectedOption !== 'custom'
								? 'border-red-500 focus:border-red-500'
								: 'border-gray-300 focus:border-blue-500'
						}`}
						value={selectedOption}
						onChange={onSelectedOptionChange}
					>
						{allOptions.map(option => (
							<option key={option.id ?? 'defaultKey'} value={option.id}>
								{option.label}
							</option>
						))}
					</select>
					{selectedOption !== 'custom' && error ? (
						<div className='mt-1 flex text-red-500'>{error}</div>
					) : undefined}
					{allowCustomInput && selectedOption === 'custom' ? (
						<div className='flex w-full flex-col'>
							<span className='text-sm font-bold'>or enter custom:</span>
							<input
								className={`rounded-md border-2 p-2 focus:outline-none ${
									selectedOption === 'custom' && error
										? 'border-red-500 focus:border-red-500'
										: 'border-gray-300 focus:border-blue-500'
								}`}
								type='text'
								placeholder='Custom input'
								value={customSelectInputValue}
								onChange={onCustomSelectInputChange}
							/>
							{selectedOption === 'custom' && error ? (
								<div className='mt-1 text-red-500'>{error}</div>
							) : undefined}
						</div>
					) : undefined}
				</div>
			</div>
		</div>
	)
}
