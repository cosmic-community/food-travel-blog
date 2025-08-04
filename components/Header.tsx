import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Food Travel Blog
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/categories/street-food" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Street Food
            </Link>
            <Link 
              href="/categories/fine-dining" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Fine Dining
            </Link>
            <Link 
              href="/categories/local-markets" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Local Markets
            </Link>
            <Link 
              href="/categories/food-culture" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Food Culture
            </Link>
          </nav>

          {/* Mobile menu button - simplified for this example */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}