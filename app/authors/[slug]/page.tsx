// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthor, getPostsByAuthor } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug) as Author | null

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio

  return {
    title: `${name} - Food Travel Blog`,
    description: bio || `Read articles by ${name} on our food travel blog`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio
  const profilePhoto = author.metadata?.profile_photo
  const instagram = author.metadata?.instagram
  const website = author.metadata?.website

  return (
    <div className="min-h-screen bg-white">
      {/* Author Header */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {profilePhoto && (
              <img
                src={`${profilePhoto.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={name}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                width={128}
                height={128}
              />
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {name}
            </h1>
            
            {bio && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                {bio}
              </p>
            )}

            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Website
                </a>
              )}
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  @{instagram}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Author's Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Articles by {name}
                </h2>
                <p className="text-gray-600">
                  {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
                </p>
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
                No posts by {name} yet
              </h2>
              <p className="text-gray-600">
                Check back soon for new articles!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}