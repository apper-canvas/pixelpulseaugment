import { delay } from '../index'

// Simulated database
let savedPosts = []
let isInitialized = false

// Load initial data
const loadInitialData = async () => {
  if (!isInitialized) {
    const response = await import('../mockData/savedPosts.json')
    savedPosts = [...response.default]
    isInitialized = true
  }
}

export const getAll = async () => {
  await delay(250)
  await loadInitialData()
  return [...savedPosts].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
}

export const getById = async (id) => {
  await delay(200)
  await loadInitialData()
  const savedPost = savedPosts.find(sp => sp.id === id)
  return savedPost ? { ...savedPost } : null
}

export const getByPostId = async (postId) => {
  await delay(200)
  await loadInitialData()
  const savedPost = savedPosts.find(sp => sp.postId === postId)
  return savedPost ? { ...savedPost } : null
}

export const create = async (savedPostData) => {
  await delay(300)
  await loadInitialData()
  
  const newSavedPost = {
    id: Date.now().toString(),
    ...savedPostData,
    savedAt: new Date().toISOString()
  }
  
  savedPosts.push(newSavedPost)
  return { ...newSavedPost }
}

export const delete_ = async (postId) => {
  await delay(250)
  await loadInitialData()
  
  const index = savedPosts.findIndex(sp => sp.postId === postId)
  if (index === -1) {
    throw new Error('Saved post not found')
  }
  
  const deletedSavedPost = { ...savedPosts[index] }
  savedPosts.splice(index, 1)
  return deletedSavedPost
}

// Alias for reserved keyword
export { delete_ as delete }