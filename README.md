# 112-1-unit2-twitter-clone

See the live demo here: [https://112-1-unit2-twitter-clone.vercel.app/](https://112-1-unit2-twitter-clone.vercel.app/)
If you have any questions about this repo, feel free to open an issue on this repo or contact me at [eewebprogramming@googlegroups.com](mailto:eewebprogramming@googlegroups.com?subject=twitter-clone%20question)

## Running the app

1. Clone the repo

2. Install dependencies

```bash
yarn install
```

3. Create a `.env.local` file in the root of the project and add a valid postgres url. To get a posgresql url, follow the instructions [here](https://ric2k1.notion.site/Free-postgresql-tutorial-f99605d5c5104acc99b9edf9ab649199?pvs=4).

```bash
POSTGRES_URL="postgres://postgres:postgres@localhost:5432/twitter"
```

4. Run the migrations

```bash
yarn migrate
```

4. Start the app

```bash
yarn dev
```

## Managing the database

`drizzle-kit` provides some useful commands to manage the database.

### Update database schema

Note that if your schema changes, some data might be deleted in the process. `drizzle-kit` would prompt you about destructive changes.

```bash
yarn drizzle-kit push:pg
```

### View or edit data

This command launches a web UI to view or edit data in the database.

```bash
yarn drizzle-kit studio
```

## Setup guide

1. Create a next app, and select default options on all prompts

```bash
yarn create next-app
```

2. Follow the instructions [here](https://orm.drizzle.team/docs/quick-postgresql/node-postgres) to setup drizzle
   If you want to use [neon](https://neon.tech/)'s serverless postgresql, follow the instructions [here](https://orm.drizzle.team/docs/quick-postgresql/neon)

3. Copy paste other config files as needed
