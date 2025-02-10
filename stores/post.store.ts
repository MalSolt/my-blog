import { Post } from '@/shared/types'
import { postRepository } from '../repositories/post.repository'
import { create } from 'zustand'

interface PostState {
  posts: Post[]
  getPosts: () => Promise<void>
  createPost: (post: Post) => Promise<void>
  deletePost: (id: Post['id']) => Promise<void>
  getPostById: (id: Post['id']) => Promise<Post | undefined>
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  getPosts: async () => {
    try {
      const posts = await postRepository.getPosts()
      set({ posts })
    } catch (error) {
      console.log(error)
    }
  },
  createPost: async (post: Post) => {
    try {
      await postRepository.createPost(post)
    } catch (error) {
      console.log(error)
    }
  },
  deletePost: async (id: Post['id']) => {
    try {
      await postRepository.deletePost(id)
    } catch (error) {
      console.log(error)
    }
  },
  getPostById: async (id: Post['id']) => {
    try {
      const post = await postRepository.getPostById(id)
      return post
    } catch (error) {
      console.log(error)
    }
  },
}))
