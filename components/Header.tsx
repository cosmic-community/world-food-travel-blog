import Link from 'next/link'
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Category } from '@/types'

async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function Header() {
  const categories = await getCategories()

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
            🌍 World Food Travel
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-accent transition-colors">
              Home
            </Link>
            
            {categories.slice(0, 3).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-gray-700 hover:text-accent transition-colors"
              >
                {category.metadata.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}