# jinqo portfolio

Animated developer portfolio with live public projects from `github.com/jinqo`.

## Publish at jinqo.github.io

1. Create a new **public** GitHub repository named exactly `jinqo.github.io`.
2. Push this project to the repository's `main` branch.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment → Source**, choose **GitHub Actions**.
5. Open the **Actions** tab and wait for “Deploy portfolio to GitHub Pages” to finish.

The site will be available at `https://jinqo.github.io`. Every push to `main` rebuilds and republishes it automatically.

## Local development

```powershell
npm install
npm run dev
```

The normal build targets the existing Sites deployment. `npm run build:pages` produces the static `out` directory used by GitHub Pages.
