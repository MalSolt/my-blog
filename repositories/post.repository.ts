import { api } from './api'
import { Post } from '@/shared/types'

export const postRepository = {
  getPosts: async (): Promise<Post[]> => {
    const { data: posts } = await api.get('/posts')
    return posts
  },

  getPostById: async (id: Post['id']): Promise<Post> => {
    const { data: post } = await api.get(`/posts/${id}`)
    return post
  },

  createPost: async (data: Post): Promise<Post> => {
    return api.post('/posts', data)
  },

  deletePost: async (id: Post['id']) => {
    return api.delete(`/posts/${id}`)
  },
}
