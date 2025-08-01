# Focomo Site Deployment

## Repository Setup

- **Main monorepo**: https://github.com/koldreams/focomo_code.git
- **Site repository**: https://github.com/koldreams/focomo.git (deployed to GitHub Pages)

## Deployment Process

### 1. Development
```bash
# Navigate to site content directory
cd site/content

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production (test locally)
bun run build
```

### 2. Manual Deployment
```bash
# From main repository root, when ready to deploy:
git subtree push --prefix=site site-repo trunk
```

### 3. Automatic Build & Deploy
Once pushed to the site repository, GitHub Actions automatically:
1. Builds the Astro site using Bun
2. Deploys to GitHub Pages
3. Site becomes available at configured domain

## GitHub Pages Configuration

The site repository should have:
- GitHub Pages enabled
- Source set to "Deploy from a branch" using `trunk` branch
- Custom domain configured (if applicable)

## Workflow File
The `.github/workflows/deploy.yml` file in this directory will be pushed with the subtree and handle automatic deployment in the target repository.

## Commands Reference

```bash
# Check remotes
git remote -v

# Deploy site when ready
git subtree push --prefix=site site-repo trunk

# Push main monorepo changes
git push origin main
```