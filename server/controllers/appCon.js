import userModel from "../models/userModel.js"
import Tour from "../models/TourModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function get(req, res) {
    try {
        return res.send({ msg: "getting request" })

    } catch (error) {
        return res.send({ error: 'error' })
    }
}

export async function signup(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            res.status(200).send({ error: "email is already taken" })
        }
        else {
            if (password) {
                bcrypt.hash(password, 12).then(hashedpassword => {

                    const user = new userModel({
                        firstName,
                        lastName,
                        password: hashedpassword,
                        email
                    })
                    user.save().then(result => {
                        const token = jwt.sign({
                            userID: user._id,
                        }, '@42/ahc', { expiresIn: "24h" })
                        res.status(201).send({ msg: "You has been register successfully", token })

                    })
                        .catch(error => {
                            res.status(500).send({ error })
                        })

                }).catch(error => {
                    return res.send({ error: "unable to hashed passowrd" })
                })
            }
        }

    } catch (error) {
        return res.send({ error })

    }
}

export async function login(req, res) {
    try {

        const { email, password } = req.body
        try {
            userModel.findOne({ email }).then(user => {
                if (!user) {
                    return res.status(203).send({ error: "user not found" })
                }
                else {
                    bcrypt.compare(password, user.password).then(match => {
                        if (match) {
                            const token = jwt.sign({
                                userID: user._id,
                            }, '@42/ahc', { expiresIn: "24h" })
                            res.status(200).send({ msg: "You has been register successfully", token })

                        }
                        else {
                            return res.status(203).send({ msg: "invalid password" })
                        }
                    })
                }
            })
        } catch (error) {

        }

    } catch (error) {
        return res.status(500).send({ error });

    }
}

export async function uploadTour(req, res) {
    try {
        const { userID } = req.user
        const { tourName, location, from, startDate, endDate, hostedBy, description, image, price } = req.body
        const tour = new Tour({
            tourName,
            location,
            from,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            hostedBy,
            description,
            image,
            price,
        })

        tour.save().then(result => {
            userModel.findOne({ _id: userID }).then(user => {
                if (user.role === "admin") {
                    return res.status(201).send({ msg: "tour uploaded successfully" })
                }
                else if (user.role === "HM") {
                    return res.status(200).send({ msg: "request is pending" })
                }
            })
        })

    } catch (error) {

    }
}