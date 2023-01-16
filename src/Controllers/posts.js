import Post from "../Models/Post";
import User from "../Models/User"

class PostController {
    static async createPost(req, res) {
        try {
            const { userId, description, picturePath } = req.body
            const user = await User.findById(userId)
            const newPost = new Post({
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                location: user.location,
                description,
                userPicturePath: user.picturePath,
                picturePath,
                likes: {},
                comments: []
            })
            await newPost.save();
            const post = await Post.find()

            return res.status(201).json(post)
        } catch (error) {
            return res.status(409).json({ error: error.message })
        }
    }
    static async getFeedPosts(req, res) {
        try {
            const posts = await Post.find()
            return res.status(200).json(posts)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }
    static async getUserPosts(req, res) {
        try {
            const { userId } = req.params
            const post = await Post.find({ userId })
            return res.status(200).json(post)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }
    static async likePost(req, res) {
        try {
            const { id } = req.params
            const { userId } = req.body
            const post = await Post.findById(id)
            const isLiked = post.likes.get(userId) // check if there is user like post

            if (isLiked) {
                post.likes.delete(userId)
            } else {
                post.likes.set(userId, true)
            }

            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { likes: post.likes },//pass likes to the one modified
                { new: true })

            return res.status(200).json(updatedPost)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }
}
export default PostController
