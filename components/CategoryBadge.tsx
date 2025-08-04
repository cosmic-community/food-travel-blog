import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const name = category.metadata?.name || category.title

  // Color mapping for different categories
  const getColorClasses = (slug: string) => {
    switch (slug) {
      case 'street-food':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200'
      case 'fine-dining':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200'
      case 'local-markets':
        return 'bg-green-100 text-green-800 hover:bg-green-200'
      case 'food-culture':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }
  }

  const colorClasses = getColorClasses(category.slug)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${colorClasses}`}
    >
      {name}
    </Link>
  )
}