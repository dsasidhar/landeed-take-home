## To get it to run

1. `cd packages/front-end`
2. `pnpm install`
3. `cd ../common`
4. `pnpm install`
5. `pnpm build`
6. `cd ../back-end`
7. `pnpm install`
8. `pnpm run dev` (should have .env.local with Mongo Credentials, see .env.example for reference)
   -- new terminal --
9. `cd ../front-end`
10. `pnpm run dev`

## Design decisions

-- Mono repo: To have common validation logic and types
-- Zod: For tying together validation logic and types
-- All form data in redux: This turned out to be a bit overkill and created unnecessary complexity, because I had debounce the updates to store for performance reasons. I would have been better off just using local state for the form data and only updating the store when the form was submitted. But it was too late to turn back. I picked up the task late due to personal commitments.
-- Very simple writes to MonoDB. I could have used a more complex schema and used mongoose to enforce it, but I didn't see the need for this task.
-- Redux Toolkit for all the typing goodness along with state management.
-- First set of questions are in staticQuestions.json in common package.
-- Dynamic questions are in dynamicForm.json in backend (hardcoded).

## Credits

-- Vite template: https://github.com/wtchnm/Vitamin for boiler plate
-- Tailwind CSS styling assist from Copilot (Every thing else is hand written) as I was first time Tailwind user.

## Assumptions

- Question IDs are unique across all pages

## Improvements

- Did not have time to handle form timeout.
- Unit tests for front-end
- Better error handling.
