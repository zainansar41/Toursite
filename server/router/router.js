import { Router } from "express";
import * as controller from '../controllers/appCon.js'
import auth from "../middleware/auth.js";

const router = Router()

router.route('/get').get(controller.get)
router.route('/signup').post(controller.signup)
router.route('/login').post(controller.login)
router.route('/uploadtour').post(auth, controller.uploadTour)
router.route('/fecthalltours').get(controller.fetchAllTour)
router.route('/fetchtour/:id').get(controller.fetchTour)
router.route('/message').post(auth, controller.message)
router.route('/accept').post(auth, controller.acceptTour)
router.route('/rejectTour').post(auth, controller.rejectTour)
router.route('/bookNow').post(auth, controller.BookNow)


export default router