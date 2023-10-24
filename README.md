# 112-1-unit2-twitter-clone

See the live demo here: [https://112-1-unit2-twitter-clone.vercel.app/](https://112-1-unit2-twitter-clone.vercel.app/)
If you have any questions about this repo, feel free to open an issue on this repo or contact me at [eewebprogramming@googlegroups.com](mailto:eewebprogramming@googlegroups.com?subject=twitter-clone%20question)

## Running the app

1. Clone the repo

2. Install dependencies

```bash
yarn install
```

3. Create a `.env.local` file in the root of the project and add a _valid_ Postgres URL. To get a Postgres URL, follow the instructions [here](https://ric2k1.notion.site/Free-postgresql-tutorial-f99605d5c5104acc99b9edf9ab649199?pvs=4).

This is just an example, you should replace the URL with your own.

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

2. Follow the instructions [here](https://orm.drizzle.team/docs/quick-postgresql/node-postgres) to setup drizzle. If you want to use [neon](https://neon.tech/)'s serverless PostgreSQL feature, follow the instructions [here](https://orm.drizzle.team/docs/quick-postgresql/neon) (you can still use database URL to connect to neon's database like a regular PostgreSQL database).

3. Copy and paste other config files as needed

## Other tips and tricks

### VSCode

When navigating more complex codebases, it's useful to leverage your editor's functionality.

- `cmd + click` on a symbol (variable name, function name...) to jump to its definition
- `cmd + shift + f` to search for a string in the entire project
- `cmd + shift + o` to search for a symbol in the current file
- `cmd + p` to search for a file
- right click on a symbol and select "Find all references" to find all places where the symbol is used
- right click on a symbol and select "Rename symbol" to rename the symbol
- hover and click on the chevron next to the line number to fold code segments or comment segments

Many web dev tools provide vscode plugins to make your life easier, here are some of the essential ones:

- eslint: show eslint errors and warnings inline
- tailwindcss: auto-completes tailwind classes, hover tailwind classes to see corresponding css code
- prettier: work with the format document command to format your code

### Nvim

If you are using neovim you probably know what you are doing, check out my neovim config repo [here](https://github.com/madmaxieee/nvim)

## Other resources

- [React Server Components: A Comprehensive Breakdown](https://www.youtube.com/watch?v=VIwWgV3Lc6s)
- [I didn't realize THIS about Tailwind...](https://www.youtube.com/watch?v=ZuLn42merAg)
- [I WISH I Knew These Tailwind Tips Earlier](https://www.youtube.com/watch?v=QBajvZaWLXs)
- [MySQL for developers](https://planetscale.com/learn/courses/mysql-for-developers/introduction/course-introduction)
  - very good course on relational databases, please watch it if you have time
  - although we are using Postgres, most of the concepts are the same
  - refer to postgres docs and drizzle docs about postgres specific syntax
