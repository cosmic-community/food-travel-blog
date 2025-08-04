import Link from 'next/link'
import { Post } from '@/types'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const title = post.metadata?.title || post.title
  const excerpt = post.metadata?.excerpt
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Featured Image */}
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={300}
              height={200}
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Category Badge */}
        {category && (
          <div className="mb-3">
            <CategoryBadge category={category} />
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Author */}
        {author && (
          <div className="pt-4 border-t border-gray-100">
            <AuthorCard author={author} showBio={false} />
          </div>
        )}
      </div>
    </article>
  )
}