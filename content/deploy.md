# Deployment Guide for Focomo Support Site (Astro)

## Git Subtree Workflow (Recommended)

### Initial Setup

1. **Create separate support repository on GitHub**:
   ```bash
   # On GitHub, create new repository: focomo-support
   # Don't initialize with README (we'll push existing content)
   ```

2. **Add remote for support repository**:
   ```bash
   # From main focomo repository root
   git remote add site-repo https://github.com/USERNAME/focomo-support.git
   ```

3. **Build and initial push to support repository**:
   ```bash
   # Build the Astro site first
   cd site/content && bun run build
   
   # Return to main repo root
   cd ../..
   
   # Push site subtree to separate repo
   git subtree push --prefix=site site-repo trunk
   ```

### Regular Deployment Workflow

```bash
# Make changes to site content
# Commit changes in main repository
git add site/
git commit -m "Update support site content"

# Build the updated site
cd site/content && bun run build && cd ../..

# Deploy to separate support repository
git subtree push --prefix=site site-repo trunk
```

### Alternative: GitHub Pages from Main Repo

```bash
# Build the site
cd site/content && bun run build && cd ../..

# Push to gh-pages branch of trunk repository
git subtree push --prefix=site/content/dist origin gh-pages
```

## Astro-Specific Deployment

### Static Site Generation
Astro builds to static files by default, perfect for GitHub Pages:

```bash
# Development
bun run dev          # http://localhost:4321

# Production build
bun run build        # Outputs to content/dist/

# Preview production build
bun run preview      # Preview the built site
```

### Build Configuration
In `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://koldreams.com/focomo',
  base: '/', // or '/focomo/' if deploying to subdirectory
  build: {
    assets: 'assets'
  }
});
```

## GitHub Pages Configuration

### Option 1: Separate Repository (Recommended)

**Repository Settings** (focomo-support):
- Source: Deploy from a branch
- Branch: `main` (contains built site)
- Folder: `/ (root)`
- Custom domain: `koldreams.com`

**DNS Configuration**:
- CNAME record: `koldreams.com` → `USERNAME.github.io`

### Option 2: Main Repository with Build Output

**Repository Settings** (focomo):
- Source: Deploy from a branch  
- Branch: `gh-pages`
- Folder: `/ (root)`
- URL: `https://USERNAME.github.io/focomo/`

**Build and Deploy Script**:
```bash
#!/bin/bash
# build-and-deploy.sh

# Build the site
cd site/content
bun run build
cd ../..

# Deploy built files to gh-pages
git subtree push --prefix=site/content/dist origin gh-pages
```

## Automated Deployment (GitHub Actions)

Create `.github/workflows/deploy-astro-support.yml`:

```yaml
name: Deploy Astro Support Site

on:
  push:
    branches: [ trunk ]
    paths: [ 'site/**' ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
        
    - name: Setup Bun
      uses: oven-sh/setup-bun@v1
      with:
        bun-version: latest
        
    - name: Install dependencies
      run: |
        cd site/content
        bun install
        
    - name: Build Astro site
      run: |
        cd site/content
        bun run build
        
    - name: Deploy to GitHub Pages
      run: |
        git config --global user.name 'GitHub Actions'
        git config --global user.email 'actions@github.com'
        git subtree push --prefix=site/content/dist origin gh-pages --force

    # Alternative: Deploy to separate repository
    - name: Deploy to support repository
      run: |
        git remote add site-repo https://${{ secrets.SUPPORT_REPO_TOKEN }}@github.com/USERNAME/focomo-support.git
        git subtree push --prefix=site site-repo trunk --force
```

## Vercel Deployment (Alternative)

### Setup
1. Connect repository to Vercel
2. Set root directory: `site/content`
3. Build command: `bun run build`
4. Output directory: `dist`
5. Node.js version: 18.x or later

### Configuration
Create `site/vercel.json`:
```json
{
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "installCommand": "bun install",
  "framework": "astro"
}
```

## Netlify Deployment (Alternative)

