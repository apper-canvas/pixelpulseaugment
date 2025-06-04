import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import * as postService from '../services/api/postService'
import * as commentService from '../services/api/commentService'
import * as savedPostService from '../services/api/savedPostService'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [activePost, setActivePost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setLoading(true)
    try {
      const result = await postService.getAll()
      setPosts(result)
    } catch (err) {
      setError(err.message)
      toast.error("Failed to load posts")
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId) => {
    try {
      const post = posts.find(p => p.id === postId)
      const updatedPost = {
        ...post,
        isLiked: !post.isLiked,
        likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1
      }
      
      await postService.update(postId, updatedPost)
      setPosts(posts.map(p => p.id === postId ? updatedPost : p))
    } catch (err) {
      toast.error("Failed to update like")
    }
  }

  const handleSave = async (postId) => {
    try {
      const post = posts.find(p => p.id === postId)
      if (post.isSaved) {
        await savedPostService.delete(postId)
      } else {
        await savedPostService.create({ postId, savedAt: new Date().toISOString() })
      }
      
      const updatedPost = { ...post, isSaved: !post.isSaved }
      await postService.update(postId, updatedPost)
      setPosts(posts.map(p => p.id === postId ? updatedPost : p))
      
      toast.success(post.isSaved ? "Post removed from saved" : "Post saved!")
    } catch (err) {
      toast.error("Failed to save post")
    }
  }

  const handleComment = async (postId) => {
    setActivePost(posts.find(p => p.id === postId))
    setShowCommentModal(true)
    
    try {
      const result = await commentService.getAll()
      setComments(result.filter(c => c.postId === postId))
    } catch (err) {
      toast.error("Failed to load comments")
    }
  }

  const submitComment = async () => {
    if (!commentText.trim()) return
    
    try {
      const newComment = {
        postId: activePost.id,
        text: commentText,
        timestamp: new Date().toISOString(),
        authorName: "You",
        authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
      }
      
      await commentService.create(newComment)
      setComments([...comments, newComment])
      setCommentText("")
      
      // Update comment count
      const updatedPost = { ...activePost, commentCount: activePost.commentCount + 1 }
      await postService.update(activePost.id, updatedPost)
      setPosts(posts.map(p => p.id === activePost.id ? updatedPost : p))
      
      toast.success("Comment added!")
    } catch (err) {
      toast.error("Failed to add comment")
    }
  }

  const deleteComment = async (commentId) => {
    try {
      await commentService.delete(commentId)
      setComments(comments.filter(c => c.id !== commentId))
      
      // Update comment count
      const updatedPost = { ...activePost, commentCount: activePost.commentCount - 1 }
      await postService.update(activePost.id, updatedPost)
      setPosts(posts.map(p => p.id === activePost.id ? updatedPost : p))
      
      toast.success("Comment deleted")
    } catch (err) {
      toast.error("Failed to delete comment")
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadPosts()
    setRefreshing(false)
  }

  const showPlaceholder = (feature) => {
    toast.info(`${feature} coming soon!`)
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-300 z-50 h-header">
        <div className="max-w-feed mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PixelPulse
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => showPlaceholder("Messages")}
              className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
            >
              <ApperIcon name="MessageCircle" size={24} />
            </button>
            <button 
              onClick={() => showPlaceholder("Notifications")}
              className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
            >
              <ApperIcon name="Heart" size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Stories Bar */}
      <div className="mt-header bg-white border-b border-neutral-300">
        <div className="max-w-feed mx-auto px-4 py-4">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {[1,2,3,4,5,6,7,8].map(i => (
              <button
                key={i}
                onClick={() => showPlaceholder("Stories")}
                className="flex-shrink-0 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent p-0.5 mb-1">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <img
                      src={`https://images.unsplash.com/photo-150000000${i}?w=64&h=64&fit=crop&crop=face`}
                      alt={`Story ${i}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-neutral-400">user{i}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <main className="max-w-feed mx-auto px-0 md:px-4 pb-20">
        <div className="space-y-6 pt-6">
          {loading && posts.length === 0 ? (
            <div className="space-y-6">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white border border-neutral-300 animate-pulse">
                  <div className="p-4 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-neutral-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-neutral-200 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-neutral-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-96 bg-neutral-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-neutral-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-neutral-200 rounded w-48"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence>
              {posts?.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-neutral-300 md:rounded-lg overflow-hidden shadow-card"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face`}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">@pixeluser</p>
                        <p className="text-xs text-neutral-400">Los Angeles, CA</p>
                      </div>
                    </div>
                    <button className="p-1">
                      <ApperIcon name="MoreHorizontal" size={16} />
                    </button>
                  </div>

                  {/* Post Image */}
                  <div className="relative group">
                    <img
                      src={post.mediaUrl}
                      alt={post.caption}
                      className="w-full h-96 object-cover cursor-pointer"
                      onDoubleClick={() => handleLike(post.id)}
                    />
                    {post.isLiked && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="text-red-500"
                        >
                          <ApperIcon name="Heart" size={80} fill="currentColor" />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`transition-colors ${post.isLiked ? 'text-red-500' : 'text-neutral-500'}`}
                        >
                          <ApperIcon 
                            name="Heart" 
                            size={24} 
                            fill={post.isLiked ? "currentColor" : "none"}
                            className={post.isLiked ? "heart-beat" : ""}
                          />
                        </button>
                        <button
                          onClick={() => handleComment(post.id)}
                          className="text-neutral-500"
                        >
                          <ApperIcon name="MessageCircle" size={24} />
                        </button>
                        <button
                          onClick={() => showPlaceholder("Share")}
                          className="text-neutral-500"
                        >
                          <ApperIcon name="Send" size={24} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleSave(post.id)}
                        className={`transition-colors ${post.isSaved ? 'text-neutral-900' : 'text-neutral-500'}`}
                      >
                        <ApperIcon 
                          name="Bookmark" 
                          size={24} 
                          fill={post.isSaved ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    {/* Like Count */}
                    <p className="font-medium text-sm mb-2">
                      {post.likeCount} likes
                    </p>

                    {/* Caption */}
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">@pixeluser</span> {post.caption}
                      </p>
                      {post.hashtags?.length > 0 && (
                        <p className="text-sm text-blue-600">
                          {post.hashtags.map(tag => `#${tag}`).join(' ')}
                        </p>
                      )}
                    </div>

                    {/* Comments Preview */}
                    {post.commentCount > 0 && (
                      <button
                        onClick={() => handleComment(post.id)}
                        className="text-neutral-400 text-sm mt-2 hover:text-neutral-600"
                      >
                        View all {post.commentCount} comments
                      </button>
                    )}

                    {/* Timestamp */}
                    <p className="text-xs text-neutral-400 mt-2">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <button
                onClick={loadPosts}
                className="mt-2 px-4 py-2 bg-primary text-white rounded-lg"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Upload Modal */}
      <MainFeature
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={loadPosts}
      />

      {/* Comment Modal */}
      <AnimatePresence>
        {showCommentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCommentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="border-b border-neutral-200 p-4 flex items-center justify-between">
                <h3 className="font-medium">Comments</h3>
                <button
                  onClick={() => setShowCommentModal(false)}
                  className="p-1 hover:bg-neutral-100 rounded"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>

              {/* Post Preview */}
              {activePost && (
                <div className="border-b border-neutral-200 p-4">
                  <div className="flex space-x-3">
                    <img
                      src={activePost.mediaUrl}
                      alt={activePost.caption}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm">{activePost.caption}</p>
                      <p className="text-xs text-neutral-400 mt-1">
                        {activePost.likeCount} likes
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto max-h-60 px-4">
                {comments?.map((comment) => (
                  <div key={comment.id} className="py-3 border-b border-neutral-100 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <img
                        src={comment.authorAvatar}
                        alt={comment.authorName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{comment.authorName}</span> {comment.text}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-neutral-400">
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </span>
                          {comment.authorName === "You" && (
                            <button
                              onClick={() => deleteComment(comment.id)}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="border-t border-neutral-200 p-4">
                <div className="flex space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
                    alt="You"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 border border-neutral-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary"
                      onKeyPress={(e) => e.key === 'Enter' && submitComment()}
                    />
                    <button
                      onClick={submitComment}
                      disabled={!commentText.trim()}
                      className="px-4 py-2 bg-primary text-white rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-300 h-nav z-40">
        <div className="max-w-feed mx-auto h-full flex items-center justify-around px-4">
          <button 
            onClick={handleRefresh}
            className="p-3 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ApperIcon name="Home" size={24} />
          </button>
          <button 
            onClick={() => showPlaceholder("Explore")}
            className="p-3 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ApperIcon name="Search" size={24} />
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="p-3 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ApperIcon name="Plus" size={24} />
          </button>
          <button 
            onClick={() => showPlaceholder("Notifications")}
            className="p-3 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ApperIcon name="Heart" size={24} />
          </button>
          <button 
            onClick={() => showPlaceholder("Profile")}
            className="p-3 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ApperIcon name="User" size={24} />
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Home