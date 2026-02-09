# kftray-blog

The official documentation website, blog, and downloads page for **kftray** — a cross-platform system tray app and CLI for Kubernetes port forwarding. Built with Next.js 16+, Fumadocs, and TypeScript.

**Live Site**: [https://kftray.app](https://kftray.app)  
**Repository**: [https://github.com/hcavarsan/kftray-blog](https://github.com/hcavarsan/kftray-blog)

## Key Features

- **Comprehensive Documentation** — Fumadocs-powered docs with sidebar navigation, search, and table of contents
- **Technical Blog** — MDX-based blog with author profiles, cover images, and GitHub Discussions comments via Giscus
- **Smart Downloads Page** — Auto-detects user OS/architecture and provides direct download links for the latest kftray releases
- **Dynamic OG Images** — Edge-runtime Open Graph image generation for social sharing
- **SEO Optimized** — Auto-generated sitemap, robots.txt, and structured metadata
- **GitHub Integration** — Live star count in navbar and automatic latest release version fetching
- **Security Transparency** — SBOM (Software Bill of Materials) link in navigation
- **RSS Feed** — Full-text RSS feed for blog posts at `/blog/rss.xml`
- **Dark-Only Design** — Custom dark theme with carefully crafted design tokens

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Run the Development Server](#run-the-development-server)
- [Architecture Overview](#architecture-overview)
  - [Directory Structure](#directory-structure)
  - [Request Lifecycle](#request-lifecycle)
  - [Content System](#content-system)
  - [Data Flow](#data-flow)
- [Content Management](#content-management)
  - [Adding Blog Posts](#adding-blog-posts)
  - [Adding Documentation Pages](#adding-documentation-pages)
  - [Using MDX Components](#using-mdx-components)
  - [Blog Frontmatter Schema](#blog-frontmatter-schema)
- [Available Scripts](#available-scripts)
- [Code Quality](#code-quality)
  - [Biome Configuration](#biome-configuration)
  - [Linting and Formatting](#linting-and-formatting)
  - [Dead Code Detection](#dead-code-detection)
- [Deployment](#deployment)
  - [Docker Deployment](#docker-deployment)
  - [Using Docker Compose](#using-docker-compose)
  - [Manual Docker Build](#manual-docker-build)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
  - [pnpm Install Fails](#pnpm-install-fails)
  - [Fumadocs Generated Files Missing](#fumadocs-generated-files-missing)
  - [Port Already in Use](#port-already-in-use)
  - [Image Optimization Issues](#image-optimization-issues)
  - [MDX Compilation Errors](#mdx-compilation-errors)
- [Contributing](#contributing)

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16+ | React framework with App Router and Turbopack |
| **React** | 19+ | UI library |
| **TypeScript** | Latest | Type-safe JavaScript with strict mode |
| **Fumadocs** | Core: 16.5.2, MDX: 14.2.7, UI: 16.5.2 | Documentation engine with MDX support |
| **Tailwind CSS** | 4+ | Utility-first CSS framework via @tailwindcss/postcss |
| **Biome** | 2.3.14 | Fast linter and formatter (replaces ESLint + Prettier) |
| **Knip** | Latest | Dead code detection |
| **Zod** | 4.3.6 | Schema validation for content frontmatter |
| **Lucide React** | 0.563.0 | Icon library |
| **Mermaid** | 11.12.2 | Diagram rendering in MDX |
| **pnpm** | Latest | Fast, disk-efficient package manager |
| **Node.js** | 20+ | JavaScript runtime |
| **Docker** | Latest | Containerization for deployment |

**Additional Integrations:**
- **Umami Analytics** — Self-hosted at umami.cavarsa.app
- **Giscus** — GitHub Discussions-based comments
- **Renovate** — Automated dependency updates

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Node.js 20 or higher**
   ```bash
   node --version
   # Should output v20.x.x or higher
   ```

   If you need to install or update Node.js, visit [nodejs.org](https://nodejs.org/) or use a version manager like [nvm](https://github.com/nvm-sh/nvm):
   ```bash
   nvm install 20
   nvm use 20
   ```

2. **pnpm**
   ```bash
   pnpm --version
   # Should output 8.x.x or higher
   ```

   If pnpm is not installed:
   ```bash
   npm install -g pnpm
   ```

   Alternatively, enable corepack (built into Node.js 16.13+):
   ```bash
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/hcavarsan/kftray-blog.git
cd kftray-blog
```

### Install Dependencies

This project uses pnpm with workspace configuration. The postinstall script will automatically run Fumadocs MDX code generation after dependencies are installed.

```bash
pnpm install
```

**Expected output:**
```
Packages: +XXX
++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved XXX, reused XXX, downloaded X, added XXX, done

> kftray-docs@0.1.0 postinstall /Users/you/repos/kftray-blog
> fumadocs-mdx

✓ Generated source files
```

The postinstall hook generates `.source/` directory with TypeScript definitions for your MDX content. This directory is git-ignored and regenerated on every install.

### Run the Development Server

Start the Next.js development server with Turbopack (faster than Webpack):

```bash
pnpm dev
```

**Expected output:**
```
  ▲ Next.js 16.x.x (turbo)
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in XXXms
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the kftray documentation homepage.

**Hot Module Replacement (HMR) is enabled** — changes to code or MDX content will automatically refresh in the browser without losing state.

---

## Architecture Overview

### Directory Structure

```
kftray-blog/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Inter font, dark theme, Umami analytics)
│   ├── global.css                # Tailwind imports + custom dark design tokens
│   ├── error.tsx                 # Global error boundary (client component)
│   ├── not-found.tsx             # Custom 404 page
│   ├── robots.ts                 # robots.txt generation
│   ├── sitemap.ts                # XML sitemap generation
│   ├── (home)/                   # Home route group
│   │   ├── layout.tsx            # Home layout (Fumadocs HomeLayout)
│   │   └── page.tsx              # Landing page with hero + feature grid
│   ├── blog/                     # Blog section
│   │   ├── layout.tsx            # Blog layout (Fumadocs HomeLayout)
│   │   ├── page.tsx              # Blog index (card grid, sorted by date)
│   │   ├── [slug]/page.tsx       # Blog post page (MDX rendering, author info, comments)
│   │   └── rss.xml/route.ts      # RSS feed (route handler)
│   ├── docs/                     # Documentation section
│   │   ├── layout.tsx            # Docs layout (Fumadocs DocsLayout with sidebar tree)
│   │   └── [[...slug]]/page.tsx  # Catch-all docs page (MDX rendering with ToC)
│   ├── downloads/                # Downloads section
│   │   ├── layout.tsx            # Downloads layout
│   │   ├── page.tsx              # Downloads page (async, fetches latest GitHub release)
│   │   └── loading.tsx           # Skeleton loading state
│   └── api/
│       └── og/route.tsx          # Open Graph image generation (Edge runtime)
├── components/
│   ├── blog/
│   │   ├── blog-card.tsx         # Blog post card with cover image
│   │   └── blog-comments.tsx     # Giscus comments integration
│   ├── common/
│   │   ├── code-block.tsx        # Styled code block wrapper
│   │   ├── docs-navbar.tsx       # Custom docs navbar with SBOM + GitHub stars
│   │   ├── format-date.tsx       # Date formatter (Intl.DateTimeFormat)
│   │   ├── github-stars.tsx      # Live GitHub star count (server component, 1hr cache)
│   │   ├── linux-icon.tsx        # Custom Linux/Tux SVG icon
│   │   └── sbom-link.tsx         # SBOM security report link
│   ├── downloads/
│   │   ├── download-button.tsx   # OS/arch-aware download link generator
│   │   └── download-manager.tsx  # Full download page with OS detection + tabs
│   └── mdx/
│       ├── blog-image.tsx        # Optimized blog images (GIF-aware)
│       ├── mermaid.tsx           # Client-side Mermaid diagram renderer
│       └── youtube-embed.tsx     # Privacy-first YouTube embed (click-to-load)
├── content/
│   ├── blog/                     # 11 MDX blog posts
│   └── docs/                     # Documentation MDX files
│       ├── index.mdx             # Docs landing page
│       ├── meta.json             # Section ordering
│       ├── getting-started/      # Installation, introduction, quick-start, comparison
│       ├── core-features/        # Port-forwarding, HTTP logging, GitHub sync, etc.
│       ├── interfaces/           # kftray GUI and kftui terminal docs
│       └── guides/               # Architecture, best practices, CLI reference, etc.
├── hooks/
│   └── use-system-detection.ts   # Client-side OS/arch detection hook
├── lib/
│   ├── github.ts                 # GitHub API helpers (stars count, latest release version)
│   ├── nav-links.tsx             # Shared navigation configuration
│   └── source.ts                 # Fumadocs content source loaders (docs + blog)
├── public/                       # Static assets (images, favicon, sitemap)
├── source.config.ts              # Fumadocs MDX collection definitions (docs + blog schema)
├── mdx-components.tsx            # Custom MDX component registry (BlogImage, Mermaid, YouTube)
├── next.config.mjs               # Next.js config (standalone output, remote image patterns)
├── tsconfig.json                 # TypeScript config (strict, bundler resolution, @/* paths)
├── biome.json                    # Biome config (tabs, single quotes, no semicolons, strict rules)
├── knip.json                     # Knip dead code detection config
├── postcss.config.mjs            # PostCSS with @tailwindcss/postcss
├── .npmrc                        # pnpm hoisting config
├── pnpm-workspace.yaml           # pnpm workspace (onlyBuiltDependencies: esbuild, sharp)
├── renovate.json                 # Renovate bot config
├── Dockerfile                    # Multi-stage Docker build (deps → build → runtime)
├── docker-compose.yml            # Docker Compose for local/production container
└── .dockerignore                 # Docker build exclusions
```

### Request Lifecycle

**1. User visits `/docs/getting-started/installation`**

```
Browser Request
    ↓
Next.js App Router (app/docs/[[...slug]]/page.tsx)
    ↓
generateStaticParams() — Pre-generates all doc pages at build time
    ↓
lib/source.ts — Loads MDX content from content/docs/
    ↓
Fumadocs MDX Processor — Parses frontmatter, compiles MDX to React
    ↓
DocsLayout (app/docs/layout.tsx) — Renders sidebar, navbar, ToC
    ↓
MDX Content Rendered — Custom components (Mermaid, CodeBlock) hydrated
    ↓
Response sent to browser
```

**2. User visits `/blog/my-post`**

```
Browser Request
    ↓
Next.js App Router (app/blog/[slug]/page.tsx)
    ↓
generateStaticParams() — Pre-generates all blog pages at build time
    ↓
lib/source.ts — Loads MDX content from content/blog/
    ↓
Zod Schema Validation — Validates frontmatter (title, date, author required)
    ↓
BlogImage, YouTubeEmbed, Mermaid — Custom MDX components rendered
    ↓
Giscus Comments — Client-side GitHub Discussions integration
    ↓
Response sent to browser
```

**3. User visits `/downloads`**

```
Browser Request
    ↓
Next.js App Router (app/downloads/page.tsx) — Server Component
    ↓
lib/github.ts — Fetches latest release version from GitHub API (1hr cache)
    ↓
DownloadManager Component — Client-side OS/arch detection
    ↓
hooks/use-system-detection.ts — Detects macOS/Linux/Windows + Intel/ARM
    ↓
DownloadButton — Generates download URLs for detected platform
    ↓
Response sent to browser with pre-rendered skeleton (loading.tsx)
```

### Content System

The site uses **Fumadocs** as its documentation engine, which provides:

- **MDX Processing** — Markdown with JSX components
- **Frontmatter Validation** — Zod schemas enforce required fields
- **Auto-generated Navigation** — Sidebar and ToC from file structure
- **Search** — Built-in search functionality
- **Syntax Highlighting** — Code blocks with language detection

**Content is defined in `source.config.ts`:**

```typescript
import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { z } from 'zod'

export const docs = defineDocs({
  dir: 'content/docs',
})

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    date: z.string().date().or(z.date()),
    author: z.string(),
    position: z.string().optional(),
    avatar: z.string().optional(),
    avatarLink: z.string().optional(),
    published: z.boolean().default(true),
  }),
})

export default defineConfig({})
```

**Content sources are loaded in `lib/source.ts`:**

```typescript
import { loader } from 'fumadocs-core/source'
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server'
import { blog, docs } from '@/.source/server'

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
})

export const blogSource = loader({
  baseUrl: '/blog',
  source: toFumadocsSource(blog, []),
})
```

The `.source/` directory is auto-generated by `fumadocs-mdx` during the postinstall hook and contains TypeScript definitions for all MDX files.

### Data Flow

**Documentation Pages:**
```
content/docs/**/*.mdx
    ↓
fumadocs-mdx (postinstall)
    ↓
.source/docs.json (generated)
    ↓
lib/source.ts (docsSource loader)
    ↓
app/docs/[[...slug]]/page.tsx (generateStaticParams)
    ↓
Static HTML pages (build time)
```

**Blog Posts:**
```
content/blog/*.mdx
    ↓
fumadocs-mdx (postinstall)
    ↓
.source/blog.json (generated)
    ↓
lib/source.ts (blogSource loader)
    ↓
app/blog/[slug]/page.tsx (generateStaticParams)
    ↓
Static HTML pages (build time)
```

**Downloads Page:**
```
GitHub API (https://api.github.com/repos/hcavarsan/kftray/releases/latest)
    ↓
lib/github.ts (getLatestReleaseVersion with 1hr cache)
    ↓
app/downloads/page.tsx (Server Component, async data fetch)
    ↓
DownloadManager (Client Component with OS detection)
    ↓
DownloadButton (generates platform-specific URLs)
```

**GitHub Stars:**
```
GitHub API (https://api.github.com/repos/hcavarsan/kftray)
    ↓
lib/github.ts (getGitHubStars with 1hr cache)
    ↓
components/common/github-stars.tsx (Server Component)
    ↓
Rendered in navbar (app/docs/layout.tsx)
```

---

## Content Management

### Adding Blog Posts

Blog posts are MDX files in `content/blog/`. Each post must include required frontmatter fields.

**Step 1: Create a new MDX file**

```bash
touch content/blog/my-new-post.mdx
```

**Step 2: Add frontmatter and content**

```mdx
---
title: My New Blog Post
description: A brief description of what this post covers
date: 2026-02-08
author: Your Name
position: Your Title
avatar: /images/avatars/your-avatar.jpg
avatarLink: https://github.com/yourusername
image: /images/blog/my-new-post-cover.jpg
published: true
---

# My New Blog Post

This is the introduction paragraph.

## Section 1

Content goes here. You can use all standard Markdown syntax plus custom MDX components.

<BlogImage src="/img/screenshot.png" alt="Screenshot description" />

## Section 2

More content with a Mermaid diagram:

<Mermaid>
{`graph TD
    A[Start] --> B[Process]
    B --> C[End]`}
</Mermaid>

## Embedding YouTube Videos

<YouTubeEmbed id="dQw4w9WgXcQ" title="Demo video" />
```

**Step 3: Add cover image (optional)**

Place your cover image in `public/images/blog/`:

```bash
cp ~/Downloads/my-cover.jpg public/images/blog/my-new-post-cover.jpg
```

**Step 4: Verify the post appears**

```bash
pnpm dev
```

Navigate to [http://localhost:3000/blog](http://localhost:3000/blog) — your post should appear in the card grid, sorted by date (newest first).

**Step 5: Preview the full post**

Click on your post card or navigate to `http://localhost:3000/blog/my-new-post` to see the rendered post with author info and comments.

### Adding Documentation Pages

Documentation pages are MDX files in `content/docs/`. The sidebar structure is controlled by `meta.json` files in each directory.

**Step 1: Choose the appropriate section**

```
content/docs/
├── getting-started/    # Installation, quick-start guides
├── core-features/      # Feature documentation
├── interfaces/         # GUI and CLI interface docs
└── guides/             # Advanced guides, best practices
```

**Step 2: Create a new MDX file**

```bash
touch content/docs/core-features/my-new-feature.mdx
```

**Step 3: Add frontmatter and content**

```mdx
---
title: My New Feature
description: Learn how to use this powerful feature
---

# My New Feature

This page documents a new feature in kftray.

## Overview

Brief overview of what this feature does.

## Usage

Step-by-step instructions:

1. First step
2. Second step
3. Third step

```bash
# Example command
kftray my-feature --enable
```

## Configuration

Configuration options and examples.

## Troubleshooting

Common issues and solutions.
```

**Step 4: Update meta.json for sidebar ordering**

Edit `content/docs/core-features/meta.json`:

```json
{
  "title": "Core Features",
  "pages": [
    "port-forwarding",
    "http-logging",
    "my-new-feature",
    "github-sync"
  ]
}
```

The order in the `pages` array determines the sidebar order.

**Step 5: Verify the page appears**

```bash
pnpm dev
```

Navigate to [http://localhost:3000/docs](http://localhost:3000/docs) — your new page should appear in the sidebar under "Core Features".

### Using MDX Components

The site provides three custom MDX components registered in `mdx-components.tsx`:

#### BlogImage

Optimized image component with Next.js Image optimization. Renders at 800x450 with rounded borders. Handles GIFs specially (uses `unoptimized` prop to preserve animation).

```mdx
<BlogImage src="/img/screenshot.png" alt="Descriptive alt text" />
```

**Props:**
- `src` (required) — Path to image (relative to `public/` or absolute URL)
- `alt` (required) — Alt text for accessibility

**GIF handling:**
```mdx
<BlogImage src="/img/demo.gif" alt="Animated demo" />
```

GIFs are automatically detected by file extension and rendered with `unoptimized` to preserve animation.

#### Mermaid

Client-side Mermaid diagram renderer. Diagrams are rendered in the browser using the Mermaid library with dark theme.

The component accepts `children` as the Mermaid diagram code:

```mdx
<Mermaid>
{`graph TD
    A[User] --> B[kftray]
    B --> C[Kubernetes API]
    C --> D[Pod]`}
</Mermaid>
```

**Props:**
- `children` (required) — Mermaid diagram syntax as children content

**Supported diagram types:**
- Flowcharts (`graph TD`, `graph LR`)
- Sequence diagrams (`sequenceDiagram`)
- Class diagrams (`classDiagram`)
- State diagrams (`stateDiagram-v2`)
- Entity relationship diagrams (`erDiagram`)
- Gantt charts (`gantt`)
- Pie charts (`pie`)

**Example sequence diagram:**
```mdx
<Mermaid>
{`sequenceDiagram
    participant User
    participant kftray
    participant K8s
    User->>kftray: Start port forward
    kftray->>K8s: Create tunnel
    K8s-->>kftray: Connection established
    kftray-->>User: Port 8080 ready`}
</Mermaid>
```

If rendering fails, the component gracefully falls back to showing the raw diagram code in a code block.

#### YouTubeEmbed

Privacy-first YouTube embed with click-to-load functionality. The video thumbnail is shown initially, and the iframe only loads when the user clicks play.

```mdx
<YouTubeEmbed id="dQw4w9WgXcQ" title="My Video Title" />
```

**Props:**
- `id` (required) — YouTube video ID (the part after `v=` in the URL)
- `title` (optional) — Accessible title for the embed (default: "YouTube video")

**Example:**
For the URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, use:
```mdx
<YouTubeEmbed id="dQw4w9WgXcQ" title="kftray demo" />
```

**Privacy benefits:**
- No cookies or tracking until user clicks play
- Faster page load (no iframe until interaction)
- Thumbnail loaded from `img.youtube.com` (allowed in `next.config.mjs`)

### Blog Frontmatter Schema

All blog posts must include the following frontmatter fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title (used in card and page header) |
| `description` | string | No | Brief description (used in card and meta tags) |
| `date` | string (YYYY-MM-DD) | Yes | Publication date (used for sorting) |
| `author` | string | Yes | Author name (displayed below title) |
| `position` | string | No | Author title/position (displayed below author name) |
| `avatar` | string | No | Path to author avatar image (displayed in post header) |
| `avatarLink` | string | No | URL for author avatar link (usually GitHub profile) |
| `image` | string | No | Path to cover image (displayed in card and OG tags) |
| `published` | boolean | No | Whether post is published (default: true, false hides post) |

**Example with all fields:**

```yaml
---
title: Advanced Kubernetes Port Forwarding Techniques
description: Learn advanced patterns for managing multiple port forwards with kftray
date: 2026-02-08
author: Jane Developer
position: Senior DevOps Engineer
avatar: /images/avatars/jane.jpg
avatarLink: https://github.com/janedev
image: /images/blog/advanced-port-forwarding.jpg
published: true
---
```

**Minimal example (required fields only):**

```yaml
---
title: Quick Tip: Using kftray with Helm
date: 2026-02-08
author: John Smith
---
```

**Validation:**

The schema is enforced by Zod in `source.config.ts`. If you provide invalid frontmatter, you'll see a build error:

```
Error: Invalid frontmatter in content/blog/my-post.mdx
  - date: Required
  - author: Required
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack at http://localhost:3000 |
| `pnpm build` | Production build (static generation + standalone output for Docker) |
| `pnpm start` | Start production server (requires `pnpm build` first) |
| `pnpm postinstall` | Run Fumadocs MDX code generation (runs automatically after `pnpm install`) |
| `pnpm lint` | Run Biome linter (checks for code issues) |
| `pnpm lint:fix` | Run Biome linter with auto-fix |
| `pnpm format` | Check code formatting with Biome |
| `pnpm format:fix` | Fix code formatting with Biome |
| `pnpm check` | Run all Biome checks (lint + format) |
| `pnpm check:fix` | Fix all Biome issues (lint + format) |

**Common workflows:**

**Development:**
```bash
pnpm dev
# Make changes, see live updates at http://localhost:3000
```

**Before committing:**
```bash
pnpm check:fix
# Fixes all linting and formatting issues
```

**Production build test:**
```bash
pnpm build
pnpm start
# Test production build locally at http://localhost:3000
```

**Check for issues without fixing:**
```bash
pnpm check
# Shows all linting and formatting issues without modifying files
```

---

## Code Quality

### Biome Configuration

This project uses **Biome** instead of ESLint and Prettier. Biome is a fast, all-in-one toolchain for linting and formatting.

**Configuration file:** `biome.json`

**Key settings:**

| Setting | Value | Reason |
|---------|-------|--------|
| **Indent** | Tabs | Project convention |
| **Line width** | 100 | Balances readability and screen space |
| **Quote style** | Single quotes | Project convention |
| **Semicolons** | As needed | Omit when possible, add when required |
| **Trailing commas** | All | Cleaner git diffs |

**Strict rules enabled:**

- `noUnusedImports` (error) — Unused imports cause build errors
- `noUnusedVariables` (error) — Unused variables cause build errors
- `noExplicitAny` (error) — Must use proper types, no `any`
- `noNonNullAssertion` (warn) — Avoid `!` operator, use proper null checks

**Files excluded from checks:**

- `node_modules/`
- `.next/`
- `.source/`
- `source.generated.ts`
- `next-env.d.ts`
- `dist/`
- `build/`

### Linting and Formatting

**Check for issues:**
```bash
pnpm lint
```

**Expected output (no issues):**
```
Checked X files in XXXms. No fixes needed.
```

**Expected output (issues found):**
```
src/components/example.tsx:12:7 lint/correctness/noUnusedVariables
  ✖ This variable is unused.
  
  10 │ export function Example() {
  11 │   const [count, setCount] = useState(0)
> 12 │   const unused = 'test'
     │         ^^^^^^
  13 │   return <div>{count}</div>
  14 │ }
```

**Auto-fix issues:**
```bash
pnpm lint:fix
```

**Check formatting:**
```bash
pnpm format
```

**Fix formatting:**
```bash
pnpm format:fix
```

**Run all checks and fixes:**
```bash
pnpm check:fix
```

This is the recommended command to run before committing. It will:
1. Fix all auto-fixable linting issues
2. Format all code according to Biome rules
3. Report any remaining issues that require manual fixes

### Dead Code Detection

The project uses **Knip** to detect unused files, dependencies, and exports.

**Configuration file:** `knip.json`

**Run Knip:**
```bash
npx knip
```

**Expected output (no issues):**
```
✓ No unused files, dependencies, or exports found
```

**Expected output (issues found):**
```
Unused files (1)
  src/old-component.tsx

Unused dependencies (2)
  lodash
  moment

Unused exports (3)
  src/utils.ts: helperFunction
```

**What to do with Knip results:**

- **Unused files** — Delete if truly unused, or add to `knip.json` ignore list if intentionally kept
- **Unused dependencies** — Remove with `pnpm remove <package>`
- **Unused exports** — Remove export keyword if only used internally, or delete if truly unused

**Note:** Knip is not run automatically in CI. It's a manual tool for periodic cleanup.

---

## Deployment

### Docker Deployment

The project includes a production-ready multi-stage Dockerfile optimized for Next.js standalone output.

**Dockerfile stages:**

1. **deps** — Installs dependencies with pnpm (uses BuildKit cache for faster rebuilds)
2. **build** — Builds the Next.js application with `pnpm run build`
3. **runtime** — Minimal production image with only runtime dependencies

**Key features:**

- **Node.js 20 Alpine** — Small base image (~50MB)
- **Non-root user** — Runs as `nextjs` user for security
- **Standalone output** — Only includes necessary files (no node_modules bloat)
- **Sharp optimization** — Installs sharp for fast image optimization
- **Health check** — Built-in health check on port 3000
- **BuildKit cache** — Faster rebuilds with pnpm cache mounting

### Using Docker Compose

The easiest way to run the site in production is with Docker Compose.

**Step 1: Build the image**

```bash
docker compose build
```

**Expected output:**
```
[+] Building 45.2s (XX/XX) FINISHED
 => [deps 1/4] FROM docker.io/library/node:20-alpine
 => [deps 2/4] RUN corepack enable && corepack prepare pnpm@latest --activate
 => [deps 3/4] COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
 => [deps 4/4] RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile
 => [build 1/3] COPY . .
 => [build 2/3] RUN pnpm run build
 => [runtime 1/5] RUN addgroup --system --gid 1001 nodejs
 => [runtime 2/5] RUN adduser --system --uid 1001 nextjs
 => [runtime 3/5] COPY --from=build /app/public ./public
 => [runtime 4/5] COPY --from=build /app/.next/standalone ./
 => [runtime 5/5] COPY --from=build /app/.next/static ./.next/static
 => exporting to image
 => => naming to docker.io/library/kftray-docs:latest
```

**Step 2: Start the container**

```bash
docker compose up -d
```

**Expected output:**
```
[+] Running 1/1
 ✔ Container kftray-blog-web-1  Started
```

**Step 3: Verify the site is running**

```bash
curl http://localhost:3030
```

Or open [http://localhost:3030](http://localhost:3030) in your browser.

**Step 4: View logs**

```bash
docker compose logs -f
```

**Expected output:**
```
kftray-blog-web-1  |   ▲ Next.js 16.x.x
kftray-blog-web-1  |   - Local:        http://0.0.0.0:3000
kftray-blog-web-1  |   - Network:      http://0.0.0.0:3000
kftray-blog-web-1  | 
kftray-blog-web-1  |  ✓ Ready in XXXms
```

**Step 5: Stop the container**

```bash
docker compose down
```

**Configuration:**

The `docker-compose.yml` file maps host port **3030** to container port **3000**. To change the host port, edit `docker-compose.yml`:

```yaml
services:
  web:
    ports:
      - "8080:3000"  # Change 8080 to your desired port
```

### Manual Docker Build

If you prefer not to use Docker Compose, you can build and run the container manually.

**Step 1: Build the image**

```bash
docker build -t kftray-docs:latest .
```

**Step 2: Run the container**

```bash
docker run -d \
  --name kftray-docs \
  -p 3030:3000 \
  -e NODE_ENV=production \
  -e HOSTNAME=0.0.0.0 \
  -e PORT=3000 \
  --restart unless-stopped \
  kftray-docs:latest
```

**Explanation of flags:**

- `-d` — Run in detached mode (background)
- `--name kftray-docs` — Container name
- `-p 3030:3000` — Map host port 3030 to container port 3000
- `-e NODE_ENV=production` — Set Node environment to production
- `-e HOSTNAME=0.0.0.0` — Bind to all network interfaces
- `-e PORT=3000` — Internal port (must match Dockerfile EXPOSE)
- `--restart unless-stopped` — Auto-restart on failure or reboot

**Step 3: Verify the container is running**

```bash
docker ps
```

**Expected output:**
```
CONTAINER ID   IMAGE                  COMMAND                  CREATED          STATUS                    PORTS                    NAMES
abc123def456   kftray-docs:latest     "node server.js"         10 seconds ago   Up 9 seconds (healthy)    0.0.0.0:3030->3000/tcp   kftray-docs
```

**Step 4: View logs**

```bash
docker logs -f kftray-docs
```

**Step 5: Stop and remove the container**

```bash
docker stop kftray-docs
docker rm kftray-docs
```

**Health check:**

The Dockerfile includes a health check that runs every 30 seconds:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1
```

Check health status:
```bash
docker inspect --format='{{.State.Health.Status}}' kftray-docs
```

**Expected output:** `healthy`

---

## Environment Variables

**No environment variables are required for local development.** The site works out of the box after `pnpm install` and `pnpm dev`.

### Hardcoded Integrations

The following integrations are configured with hardcoded values in the codebase:

#### Umami Analytics

**Location:** `app/layout.tsx`

```typescript
<Script
  src="https://umami.cavarsa.app/script.js"
  data-website-id="70662892-98e8-48ce-bde0-d360b7a0d0fc"
  strategy="afterInteractive"
/>
```

**Behavior:**
- Loads after page becomes interactive (Next.js `afterInteractive` strategy)
- Self-hosted Umami instance at `umami.cavarsa.app`
- Fires in both development and production
- No environment variable required

**To disable:** Remove the `<Script>` tag from `app/layout.tsx`.

#### Giscus Comments

**Location:** `components/blog/blog-comments.tsx`

```typescript
<Giscus
  repo="hcavarsan/kftray-blog"
  repoId="your-repo-id"
  category="General"
  categoryId="your-category-id"
  mapping="pathname"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme="dark"
  lang="en"
  loading="lazy"
/>
```

**Behavior:**
- Uses GitHub Discussions for comments
- Configured for `hcavarsan/kftray-blog` repository
- Dark theme forced
- No environment variable required

**To disable:** Remove the `<BlogComments />` component from `app/blog/[slug]/page.tsx`.

#### GitHub API

**Location:** `lib/github.ts`

```typescript
export async function getGitHubStars(): Promise<number> {
  const response = await fetch('https://api.github.com/repos/hcavarsan/kftray', {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })
  // ...
}

export async function getLatestReleaseVersion(): Promise<string> {
  const response = await fetch('https://api.github.com/repos/hcavarsan/kftray/releases/latest', {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })
  // ...
}
```

**Behavior:**
- Unauthenticated API requests (60 requests/hour rate limit)
- 1-hour cache via Next.js `revalidate`
- No environment variable required

**To add authentication (optional):**

If you hit rate limits, you can add a GitHub token:

1. Create a `.env.local` file:
   ```bash
   GITHUB_TOKEN=ghp_your_token_here
   ```

2. Update `lib/github.ts`:
   ```typescript
   const response = await fetch('https://api.github.com/repos/hcavarsan/kftray', {
     headers: {
       Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
     },
     next: { revalidate: 3600 },
   })
   ```

This increases the rate limit to 5,000 requests/hour.

### Remote Image Domains

**Location:** `next.config.mjs`

```javascript
images: {
  remotePatterns: [
    { hostname: 'avatars.githubusercontent.com' },
    { hostname: 'raw.githubusercontent.com' },
    { hostname: 'img.youtube.com' },
    { hostname: 'cdn.hashnode.com' },
    { hostname: 'dev-to-uploads.s3.amazonaws.com' },
  ],
}
```

These domains are allowed for Next.js Image optimization. If you add images from a new domain, add it to this list.

---

## Troubleshooting

### pnpm Install Fails

**Symptom:**
```bash
pnpm install
# Error: ENOENT: no such file or directory, open 'package.json'
```

**Solution:**
Ensure you're in the project root directory:
```bash
cd kftray-blog
pnpm install
```

---

**Symptom:**
```bash
pnpm install
# Error: This project requires pnpm version X but you have version Y
```

**Solution:**
Update pnpm:
```bash
npm install -g pnpm@latest
# or
corepack prepare pnpm@latest --activate
```

---

**Symptom:**
```bash
pnpm install
# Error: sharp installation failed
```

**Solution:**
Sharp is a native dependency that requires build tools. Install platform-specific build tools:

**macOS:**
```bash
xcode-select --install
```

**Linux (Debian/Ubuntu):**
```bash
sudo apt-get install build-essential
```

**Linux (Alpine - Docker):**
```bash
apk add --no-cache python3 make g++
```

Then retry:
```bash
pnpm install
```

### Fumadocs Generated Files Missing

**Symptom:**
```bash
pnpm dev
# Error: Cannot find module '@/.source'
```

**Solution:**
The `.source/` directory is generated by the postinstall hook. Manually run:
```bash
pnpm run postinstall
```

**Expected output:**
```
> kftray-docs@0.1.0 postinstall
> fumadocs-mdx

✓ Generated source files
```

If this fails, check that `content/docs/` and `content/blog/` directories exist and contain valid MDX files.

---

**Symptom:**
```bash
pnpm build
# Error: Invalid frontmatter in content/blog/my-post.mdx
```

**Solution:**
Check the frontmatter in the failing file. Ensure all required fields are present:

```yaml
---
title: My Post Title
date: 2026-02-08
author: Author Name
---
```

See [Blog Frontmatter Schema](#blog-frontmatter-schema) for all required fields.

### Port Already in Use

**Symptom:**
```bash
pnpm dev
# Error: Port 3000 is already in use
```

**Solution 1: Kill the process using port 3000**

**macOS/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution 2: Use a different port**

```bash
PORT=3001 pnpm dev
```

The site will be available at [http://localhost:3001](http://localhost:3001).

### Image Optimization Issues

**Symptom:**
```bash
pnpm dev
# Error: Invalid src prop on `next/image`, hostname "example.com" is not configured
```

**Solution:**
Add the hostname to `next.config.mjs`:

```javascript
images: {
  remotePatterns: [
    // ... existing patterns
    { hostname: 'example.com' },
  ],
}
```

Restart the dev server after changing `next.config.mjs`.

---

**Symptom:**
Images appear broken or don't load in production Docker build.

**Solution:**
Ensure sharp is installed in the Docker image. The Dockerfile includes:

```dockerfile
RUN npm install -g sharp
```

If images still don't work, check that the `public/` directory is correctly copied in the Dockerfile:

```dockerfile
COPY --from=build /app/public ./public
```

### MDX Compilation Errors

**Symptom:**
```bash
pnpm dev
# Error: Unexpected character `<` (U+003C) before name, expected a character that can start a name
```

**Solution:**
This usually means invalid JSX syntax in an MDX file. Common causes:

1. **Unclosed tags:**
   ```mdx
   <BlogImage src="/image.jpg" alt="Test"
   ```
   Fix: Close the tag:
   ```mdx
   <BlogImage src="/image.jpg" alt="Test" />
   ```

2. **Invalid component names:**
   ```mdx
   <blog-image src="/image.jpg" />
   ```
   Fix: Use PascalCase:
   ```mdx
   <BlogImage src="/image.jpg" />
   ```

3. **Missing imports:**
   MDX components are auto-imported via `mdx-components.tsx`. If you add a new component, register it there.

---

**Symptom:**
```bash
pnpm build
# Error: Module not found: Can't resolve '@/components/mdx/my-component'
```

**Solution:**
Ensure the component exists and is exported:

```typescript
// components/mdx/my-component.tsx
export function MyComponent() {
  return <div>Hello</div>
}
```

Then register it in `mdx-components.tsx`:

```typescript
import { MyComponent } from '@/components/mdx/my-component'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    MyComponent,
  }
}
```

---

## Contributing

Contributions are welcome! Whether you're fixing a typo, improving documentation, or adding new features, your help is appreciated.

### How to Contribute

**Step 1: Fork the repository**

Click the "Fork" button on [https://github.com/hcavarsan/kftray-blog](https://github.com/hcavarsan/kftray-blog) to create your own copy.

**Step 2: Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/kftray-blog.git
cd kftray-blog
```

**Step 3: Create a feature branch**

```bash
git checkout -b feature/my-improvement
```

Use a descriptive branch name:
- `feature/add-new-blog-post`
- `fix/broken-link-in-docs`
- `docs/improve-installation-guide`

**Step 4: Make your changes**

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Make your changes
# Test thoroughly at http://localhost:3000
```

**Step 5: Run code quality checks**

```bash
pnpm check:fix
```

This will automatically fix linting and formatting issues. If there are errors that can't be auto-fixed, address them manually.

**Step 6: Commit your changes**

```bash
git add .
git commit -m "feat: add new blog post about advanced port forwarding"
```

Use conventional commit messages:
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `style:` — Code style changes (formatting, no logic change)
- `refactor:` — Code refactoring
- `test:` — Adding or updating tests
- `chore:` — Maintenance tasks

**Step 7: Push to your fork**

```bash
git push origin feature/my-improvement
```

**Step 8: Open a Pull Request**

1. Go to [https://github.com/hcavarsan/kftray-blog/pulls](https://github.com/hcavarsan/kftray-blog/pulls)
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template with:
   - **Description** — What does this PR do?
   - **Motivation** — Why is this change needed?
   - **Testing** — How did you test this?
   - **Screenshots** — If applicable (UI changes)

**Step 9: Wait for review**

A maintainer will review your PR and may request changes. Address any feedback and push new commits to your branch — the PR will update automatically.

### Contribution Guidelines

**Documentation:**
- Use clear, concise language
- Include code examples where helpful
- Test all commands before documenting them
- Update the table of contents if adding new sections

**Blog Posts:**
- Follow the [Blog Frontmatter Schema](#blog-frontmatter-schema)
- Include a cover image (1200x630px recommended)
- Use proper Markdown formatting
- Add alt text to all images

**Code:**
- Follow the Biome configuration (run `pnpm check:fix` before committing)
- Use TypeScript strict mode (no `any` types)
- Add comments for complex logic
- Keep components small and focused

**Commit Messages:**
- Use conventional commit format
- Keep the first line under 72 characters
- Add a detailed description if needed

### Questions?

If you have questions about contributing, open an issue on GitHub or reach out to the maintainers.

---

**Built with care by the kftray community.**
