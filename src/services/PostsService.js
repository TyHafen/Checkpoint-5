import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'


class PostsService {
    async getAll(query = {}) {
        const res = await api.get("api/posts", { params: query })
        AppState.posts = res.data.posts
    }
    async getProfilePosts(id) {
        const res = await api.get('api/profiles/' + id + '/posts')
        AppState.profilePosts = res.data.posts
    }
    async createPost(postData) {
        const res = await api.post('api/posts/', postData)
        AppState.profilePosts.unshift(res.data)
    }

}




export const postsService = new PostsService()