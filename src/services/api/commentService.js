import { delay } from '../index'

// Simulated database
let comments = []
let isInitialized = false

// Load initial data
const loadInitialData = async () => {
  if (!isInitialized) {
    const response = await import('../mockData/comments.json')
    comments = [...response.default]
    isInitialized = true
  }
}

export const getAll = async () => {
  await delay(250)
  await loadInitialData()
  return [...comments].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
}

export const getById = async (id) => {
  await delay(200)
  await loadInitialData()
  const comment = comments.find(c => c.id === id)
  return comment ? { ...comment } : null
}

export const getByPostId = async (postId) => {
  await delay(300)
  await loadInitialData()
  return comments
    .filter(c => c.postId === postId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .map(c => ({ ...c }))
}

export const create = async (commentData) => {
  await delay(350)
  await loadInitialData()
  
  const newComment = {
    id: Date.now().toString(),
    ...commentData,
    timestamp: new Date().toISOString()
  }
  
  comments.push(newComment)
  return { ...newComment }
}

export const update = async (id, updateData) => {
  await delay(300)
  await loadInitialData()
  
  const index = comments.findIndex(c => c.id === id)
  if (index === -1) {
    throw new Error('Comment not found')
  }
  
  comments[index] = { ...comments[index], ...updateData }
  return { ...comments[index] }
}

export const delete_ = async (id) => {
  await delay(250)
  await loadInitialData()
  
  const index = comments.findIndex(c => c.id === id)
  if (index === -1) {
    throw new Error('Comment not found')
  }
  
  const deletedComment = { ...comments[index] }
  comments.splice(index, 1)
  return deletedComment
}

// Alias for reserved keyword
export { delete_ as delete }