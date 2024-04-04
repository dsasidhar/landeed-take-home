import { IFormConfig } from 'dynamic-survey-common'

export default async function getFormPages(): Promise<IFormConfig> {
	const response = await fetch('http://localhost:3000/dynamic-forms')
	return response.json() as Promise<IFormConfig>
}
