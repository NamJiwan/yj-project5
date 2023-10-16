import  express  from "express";
import { loginSuccess, postAddMission, postJoin, postLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup",postJoin);
userRouter.post("/signin",postLogin);
userRouter.get("/signin/success",loginSuccess);
userRouter.post("/mission/add",postAddMission)

export default userRouter;