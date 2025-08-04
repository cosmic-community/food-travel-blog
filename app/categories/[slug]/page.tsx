// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategory, getPostsByCategory } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug) as Category | null

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  const name = category.metadata?.name || category.title
  const description = category.metadata?.description || `Explore ${name} posts on our food travel blog`

  return {
    title: `${name} - Food Travel Blog`,
    description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug) as Category | null

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id) as Post[]
  const name = category.metadata?.name || category.title
  const description = category.metadata?.description
  const featuredImage = category.metadata?.featured_image

  return (
    <div className="min-h-screen bg-white">
      {/* Category Header */}
      <section className="relative py-24 bg-gray-900">
        {featuredImage && (
          <>
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              width={800}
              height={400}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </>
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {name}
          </h1>
          {description && (
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {posts.length} {posts.length === 1 ? 'Post' : 'Posts'} in {name}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No posts in {name} yet
              </h2>
              <p className="text-gray-600">
                Check back soon for new culinary adventures!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}