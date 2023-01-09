import express  from "express";
const UserRoutes = express.Router()
import userController from "../Controllers/user";
import verifyToken from "../middleware/verify";

UserRoutes.get("/:_id", userController.getUser)
UserRoutes.get("/:_id/friends",userController.getUserFriends)
UserRoutes.patch("/:_id/:friendId",userController.addRemoveFriend)

export default UserRoutes