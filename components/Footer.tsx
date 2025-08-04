export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Food Travel Blog</h3>
            <p className="text-gray-300 leading-relaxed">
              Discover authentic food experiences and culinary traditions from around the world 
              through immersive travel stories and expert insights.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="/categories/street-food" className="text-gray-300 hover:text-white transition-colors">
                  Street Food
                </a>
              </li>
              <li>
                <a href="/categories/fine-dining" className="text-gray-300 hover:text-white transition-colors">
                  Fine Dining
                </a>
              </li>
              <li>
                <a href="/categories/local-markets" className="text-gray-300 hover:text-white transition-colors">
                  Local Markets
                </a>
              </li>
              <li>
                <a href="/categories/food-culture" className="text-gray-300 hover:text-white transition-colors">
                  Food Culture
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-gray-300 mb-4">
              Follow our culinary adventures and get the latest food travel stories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Food Travel Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}