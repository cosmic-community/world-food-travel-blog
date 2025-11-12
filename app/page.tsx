import { cosmic, hasStatus } from '@/lib/cosmic'
import { Post } from '@/types'
import PostCard from '@/components/PostCard'
import Hero from '@/components/Hero'

async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
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

export default async function Home() {
  const posts = await getPosts()
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)

  return (
    <div>
      {featuredPost && <Hero post={featuredPost} />}
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Recent Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}