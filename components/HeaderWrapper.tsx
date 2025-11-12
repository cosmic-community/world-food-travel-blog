import { cosmic, hasStatus } from '@/lib/cosmic'
import { Category } from '@/types'
import Header from './Header'

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

export default async function HeaderWrapper() {
  const categories = await getCategories()
  
  return <Header categories={categories} />
}