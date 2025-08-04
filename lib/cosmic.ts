import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all published posts with related content
export async function getPosts() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.published': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

// Fetch a single post by slug
export async function getPost(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'posts',
        slug 
      })
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch post: ${slug}`)
  }
}

// Fetch all categories
export async function getCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Fetch a single category by slug
export async function getCategory(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'categories',
        slug 
      })
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch category: ${slug}`)
  }
}

// Fetch posts by category ID
export async function getPostsByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.category': categoryId,
        'metadata.published': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch posts for category: ${categoryId}`)
  }
}

// Fetch all authors
export async function getAuthors() {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch authors')
  }
}

// Fetch a single author by slug
export async function getAuthor(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'authors',
        slug 
      })
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch author: ${slug}`)
  }
}

// Fetch posts by author ID
export async function getPostsByAuthor(authorId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.author': authorId,
        'metadata.published': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch posts for author: ${authorId}`)
  }
}