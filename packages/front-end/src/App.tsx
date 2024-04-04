import '@fortawesome/fontawesome-free/css/all.min.css'

import LoadingOrError from 'components/LoadingOrError'
import Landing from 'pages/Landing'
import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import type { ReactElement } from 'react'

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path='/' element={<Landing />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
