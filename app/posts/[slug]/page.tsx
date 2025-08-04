// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPost } from '@/lib/cosmic'
import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug) as Post | null

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const title = post.metadata?.title || post.title
  const description = post.metadata?.excerpt || 'Read this culinary adventure on our food travel blog'
  const imageUrl = post.metadata?.featured_image?.imgix_url

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: `${imageUrl}?w=1200&h=630&fit=crop&auto=format` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [`${imageUrl}?w=1200&h=630&fit=crop&auto=format`] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug) as Post | null

  if (!post) {
    notFound()
  }

  const title = post.metadata?.title || post.title
  const content = post.metadata?.content || ''
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const excerpt = post.metadata?.excerpt

  return (
    <article className="min-h-screen bg-white">
      {/* Featured Image */}
      {featuredImage && (
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
            width={800}
            height={400}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Badge */}
        {category && (
          <div className="mb-6">
            <CategoryBadge category={category} />
          </div>
        )}

        {/* Title and Excerpt */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
          {excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {excerpt}
            </p>
          )}
        </header>

        {/* Author Info */}
        {author && (
          <div className="mb-12">
            <AuthorCard author={author} showBio={false} />
          </div>
        )}

        {/* Content */}
        <div className="prose-custom">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>

        {/* Author Bio Section */}
        {author && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">About the Author</h3>
            <AuthorCard author={author} showBio={true} />
          </div>
        )}
      </div>
    </article>
  )
}