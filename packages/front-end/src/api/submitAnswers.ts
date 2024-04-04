export default async function submitAnswers(
	answers: Record<number, string | undefined>
): Promise<void> {
	const response = await fetch('http://localhost:3000/data', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(answers)
	})
	return response.json() as Promise<void>
}
