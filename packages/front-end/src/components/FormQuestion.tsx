import type { IFormQuestion } from 'dynamic-survey-common'

import type { ReactElement } from 'react'
import MultiSelectFormElement from './MultiSelectFormElement'
import TextElement from './TextFormElement'

interface IProperties {
	question: IFormQuestion
	validateNow: number
}
export default function FormQuestionComp(
	properties: IProperties
): ReactElement {
	const { question, validateNow } = properties
	if (question.type === 'text') {
		return <TextElement question={question} validateNow={validateNow} />
	}
	return (
		<MultiSelectFormElement question={question} validateNow={validateNow} />
	)
}
