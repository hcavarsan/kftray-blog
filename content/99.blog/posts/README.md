# Multilingual Blog Posts

This directory contains blog posts organized by language. The structure is as follows:

```
/posts
  /en        # English posts (translations)
  /es        # Spanish posts (translations)
  /pt        # Portuguese posts (translations)
  *.md       # Original posts (English)
```

## How Language Selection Works

1. **Original Posts**: English posts can be placed directly in the `/posts` directory (e.g., `posts/my-post.md`)
2. **Translations**: Translations should be placed in language-specific directories with the same filename (e.g., `posts/es/my-post.md`)
3. **URLs**: All posts use clean URLs without language in the path (e.g., `/blog/posts/my-post`)
4. **Language Parameter**: Language can be selected via URL parameter (e.g., `?lang=es` or `?lang=pt`)
5. **Default Language**: English is the default language when no parameter is specified

## Adding a New Translation

1. When adding a translation, create a file with the same name as the original post in the appropriate language directory
2. Keep the same `timestamp` in all versions to ensure they're linked as translations
3. Translate the title, description, and content
4. Match all frontmatter fields except for the translated fields

## Example Post Structure

```md
---
layout: post
title: Title in English    # Translate this
description: Description in English  # Translate this
image: /img/cover6.png    # Keep the same
timestamp: 1744905365     # Keep the same
author: Author Name       # Keep the same
position: Position        # Can be translated if needed
avatar: https://...       # Keep the same
avatarLink: https://...   # Keep the same
published: true          # Keep the same
---

# Content in English     # Translate from here down
```

When a post exists in multiple languages, language toggles will appear on the post page to switch between available translations.

## Features

- **Backward Compatibility**: Original post URLs continue to work without changes
- **Clean URLs**: All posts use clean URLs without language in the path
- **Language Detection**: The system automatically detects available translations for each post
- **Language Selection**: Users can select languages via the language toggles on post pages or blog listing page
- **Query Parameters**: Language is specified via `?lang=xx` query parameter for clean URL structure