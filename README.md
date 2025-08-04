# Food Travel Blog

![App Preview](https://imgix.cosmicjs.com/e88d58c0-715d-11f0-a051-23c10f41277a-photo-1559339352-11d035aa65de-1754330858700.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful Next.js website showcasing culinary adventures from around the world. Built with your existing Cosmic content, this food travel blog features immersive storytelling about food culture, street food discoveries, local markets, and fine dining experiences.

## Features

- 🍽️ **Dynamic Content Display** - Automatically renders posts, authors, and categories from your Cosmic bucket
- 🏷️ **Category Filtering** - Browse posts by food categories like Street Food, Fine Dining, Local Markets, and Food Culture  
- 👤 **Author Profiles** - Dedicated author pages showcasing contributor bios and their published articles
- 📝 **Rich Content Rendering** - Full markdown support for detailed blog post content with proper formatting
- 🖼️ **Responsive Image Optimization** - Optimized food photography using imgix with automatic compression and sizing
- 🔍 **SEO Optimization** - Dynamic meta tags, structured data, and search engine friendly URLs
- 📱 **Mobile Responsive** - Fully responsive design that works beautifully on all devices
- ⚡ **Fast Performance** - Server-side rendering with Next.js 15 for optimal loading speeds

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6890f612f32878cede782bd7&clone_repository=689124acdd977d3467eb5522)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a food travel blog with posts, authors, and categories"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router architecture
- **TypeScript** - Type-safe development with strict typing
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Cosmic** - Headless CMS for content management
- **React Markdown** - Markdown content rendering
- **Imgix** - Image optimization and transformation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the food travel blog content model

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Posts with Related Content
```typescript
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Include author and category objects
```

### Getting Posts by Category
```typescript
const categoryPosts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId // Query by category ID
  })
  .depth(1)
```

### Fetching a Single Post
```typescript
const post = await cosmic.objects
  .findOne({ 
    type: 'posts',
    slug: postSlug 
  })
  .depth(1) // Include connected author and category
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket structure:

- **Posts** - Main blog content with title, excerpt, content (markdown), featured image, author, category, and published status
- **Authors** - Writer profiles with name, bio, profile photo, Instagram handle, and website
- **Categories** - Content organization with name, description, and featured image

The website automatically handles:
- Content relationships between posts, authors, and categories
- Image optimization using Cosmic's imgix integration
- Dynamic routing for posts, authors, and categories
- SEO meta tags and structured data

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy automatically with each push to main

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `out` (if using static export)
4. Add environment variables in Netlify dashboard

### Environment Variables
Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key (for future admin features)

<!-- README_END -->