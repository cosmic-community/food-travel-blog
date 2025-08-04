import { getPosts, getCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])

  const typedPosts = posts as Post[]
  const typedCategories = categories as Category[]

  // Get featured post (first post)
  const featuredPost = typedPosts[0]
  const otherPosts = typedPosts.slice(1)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredPost && <Hero post={featuredPost} />}

      {/* Category Filter */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter categories={typedCategories} />
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Culinary Adventures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover authentic food experiences and hidden culinary gems from around the world
            </p>
          </div>

          {otherPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}