import { Router } from "express";
import { createUser, signUser, verifyUser } from "../controller/userController";

const router: Router = Router();

router.route("/create-user").post(createUser);
router.route("/verify-user/:userID").post(verifyUser);
router.route("/sign-in-user/:userID").post(signUser);

export default router;
