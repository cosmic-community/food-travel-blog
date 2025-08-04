import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Explore by Category</h3>
      
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => {
          const name = category.metadata?.name || category.title
          const description = category.metadata?.description
          
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-primary-300 min-w-48"
            >
              <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                {name}
              </h4>
              {description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {description}
                </p>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}