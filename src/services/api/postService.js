import { delay } from '../index'

// Simulated database
let posts = []
let isInitialized = false

// Load initial data
const loadInitialData = async () => {
  if (!isInitialized) {
    const response = await import('../mockData/posts.json')
    posts = [...response.default]
    isInitialized = true
  }
}

export const getAll = async () => {
  await delay(300)
  await loadInitialData()
  return [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}

export const getById = async (id) => {
  await delay(200)
  await loadInitialData()
  const post = posts.find(p => p.id === id)
  return post ? { ...post } : null
}

export const create = async (postData) => {
  await delay(400)
  await loadInitialData()
  
  const newPost = {
    id: Date.now().toString(),
    ...postData,
    timestamp: new Date().toISOString()
  }
  
  posts.unshift(newPost)
  return { ...newPost }
}

export const update = async (id, updateData) => {
  await delay(300)
  await loadInitialData()
  
  const index = posts.findIndex(p => p.id === id)
  if (index === -1) {
    throw new Error('Post not found')
  }
  
  posts[index] = { ...posts[index], ...updateData }
  return { ...posts[index] }
}

export const deletePost = async (id) => {
  await delay(200)
  await loadInitialData()
  
  const index = posts.findIndex(p => p.id === id)
  if (index === -1) {
    throw new Error('Post not found')
  }
  
  const deletedPost = { ...posts[index] }
  posts.splice(index, 1)
  return deletedPost
}