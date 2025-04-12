1. To run project, go into `project` directory, and first run `npm i` in root, then `cd backend` and run `npm i`
2. Open `init.sql` in MySQL Workbench, and run the script, to create and populate database
3. Open two separate terminals, one for frontend, one for backend
4. For backend, `cd backend`, followed by `nodemon index.js`. Wait for `successfully connected`
5. For frontend, while remaining in root, run `npx tailwindcss -i ./src/input.css -o ./src/output.css --watch`