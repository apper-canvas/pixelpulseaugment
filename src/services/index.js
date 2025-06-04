// Service layer exports
export * as postService from './api/postService'
export * as commentService from './api/commentService'
export * as savedPostService from './api/savedPostService'

// Utility function for simulating API delays
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))