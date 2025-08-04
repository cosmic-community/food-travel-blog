import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'

interface HeroProps {
  post: Post
}

export default function Hero({ post }: HeroProps) {
  const title = post.metadata?.title || post.title
  const excerpt = post.metadata?.excerpt
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category

  return (
    <section className="relative bg-gray-900 text-white">
      {/* Background Image */}
      {featuredImage && (
        <>
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            width={800}
            height={400}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-4xl">
          {/* Category Badge */}
          {category && (
            <div className="mb-6">
              <CategoryBadge category={category} />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <Link 
              href={`/posts/${post.slug}`}
              className="hover:text-gray-200 transition-colors"
            >
              {title}
            </Link>
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
              {excerpt}
            </p>
          )}

          {/* Author */}
          {author && (
            <div className="flex items-center space-x-4">
              <AuthorCard author={author} showBio={false} />
            </div>
          )}

          {/* Read More Button */}
          <div className="mt-8">
            <Link
              href={`/posts/${post.slug}`}
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Read Full Story
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}