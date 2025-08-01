# Focomo Support Site - Developer Documentation

Modern support website for the Focomo 3D focus timer app, built with Astro and UnoCSS.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## 🛠 Tech Stack

- **[Astro](https://astro.build)** - Static site generator with component islands
- **[UnoCSS](https://unocss.dev)** - Instant on-demand atomic CSS engine
- **[MDX](https://mdxjs.com)** - Markdown with React components
- **[Bun](https://bun.sh)** - Fast JavaScript runtime and package manager

## 📁 Project Structure

```
content/                      # Complete Astro project
├── src/
│   ├── components/           # Reusable Astro components
│   ├── content/             # Content collections (docs, FAQ)
│   │   ├── docs/            # Documentation markdown files
│   │   ├── faq/             # FAQ markdown files
│   │   └── config.ts        # Content collection schemas
│   ├── layouts/             # Page layouts
│   │   └── Layout.astro     # Base layout with nav/footer
│   └── pages/               # Route pages
│       ├── index.astro      # Homepage
│       ├── faq.astro        # FAQ page
│       └── [...].astro      # Dynamic routes
├── public/                  # Static assets
├── dist/                    # Build output (generated)
├── astro.config.mjs         # Astro configuration
├── uno.config.ts            # UnoCSS configuration
├── package.json             # Dependencies and scripts
├── deploy.md                # Deployment instructions
└── README.md                # This file
```

## 🎨 Styling with UnoCSS

This project uses UnoCSS for utility-first CSS. Key features:

### Custom Theme
- **Tomato Colors**: Custom color palette based on Focomo's branding
- **Typography**: Inter font with optimized weights
- **Spacing**: Consistent spacing scale
- **Animations**: Custom animations for enhanced UX

### Utility Shortcuts
Pre-defined utility combinations for common patterns:

```typescript
// Layout shortcuts
'container-custom': 'max-w-6xl mx-auto px-4 lg:px-8',
'section-spacing': 'py-12 lg:py-16',

// Button shortcuts  
'btn-primary': 'btn-base bg-tomato-500 text-white hover:bg-tomato-600...',
'btn-outline': 'btn-base bg-transparent text-tomato-500 border-2...',

// Card shortcuts
'card-hover': 'card-base hover:transform hover:translate-y-[-4px]...',
'card-surface': 'bg-surface rounded-custom-lg p-6',
```

### Usage Examples
```html
<!-- Hero section with custom shortcuts -->
<section class="text-center section-spacing">
  <h1 class="hero-title">Welcome to Focomo</h1>
  <p class="hero-description">Your 3D focus companion</p>
  <a href="/docs" class="btn-primary">Get Started</a>
</section>

<!-- Card grid with responsive utilities -->
<div class="grid-responsive">
  <div class="card-hover">
    <h3 class="heading-secondary">Quick Start</h3>
    <p class="text-muted">Learn the basics...</p>
  </div>
</div>
```

## 📝 Content Management

### Adding Documentation
1. Create new `.md` file in `src/content/docs/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   title: "Page Title"
   description: "Page description for SEO"
   category: "core" | "advanced"
   order: 1
   ---
   ```

### Adding FAQ Items
1. Create new `.md` file in `src/content/faq/`
2. Add frontmatter:
   ```yaml
   ---
   question: "How do I...?"
   category: "3D Interactions"
   order: 1
   tags: ["gestures", "troubleshooting"]
   ---
   ```

### Content Collections
Astro's content collections provide type safety and automatic routing:
- **Docs**: `/docs/[slug]` routes
- **FAQ**: Grouped by category on `/faq` page
- **Type Safety**: Frontmatter validated via Zod schemas

## 🚀 Deployment

### GitHub Pages (Recommended)
```bash
# Build static site
bun run build

# Deploy using git subtree (from repository root)
git subtree push --prefix=site/content/dist origin gh-pages
```

### Separate Repository Deployment
```bash
# Add remote for separate support repository
git remote add site-repo https://github.com/USERNAME/focomo-support.git

# Deploy entire site directory to separate repo (from repository root)
git subtree push --prefix=site site-repo trunk
```

### Vercel/Netlify
1. Connect repository to deployment platform
2. Set build directory: `site/content`
3. Set build command: `bun run build`
4. Set publish directory: `dist`
5. Deploy automatically on git push

See [deploy.md](./deploy.md) for complete deployment instructions.

## 🔧 Configuration

### Astro Config
Key settings in `astro.config.mjs`:
- **Site URL**: For sitemap generation (currently: https://support.koldreams.com)
- **Integrations**: UnoCSS, MDX, Sitemap
- **Build Options**: Output directory and asset handling

### UnoCSS Config
Customize styling in `uno.config.ts`:
- **Presets**: Uno (utilities), Typography, Web Fonts
- **Theme**: Colors, spacing, animations
- **Shortcuts**: Reusable utility combinations
- **Rules**: Custom CSS rules

### Content Config
Define content schemas in `src/content/config.ts`:
- **Validation**: Zod schemas for frontmatter
- **Collections**: Docs and FAQ content types
- **Type Safety**: Automatic TypeScript types

## 📱 Responsive Design

Mobile-first approach with UnoCSS breakpoints:
- **sm**: 640px and up
- **md**: 768px and up  
- **lg**: 1024px and up
- **xl**: 1280px and up

```html
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards automatically adjust -->
</div>

<!-- Responsive typography -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">Title</h1>
```

## ♿ Accessibility Features

- **Skip Links**: Keyboard navigation support
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Screen reader support
- **Color Contrast**: WCAG compliant colors
- **Focus States**: Visible focus indicators
- **Alt Text**: All images have descriptive alt text

## 🔍 SEO Optimization

- **Meta Tags**: Title, description, Open Graph
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Auto-generated from routes
- **Performance**: Optimized images and minimal JavaScript
- **Social Sharing**: Open Graph and Twitter cards

## 🧪 Development

### Local Development
```bash
# Start dev server with hot reload
bun run dev

# Build and preview locally
bun run build && bun run preview

# Type checking
bun run astro check
```

### Adding New Features
1. **Components**: Create in `src/components/`
2. **Pages**: Add to `src/pages/` for new routes
3. **Styles**: Use UnoCSS utilities or add to config
4. **Content**: Use content collections for scalable content

### Performance Tips
- **Images**: Use Astro's `<Image>` component for optimization
- **Islands**: Minimize client-side JavaScript
- **Preloading**: Prefetch critical resources
- **Caching**: Configure appropriate cache headers

## 📊 Analytics & Monitoring

Ready for analytics integration:
- **Google Analytics**: Add tracking ID to layout
- **Performance**: Core Web Vitals monitoring
- **Error Tracking**: Sentry or similar service
- **Search Console**: Monitor search performance

---

**Need help?** Check the [Astro documentation](https://docs.astro.build) or [UnoCSS documentation](https://unocss.dev).

Transform your focus with beautiful, accessible documentation! 🍅✨