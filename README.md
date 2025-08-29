# Recipes on GitHub Pages (Serverless)

This is a minimal, serverless recipe site that stores every recipe as a Markdown file inside `recipes/` in this repo. GitHub Pages (Jekyll) renders the Markdown to HTML automatically.

**Files included**
- `index.html` — list + search recipes (by filename), links to rendered pages
- `new.html` — create a new recipe (writes a new Markdown file via GitHub API)
- `update.html` — append a new History entry to an existing recipe

> ⚠️ **Security note:** This starter uses a hardcoded GitHub Personal Access Token in client-side JavaScript, which exposes the token to anyone who can view your site. Use only for personal/private scenarios. Prefer a short-lived fine-scoped token and rotate it frequently.
