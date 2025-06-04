import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'
import * as postService from '../../services/api/postService'
const MainFeature = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [caption, setCaption] = useState("")
  const [hashtags, setHashtags] = useState("")
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const suggestedHashtags = [
    "photography", "nature", "sunset", "travel", "love", "instagood", 
    "photooftheday", "beautiful", "happy", "art", "lifestyle", "fashion"
  ]

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
    } else {
      toast.error("Please select a valid image file")
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const addHashtag = (tag) => {
    if (!hashtags.includes(tag)) {
      setHashtags(hashtags ? `${hashtags} #${tag}` : `#${tag}`)
    }
  }

  const processHashtags = (text) => {
    return text
      .split(' ')
      .filter(word => word.startsWith('#'))
      .map(tag => tag.slice(1))
      .filter(tag => tag.length > 0)
  }

  const handleSubmit = async () => {
    if (!selectedFile || !caption.trim()) {
      toast.error("Please add an image and caption")
      return
    }

    setUploading(true)
    try {
      // Simulate file upload - in real app would upload to storage service
      const imageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=600&h=600&fit=crop`
      
      const newPost = {
        mediaUrl: imageUrl,
        mediaType: "photo",
        caption: caption.trim(),
        hashtags: processHashtags(hashtags),
        likeCount: 0,
        commentCount: 0,
        timestamp: new Date().toISOString(),
        isLiked: false,
        isSaved: false
      }

      await postService.create(newPost)
      toast.success("Post shared successfully!")
      
      // Reset form
      setSelectedFile(null)
      setPreview(null)
      setCaption("")
      setHashtags("")
      
      onUpload()
      onClose()
    } catch (err) {
      toast.error("Failed to share post")
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setSelectedFile(null)
    setPreview(null)
    setCaption("")
    setHashtags("")
    setUploading(false)
    setDragOver(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-neutral-200 p-6 flex items-center justify-between">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Create New Post
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* File Upload Area */}
            <div className="mb-6">
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragOver 
                    ? 'border-primary bg-primary/5' 
                    : preview 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-neutral-300 hover:border-primary/50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {preview ? (
                  <div className="space-y-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-xl shadow-soft object-cover"
                    />
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2 px-4 py-2 bg-neutral-100 rounded-full text-sm hover:bg-neutral-200 transition-colors"
                      >
                        <ApperIcon name="RefreshCw" size={16} />
                        <span>Change Image</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFile(null)
                          setPreview(null)
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm hover:bg-red-200 transition-colors"
                      >
                        <ApperIcon name="Trash2" size={16} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                      <ApperIcon name="Upload" size={32} className="text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-neutral-700 mb-2">
                        Drag and drop your photo here
                      </p>
                      <p className="text-neutral-500 mb-4">or</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
                      >
                        Choose from Gallery
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                className="hidden"
              />
            </div>

            {/* Caption Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Caption
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                maxLength={500}
                className="w-full h-24 p-4 border border-neutral-300 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-neutral-500">
                  Share your story...
                </span>
                <span className={`text-xs ${caption.length > 450 ? 'text-red-500' : 'text-neutral-400'}`}>
                  {caption.length}/500
                </span>
              </div>
            </div>

            {/* Hashtags */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Hashtags
              </label>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="#photography #nature #sunset"
                className="w-full p-4 border border-neutral-300 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              
              {/* Suggested Hashtags */}
              <div className="mt-3">
                <p className="text-xs text-neutral-500 mb-2">Suggested:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedHashtags.slice(0, 8).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => addHashtag(tag)}
                      className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full hover:bg-primary hover:text-white transition-all"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filters Placeholder */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Filters
              </label>
              <div className="p-4 border border-neutral-200 rounded-xl bg-neutral-50">
                <div className="flex items-center justify-center space-x-2 text-neutral-500">
                  <ApperIcon name="Sparkles" size={20} />
                  <span className="text-sm">Filters coming soon!</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleClose}
                className="flex-1 py-3 border border-neutral-300 text-neutral-700 rounded-xl font-medium hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedFile || !caption.trim() || uploading}
                className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
              >
                {uploading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <ApperIcon name="Loader2" size={20} />
                    </motion.div>
                    <span>Sharing...</span>
                  </>
                ) : (
                  <>
                    <ApperIcon name="Send" size={20} />
                    <span>Share Post</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MainFeature