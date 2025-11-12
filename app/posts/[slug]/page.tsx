// app/posts/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug
      })
      .depth(1)
    
    return response.object as Post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  const location = post.metadata?.location
  const featuredImage = post.metadata?.featured_image

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-auto"
            width={1200}
            height={600}
          />
        </div>
      )}

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        
        {location && (
          <p className="text-gray-600 mb-4 flex items-center gap-2">
            <span>📍</span>
            {location}
          </p>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
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

        {/* Author */}
        {author && (
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                className="w-12 h-12 rounded-full"
                width={48}
                height={48}
              />
            )}
            <div>
              <Link
                href={`/authors/${author.slug}`}
                className="font-semibold hover:text-accent transition-colors"
              >
                {author.metadata.name}
              </Link>
              <p className="text-sm text-gray-600">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Post Content */}
      <div className="prose prose-lg">
        <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
      </div>
    </article>
  )
}