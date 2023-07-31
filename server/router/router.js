import { Router } from "express";
import * as controller from '../controllers/appCon.js'
import auth from "../middleware/auth.js";

const router = Router()

router.route('/get').get(controller.get)
router.route('/signup').post(controller.signup)
router.route('/login').post(controller.login)
router.route('/uploadtour').post(auth, controller.uploadTour)


export default router