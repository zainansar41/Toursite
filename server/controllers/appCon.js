import userModel from "../models/userModel.js"
import Tour from "../models/TourModel.js"
import Contact from "../models/Contact.js"
import Order from "../models/Order.js"
import Hotel from "../models/HotelModel.js"
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
                            role: user.role,
                            name: user.firstName
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
                                role: user.role,
                                name: user.firstName
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

        userModel.findOne({ _id: userID }).then(user => {
            if (user.role === "admin") {
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
                    confirmed: true
                })
                tour.save().then(result => {
                    return res.status(201).send({ msg: "tour uploaded successfully" })
                })
            }
            else if (user.role === "HM") {
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
                    confirmed: false
                })
                tour.save().then(result => {
                    return res.status(200).send({ msg: "request is pending" })
                })
            }
        })


    } catch (error) {

    }
}

export async function fetchAllTour(req, res) {
    try {
        const tours = await Tour.find()
        return res.status(200).send({ tours })
    } catch (error) {
        return res.status(500).send({ error })
    }
}

export async function fetchTour(req, res) {
    try {

        const { id } = req.params
        const tour = await Tour.findOne({ _id: id })
        return res.status(200).send({ tour })

    } catch (error) {
        return res.status(500).send({ error })
    }
}

export async function message(req, res) {
    try {

        const { userID } = req.user
        const { firstName, email, message, lastName, contactNumber } = req.body
        const contact = new Contact({
            firstName,
            email,
            message,
            lastName,
            contactNumber
        })
        contact.save().then(result => {
            return res.status(201).send({ msg: "message sent successfully" })
        })


    } catch (error) {
        return res.status(500).send({ error })

    }
}

