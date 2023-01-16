import express  from "express";
import PostController from "../Controllers/posts";
const postRoutes = express.Router()

postRoutes.get("/", PostController.getFeedPosts)
postRoutes.get("/:userId/posts", PostController.getUserPosts)
postRoutes.patch("/:id/like", PostController.likePost)

export default postRoutes
