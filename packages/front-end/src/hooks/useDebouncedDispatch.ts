import debounce from 'lodash/debounce'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addAnswer } from 'store/answersSlice'

const DEBOUNCE_DELAY_MS = 450

export default function useDebouncedDispatch(
	id: number,
	inputValue: string | number | undefined
) {
	const dispatch = useDispatch()

	useEffect(() => {
		const debounced = debounce(value => {
			dispatch(
				addAnswer({
					questionId: id,
					answer: value
				})
			)
		}, DEBOUNCE_DELAY_MS)

		debounced(inputValue)

		return () => {
			debounced.cancel()
		}
	}, [inputValue, dispatch, id])
}
