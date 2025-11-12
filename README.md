# 🌍 World Food Travel Blog

![World Food Travel Blog](https://imgix.cosmicjs.com/68b41120-bfe6-11f0-acb4-9d8445b3489b-photo-1565299585323-38d6b0865b47-1762965676718.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, magazine-style food travel blog built with Next.js 16 and Cosmic CMS. Discover culinary adventures from around the world with beautiful imagery, engaging narratives, and author profiles.

## ✨ Features

- 📝 **Dynamic Blog Posts** - Browse food travel stories with rich markdown content
- 👥 **Author Profiles** - Detailed writer bios with social media integration
- 🏷️ **Category Filtering** - Explore content by culinary themes
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- 🖼️ **Image Optimization** - Automatic optimization using imgix
- 🎨 **Modern Design** - Clean, editorial-style interface with Inter font
- ⚡ **Fast Performance** - Built with Next.js 16 App Router for speed
- 🔍 **SEO Optimized** - Proper meta tags and structured data

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6914b858e7349beda2919e71&clone_repository=6914ba5ae7349beda2919f0f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a world food travel blog with posts, authors, and categories."

### Code Generation Prompt

> "Based on the content model I created for 'Create a content model for a world food travel blog with posts, authors, and categories.', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Cosmic CMS
- **Language**: TypeScript
- **Font**: Inter
- **Image Optimization**: imgix
- **Package Manager**: Bun

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with a bucket containing the content model

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post

```typescript
const { object: post } = await cosmic.objects
  .findOne({ 
    type: 'posts',
    slug: 'post-slug'
  })
  .depth(1)
```

### Fetching Posts by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.categories': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application integrates with the following Cosmic content model:

### Object Types

1. **Posts** - Food travel blog articles
   - Title (text)
   - Content (markdown)
   - Featured Image (file)
   - Author (object relationship)
   - Categories (object relationships)
   - Location (text)

2. **Authors** - Writer profiles
   - Name (text)
   - Bio (textarea)
   - Profile Photo (file)
   - Social Media Links (text fields)

3. **Categories** - Content organization
   - Name (text)
   - Description (textarea)

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Connect your repository to Vercel
2. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
3. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Connect your repository to Netlify
2. Add environment variables in Site Settings
3. Deploy!

## 📝 License

MIT License - feel free to use this project for your own food travel blog!

<!-- README_END -->