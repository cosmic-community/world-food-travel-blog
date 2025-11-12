import { Post } from '@/types'
import Link from 'next/link'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  const location = post.metadata?.location

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* Featured Image */}
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
            width={400}
            height={256}
          />
        </Link>
      )}

      <div className="p-6">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.slice(0, 2).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-xs px-2 py-1 bg-accent text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                {category.metadata.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold mb-2">
          <Link href={`/posts/${post.slug}`} className="hover:text-accent transition-colors">
            {post.title}
          </Link>
        </h3>

        {/* Location */}
        {location && (
          <p className="text-gray-600 text-sm mb-4 flex items-center gap-1">
            <span>📍</span>
            {location}
          </p>
        )}

        {/* Author */}
        {author && (
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
            )}
            <div>
              <Link
                href={`/authors/${author.slug}`}
                className="font-semibold text-sm hover:text-accent transition-colors"
              >
                {author.metadata.name}
              </Link>
              <p className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}