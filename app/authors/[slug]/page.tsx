import { cosmic, hasStatus } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'

async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'authors',
        slug
      })
      .depth(0)
    
    return response.object as Author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

async function getAuthorPosts(authorId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const posts = response.objects as Post[]
    
    // Manual sorting by created_at (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getAuthorPosts(author.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Author Profile */}
      <div className="mb-12 flex flex-col md:flex-row gap-8 items-start">
        {author.metadata?.profile_photo && (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={author.metadata.name}
            className="w-40 h-40 rounded-full"
            width={160}
            height={160}
          />
        )}
        
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{author.metadata.name}</h1>
          
          {author.metadata?.bio && (
            <p className="text-lg text-gray-600 mb-6">{author.metadata.bio}</p>
          )}

          {/* Social Links */}
          <div className="flex gap-4">
            {author.metadata?.twitter && (
              <a
                href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-accent transition-colors"
              >
                Twitter
              </a>
            )}
            {author.metadata?.instagram && (
              <a
                href={`https://instagram.com/${author.metadata.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-accent transition-colors"
              >
                Instagram
              </a>
            )}
            {author.metadata?.email && (
              <a
                href={`mailto:${author.metadata.email}`}
                className="text-gray-600 hover:text-accent transition-colors"
              >
                Email
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Author Posts */}
      <div>
        <h2 className="text-3xl font-bold mb-8">Stories by {author.metadata.name}</h2>
        
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}