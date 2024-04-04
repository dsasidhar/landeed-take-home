import type { IFormQuestion } from 'dynamic-survey-common'
import type { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentPage } from 'store/selectors'

import FormQuestionComp from './FormQuestion'

export default function FormPageComp(properties: {
	validateNow: number
}): ReactElement {
	const { validateNow } = properties
	const page = useSelector(selectCurrentPage)

	return (
		<div className='flex flex-col space-y-4 rounded-lg bg-slate-300 p-4 shadow-md'>
			<div className='text-center text-2xl font-bold'>{page.title}</div>
			{page.questions.map((question: IFormQuestion) => (
				<FormQuestionComp
					key={question.id}
					question={question}
					validateNow={validateNow}
				/>
			))}
		</div>
	)
}
