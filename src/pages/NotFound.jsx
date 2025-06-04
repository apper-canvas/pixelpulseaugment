import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <ApperIcon name="Camera" size={80} className="mx-auto text-neutral-400 mb-4" />
          <h1 className="text-6xl font-bold text-neutral-500 mb-2">404</h1>
          <p className="text-xl text-neutral-400 mb-6">Page not found</p>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist. Let's get you back to sharing amazing moments!
          </p>
        </div>
        
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          <ApperIcon name="Home" size={20} />
          <span>Back to Feed</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound