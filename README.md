# kftray Website

This repository contains the source code for the official website of the **kftray** project, which includes comprehensive documentation and a blog. The site is built using Nuxt 3 and Tailwind CSS, optimized for high performance and ease of use.

## Stack

- **Framework**: [Nuxt 3](https://v3.nuxtjs.org/) - The Intuitive Vue Framework
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML.
- **Content Management**: [@nuxt/content](https://content.nuxtjs.org/) - Writing in Markdown and using Vue components seamlessly.
- **Deployment**: Vercel/Netlify (recommended for optimal prerendering)
- **Icons and Fonts**:
  - [@fortawesome/vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome) - Font Awesome 5 Vue component
  - [Google Fonts](https://fonts.google.com/) - Inter and Source Code Pro
- **Additional Tools**:
  - [Plausible Analytics](https://plausible.io/) - Simple and privacy-friendly alternative to Google Analytics
  - [VueUse](https://vueuse.org/) - Collection of essential Vue Composition Utilities

## Project Structure

- `/components` - Vue components including custom layouts and UI elements.
- `/layouts` - The layouts define the structure of the website.
- `/content` - Markdown files that use Nuxt Content to manage the blog and documentation.

## Local Development

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hcavarsan/kftray-blog.git
   cd kftray-website
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Serve with hot reload at localhost:3000:**

   ```bash
   pnpm run dev
   ```

4. **Build for production and launch server:**

   ```bash
   pnpm run build
   pnpm run preview
   ```

5. **Generate static project:**

   ```bash
   pnpm run generate
   ```

## Editing Content

Content for the blog and documentation is stored in the `/content` directory as Markdown files which can be edited directly. Changes will be reflected immediately in your local development environment.

## Support

If you need assistance or have any questions, please file an issue and we will be happy to help.
