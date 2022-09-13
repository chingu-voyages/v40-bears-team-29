# CHINGU BEARS 29 - THE VOYAGE

This project is a collaborative effort to complete Chingu.io's voyage 40. It utilizes the Agile/SCRUM methodology, in our case, applicable originally to a team of 4.

## SPRINT ONE

1. Things accomplished:

   - Meet the team (goals, expectations, availabity)

   - Address meetings: schedule, structure, purpose

   - Project was chosen: It's features were laid, the tech stack was set, Git workflow determined, MVP characteristics, and low fidelity wireframe sketched.

> The project is a travel message board application with Auth and CRUD abilities, built with the PERN stack (postgres, express, react, and node), deployed via Heroku, and managed via Github Projects.

2. Situations that required extra attention:

   - Routing VS not Routing (client): An extensive discussion took place on whether or not the client should be routed. It triggered a very constructive discussion on Why one over the other, research, deploying a mock with both versions, reviewing, coming to a final decision based on facts gathered during the process instead of personal preference.

   - File Upload: The app supports images to posted by the user. The original idea was implementing markdown to handle the process. This raised concerns. It triggered exploring file upload packages, implementing Multer (along with filereader) to a mock, deployed, reviewed, comparison between both approaches, and final decision, once again, based on facts rather than personal preferences.

   - We lost a team member: Unfortunately, one of our team members fell ill and could not continue the voyage. This means the previous responsibilities taken by him are now split between the other teammates, and our time planning could easily be affected. Good thing we were ahead of time =)

> Extras of sprint one: Two pair sessions took place in order to share uncharted territory. On about DB, another about Node/Express

## SPRINT TWO - current

1. Things accomplished:

   - Client all pages built and routed following the navigation flow determined in the low-fid wireframe

   - Project structure was set during sprint one, but futher configuration and DB implementation/ testing took place

   - Our backlog is designed and all Epics built, prioritized, broken down into user stories, and tasks

   - A Sprint retrospective and planning session took place

   - The AUTH Epic is the current work, for which several tasks are already complete

2. Situations that required extra attention:

   - Decision over security concerns: JWT vs Cookies, which triggered research, examples of both approaches explored, evaluation of which would be more applicable for our purposes

   - Deployment platform displaying payload in plain text unless SSL purchased (currently under discussion)

---

### requiments

node 18.2.0
postgresql >= 12

### setup database

```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### development

if you have a local postgres with different credentials from the default you can edit them using this .env file

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432"
SECRET_KEY="pls_set_a_real_value_here_in_production"
```

the format is postgresql://USER:PASSWORD@HOST:PORT
is recommended you use an admin user in development as sequelize need the permission to create new databases
but if that is not possible you can pass a database name using this format postgresql://USER:PASSWORD@HOST:PORT/DATABASE

```
npm install -g foreman
npx foreman start -f Procfile.dev
```

also look into setting up standard js linters https://standardjs.com/#visual-studio-code

### deploy

make sure to set the env var REACT_APP_API_ENDPOINT to the appropriate value in production

```
git push heroku master
```

### test

```
NODE_ENV="test" npx sequelize-cli db:create
NODE_ENV="test" npx sequelize-cli db:migrate

jest ./test
```
