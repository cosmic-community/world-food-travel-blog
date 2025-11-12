import { Post } from '@/types'
import Link from 'next/link'

interface HeroProps {
  post: Post
}

export default function Hero({ post }: HeroProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  const location = post.metadata?.location

  return (
    <section className="relative h-[600px] bg-gray-900">
      {/* Background Image */}
      {featuredImage && (
        <div className="absolute inset-0">
          <img
            src={`${featuredImage.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
            width={2400}
            height={1200}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="px-3 py-1 bg-accent text-white rounded-full text-sm hover:bg-orange-600 transition-colors"
                >
                  {category.metadata.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {post.title}
          </h1>

          {/* Location */}
          {location && (
            <p className="text-white text-lg mb-6 flex items-center gap-2">
              <span>📍</span>
              {location}
            </p>
          )}

          {/* Author */}
          {author && (
            <div className="flex items-center gap-4">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.metadata.name}
                  className="w-12 h-12 rounded-full border-2 border-white"
                  width={48}
                  height={48}
                />
              )}
              <div>
                <Link
                  href={`/authors/${author.slug}`}
                  className="text-white font-semibold hover:text-accent transition-colors"
                >
                  {author.metadata.name}
                </Link>
              </div>
            </div>
          )}

          {/* Read Button */}
          <div className="mt-8">
            <Link
              href={`/posts/${post.slug}`}
              className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Read Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}