### Setup
1. Connect repository to Netlify
2. Base directory: `site/content`
3. Build command: `bun run build`
4. Publish directory: `site/content/dist`

### Configuration
Create `site/netlify.toml`:
```toml
[build]
  base = "site/content"
  command = "bun run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

## Manual Deployment Steps

### Step 1: Build the Site
```bash
# Navigate to content directory
cd site/content

# Install dependencies (first time)
bun install

# Build for production
bun run build

# Verify build output
ls -la dist/
```

### Step 2: Deploy Built Files

**GitHub Pages:**
```bash
# From main repository root
git subtree push --prefix=site/content/dist origin gh-pages
```

**FTP/SFTP:**
```bash
# Upload dist/ contents to web server
rsync -av site/content/dist/ user@server:/path/to/site/
```

**AWS S3:**
```bash
# Sync to S3 bucket
aws s3 sync site/content/dist/ s3://your-bucket-name --delete
```

### Step 3: Verify Deployment
- Visit: https://koldreams.com/focomo
- Check all pages load correctly
- Verify mobile responsiveness
- Test contact links and forms
- Validate with web accessibility tools

## Environment Configuration

### Development Environment
```bash
# site/content/.env.development
SITE_URL=http://localhost:4321
GOOGLE_ANALYTICS_ID=
```

### Production Environment
```bash
# site/content/.env.production
SITE_URL=https://koldreams.com/focomo
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Build-time Environment Variables
In `astro.config.mjs`:
```javascript
export default defineConfig({
  site: process.env.SITE_URL || 'https://koldreams.com/focomo',
  // Other config...
});
```

## Performance Optimization

### Build Optimizations
```bash
# Enable compression
bun run build -- --compress

# Analyze bundle size
bunx astro build --analyze
```

### Asset Optimization
- **Images**: Use Astro's `<Image>` component for automatic optimization
- **Fonts**: Self-host or use font-display: swap
- **CSS**: UnoCSS automatically purges unused styles
- **JavaScript**: Minimal client-side JS, mostly static

### Caching Strategy
```nginx
# nginx configuration for static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public";
}
```

## Troubleshooting

### Common Build Issues

**UnoCSS not generating styles:**
```bash
# Ensure UnoCSS is properly configured
bunx unocss --config uno.config.ts

# Check for class name typos
bun run dev # Development server shows UnoCSS warnings
```

**Astro build failures:**
```bash
# Clear cache and rebuild
rm -rf .astro dist
bun run build

# Check for TypeScript errors
bun run astro check
```

**Content collection errors:**
```bash
# Validate frontmatter schemas
bun run astro check

# Check content file extensions (.md, .mdx)
find src/content -name "*.md" -o -name "*.mdx"
```

### Deployment Issues

**GitHub Pages not updating:**
- Check GitHub Actions logs
- Verify gh-pages branch contains latest build
- Clear browser cache
- Check DNS propagation for custom domains

**Subtree push conflicts:**
```bash
# Force push (use carefully)
git subtree push --prefix=site/content/dist origin gh-pages --force

# Or recreate gh-pages branch
git branch -D gh-pages
git subtree push --prefix=site/content/dist origin gh-pages
```

**Custom domain issues:**
- Verify DNS CNAME record points to username.github.io
- Check GitHub Pages custom domain settings
- Allow 24 hours for DNS propagation
- Test with `dig koldreams.com`

## Monitoring and Analytics

### Performance Monitoring
- **Lighthouse**: Automated performance audits
- **Core Web Vitals**: Monitor user experience metrics
- **PageSpeed Insights**: Google's performance analysis

### Analytics Setup
1. Add Google Analytics ID to environment variables
2. Include tracking script in layout
3. Configure goals for documentation engagement
4. Monitor search queries and popular pages

### Error Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor 404 errors and fix broken links
- Track JavaScript errors (minimal due to static site)

This deployment guide ensures the Focomo support site runs efficiently and reliably across different hosting platforms while maintaining the modern Astro + UnoCSS + Bun stack.