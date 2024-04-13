## To get it to run

1. `pnpm install`
2. `cd ./packages/common`
3. `pnpm build`
4. `cd ./packages/back-end`
5. `pnpm run dev` (should have .env.local with Mongo Credentials, see .env.example for reference)
   -- new terminal --
6. `cd ../front-end`
7. `pnpm run dev`

## Design decisions

- **Mono Repo**: This project uses a mono repo structure to share common validation logic and types across different packages.

- **Zod**: Zod is used to tie together validation logic and types.

- **Redux**: All form data is stored in Redux. This turned out to be a bit overkill and created unnecessary complexity, as it required debouncing updates to the store for performance reasons. In hindsight, using local state for form data and only updating the store when the form was submitted would have been a simpler solution.

- **MongoDB**: The project uses very simple writes to MongoDB. A more complex schema could have been used with mongoose for enforcement, but it wasn't necessary for this task.

- **Redux Toolkit**: Redux Toolkit is used for state management, providing a lot of typing goodness out of the box.

- **Form Questions**: The first set of form questions are stored in `staticQuestions.json` in the common package. Dynamic questions are hardcoded in `dynamicForm.json` in the backend.

## Credit

- Vite template: https://github.com/wtchnm/Vitamin for boiler plate
- Tailwind CSS styling assist from Copilot (Every thing else is hand written) as I was first time Tailwind user.

## Assumptions

- Question IDs are unique across all pages
- Backend will crash if a valid config is not provided.

## Improvements

- Did not have time to handle form timeout.
- Unit tests for front-end
- Better error handling.
