export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">🌍 World Food Travel</h3>
            <p className="text-gray-300">
              Discover culinary adventures from around the world. From street food to fine dining, 
              we bring you authentic food stories and travel experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/categories/street-food" className="text-gray-300 hover:text-accent transition-colors">
                  Street Food
                </a>
              </li>
              <li>
                <a href="/categories/fine-dining" className="text-gray-300 hover:text-accent transition-colors">
                  Fine Dining
                </a>
              </li>
              <li>
                <a href="/categories/asian-cuisine" className="text-gray-300 hover:text-accent transition-colors">
                  Asian Cuisine
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <p className="text-gray-300 mb-4">
              Follow our culinary adventures and connect with our team of food writers.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} World Food Travel Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}