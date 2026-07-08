# To-Do List

Simple to-do list app for organizing tasks into projects. Built with Javascript bundled with Webpack.

**Live demo:** https://henhenmao.github.io/todo-list/

## Features

- **Projects** — group tasks under named projects, new projects can be created and deleted
- **Tasks** — title, description, due date, and due time, can be checked as complete and deleted
- **Show/hide projects** — toggle a project's visibility from the sidebar, with a fade transition
- **Storage** — projects and tasks are saved to `localStorage`, so app data is saved on the local device even after page refreshes

## Running on your local device

Install dependencies:

```bash
npm install
```

Run the dev server at `http://localhost:8080`:

```bash
npm run dev
```

or build a production bundle to `dist/`:

```bash
npm run build
```