export async function acceptTour(req, res) {
    try {
        const { userID } = req.user;
        const { id } = req.body;

        // Use the updateOne query to update the 'confirmed' field directly
        const result = await Tour.updateOne({ _id: id }, { $set: { confirmed: true } });

        // Check if the update was successful
        if (result.nModified > 0) {
            return res.status(201).send({ msg: "tour accepted successfully" });
        } else {
            return res.status(203).send({ msg: "Tour not found or no changes made" });
        }
    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function rejectTour(req, res) {
    try {
        const { userID } = req.user;
        const { id } = req.body;

        Tour.deleteOne({ _id: id }).then(result => {
            return res.status(201).send({ msg: "tour rejected successfully" });
        }).catch(error => {
            return res.status(203).send({ msg: "Tour not found or no changes made" });
        })
    } catch (error) {
        return res.status(500).send({ error });

    }
}


export async function BookNow(req, res) {
    try {
        const { userID } = req.user;
        const { id } = req.body;

        // Use the updateOne query with $push operator to add the userID to the people array
        // const result = await Tour.updateOne({ _id: id }, { $push: { people: userID } });

        Tour.updateOne({ _id: id }, { $push: { people: userID } }).then(result => {
            res.status(201).send({ msg: "tour booked successfully" });
        }).catch(error => {
            res.status(203).send({ msg: "Tour not found or no changes made" });
        })


    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function fetchPeopleRoute(req, res) {
    try {
        const { id } = req.params;

        const tour = await Tour.findOne({ _id: id }).populate('people', 'username email');

        if (!tour) {
            return res.status(202).send({ msg: "Tour not found" });
        }

        const people = tour.people;
        return res.status(200).send({ people });
    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function fetchAllMessage(req, res) {
    try {
        const messages = await Contact.find()
        return res.status(200).send({ messages })

    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function seenMsg(req, res) {
    try {

        const { id } = req.body
        // delete the message

        Contact.deleteOne({ _id: id }).then(result => {
            return res.status(201).send({ msg: "message deleted successfully" });
        }).catch(error => {
            return res.status(203).send({ msg: "message not found or no changes made" });
        })

    } catch (error) {
        return res.status(500).send({ error });

    }
}

export async function fetchAllUser(req, res) {
    try {
        const users = await userModel.find()
        return res.status(200).send({ users })

    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function changeRole(req, res) {
    try {
        const { id, role } = req.body
        const result = await userModel.updateOne({ _id: id }, { $set: { role: role } });

        if (result.nModified > 0) {
            return res.status(201).send({ msg: "role changed successfully" });
        }
        else {
            return res.status(203).send({ msg: "role not found or no changes made" });
        }

    } catch (error) {
        return res.status(500).send({ error });
    }
}
export async function getPeopleOfTour(req, res) {
    try {
        const { id } = req.params
        const orders = await Order.find({ purchasedItem: id })
        let people = []
        for (const order of orders) {
            const user = await userModel.findOne({ _id: order.userId });
            people.push({ user, order });
        }
        console.log(people)
        return res.status(200).send({ people });
    } catch (error) {
        return res.status(500).send({ error });
    }
}


export async function addReview(req, res) {
    try {
        const { id } = req.params
        const { userName, reviewText } = req.body
        const tour = await Tour.findOne({ _id: id })
        tour.reviews.push({ userName, review: reviewText })
        await tour.save()
        return res.status(200).send({ msg: "review added successfully" })
    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function addHotel(req, res) {
    try {
        const { userID } = req.user
        const { name, description, price, image, location, contactNumber } = req.body


        userModel.findOne({ _id: userID }).then(user => {
            if (user.role === "admin") {
                const hotel = new Hotel({
                    hotelName: name,
                    description,
                    perDayPrice: price,
                    contactNo: contactNumber,
                    location,
                    image,
                    userID,
                    confirmed: true
                })
                hotel.save().then(result => {
                    return res.status(201).send({ msg: "hotel added successfully" })
                }).catch(error => {
                    return res.status(203).send({ msg: "hotel not added" })
                })

            }
            else if (user.role === "HM") {
                const hotel = new Hotel({
                    hotelName: name,
                    description,
                    perDayPrice: price,
                    contactNo: contactNumber,
                    location,
                    image,
                    userID,
                    confirmed: false
                })
                hotel.save().then(result => {
                    return res.status(200).send({ msg: "request is pending" })
                }).catch(error => {
                    return res.status(203).send({ msg: "hotel not added" })
                })
            }
        })



    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function fetchAllHotel(req, res) {
    try {
        const hotels = await Hotel.find()
        return res.status(200).send({ hotels })
    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function fetchHotel(req, res) {
    try {
        const { id } = req.params
        const hotel = await Hotel.findOne({ _id: id })
        return res.status(200).send({ hotel })
    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function updatePrice(req, res) {
    try {
        const { id } = req.params
        const { price } = req.body
        const hotel = await Hotel.updateOne({ _id: id }, { $set: { perDayPrice: price } })
        return res.status(200).send({ msg: "price updated successfully" })

    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function fetchPeopleOfHotel(req, res) {
    try {

        const { id } = req.params
        console.log(id);
        const orders = await Order.find({ purchasedItem: id })
        let people = []
        for (const order of orders) {
            const user = await userModel.findOne({ _id: order.userId });
            people.push({ user, order });
        }
        console.log(people)
        return res.status(200).send({ people });
    }
    catch {

    }
}

export async function addpeopleInHotel(req, res) {
    try {
        const { id } = req.params
        const { userID } = req.body

        const hotel = Hotel.findById({ _id: id })
        console.log(hotel.hotelName);
        hotel.people.push(userID)
        await hotel.save()
        return res.status(200).send({ msg: "people added successfully" })
    }
    catch (error) {
        return res.status(500).send(error)
    }
}


export async function AcceptRejectHotel(req, res){
    try {
        const { userID } = req.user;
        const { id } = req.params;
        const {action} = req.body
        let msg;
        let stat;
        if(action === "accept"){
            msg = "Hotel is added successfully"
            stat= 201
            await Hotel.updateOne({ _id: id }, { $set: { confirmed: true } });
        }
        else if(action === "reject"){
            msg = "Hotel is rejected"
            stat= 203
            await Hotel.deleteOne({_id:id})

        }
        return res.status(stat).send({ msg })

        
    } catch (error) {   
        return res.status(500).send(error)
        
    }
}