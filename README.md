# 112-1-unit2-twitter-clone

See the live demo here: [https://112-1-unit2-twitter-clone.vercel.app/](https://112-1-unit2-twitter-clone.vercel.app/)
If you have any questions about this repo, feel free to open an issue on this repo or contact me at [eewebprogramming@googlegroups.com](mailto:eewebprogramming@googlegroups.com?subject=twitter-clone%20question)

I update this repo every now and then, so make sure to pull the latest changes with `git pull` before you start working on the project. I will mostly be adding documentation and comments, so you don't have to worry about new updates breaking your code.

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

1. Create a next app, and select `Yes` on all prompts

```bash
yarn create next-app
```

2. Install prettier and prettier plugins

```bash
yarn add -D prettier prettier-plugin-tailwindcss @trivago/prettier-plugin-sort-imports
```

3. Install eslint plugins, eslint is already installed by default when running `yarn create next-app`

```bash
yarn add -D eslint-config-prettier @typescript-eslint/eslint-plugin
```

4. Copy and paste the `.eslintrc.json` file and `.prettierrc.cjs` file from this repo to your project root

5. Follow the instructions [here](https://orm.drizzle.team/docs/quick-postgresql/node-postgres) to setup drizzle. If you want to use [neon](https://neon.tech/)'s serverless PostgreSQL feature, follow the instructions [here](https://orm.drizzle.team/docs/quick-postgresql/neon) (you can still use database URL to connect to neon's database like a regular PostgreSQL database).

6. Copy and paste the `drizzle.config.ts` file from this repo to your project root

7. I used `dotenv` to read environment variables in `drizzle.config.ts`, so you need to install it

```bash
yarn add -D dotenv
```

8. Refer to [this section](#what-is-shadcnui) to setup `shadcn/ui` if you want to use it

9. Install other dependencies if you run into import errors when copying and pasting code from this repo. This type of error is fairly common, the error message should tell you what dependency you need to install. Try to solve the problem by youself before reaching for help.

## What is shadcn/ui?

As stated on its own [website](https://ui.shadcn.com/docs):

> (shadcn/ui is a) **Re-usable components built using Radix UI and Tailwind CSS**.
>
> This is NOT a component library. It's a collection of re-usable components that you can copy and paste into your apps.
>
> What do you mean by not a component library?
>
> I mean you do not install it as a dependency. It is not available or distributed via npm.
>
> Pick the components you need. Copy and paste the code into your project and customize to your needs. The code is yours.
>
> _Use this as a reference to build your own component libraries._

Radix UI is a styleless component library. It provides the accessible barebone components for you to build your own component library. Tailwind CSS is a utility-first CSS framework. It provides a set of utility classes that you can use to style your components. shadcn/ui is a collection of components built using Radix UI and Tailwind CSS. You can copy and paste the components into your own project and customize them to your needs.

The `components.json` file is used and maintained by the `shadcn/ui` [cli tool](https://ui.shadcn.com/docs/cli). Follow the instructions to setup the cli tool. It is not necessary to setup the cli tool to use the components, but it is useful to have the cli tool to copy and paste the files for you. All components in "./src/components/ui/" are from shadcn/ui, feel free to copy and paste them in your code. You don't have to understand everything in the code, but it's useful to understand if you want to know how to write good components. Learn more about shadcn/ui [here](https://ui.shadcn.com/).

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
