import { Router } from "express";
import { createScholar } from "../controller/scholarController";


const router: Router = Router()


router.route("/create-scholar").post(createScholar)


export default router