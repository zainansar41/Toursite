import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";




dotenv.config();
const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();
// Create order function



router.post("/create-checkout-session", async (req, res) => {
    try {
        const customer = await stripe.customers.create({
            metadata: {
                userId: req.body.userId,
                data: JSON.stringify(req.body.data),
                purchasedItem: req.body.data.tourId,
                price:req.body.data.price,
            },
        });
    
        const cartItems = [{
            name: "" + req.body.data.tourName + "",
            image: "https://th.bing.com/th/id/OIP.0B4ViDeof5G6eOtqA30d1gHaHa?pid=ImgDet&rs=1",
            desc: `Purchase of a ${req.body.data.tourName}`,
            price: req.body.data.price,
            id: 1,
            cartQuantity: 1,
        }]
        const line_items = cartItems.map((item) => {
            return {
                price_data: {
                    currency: "PKR",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                        description: item.desc,
                        metadata: {
                            id: item.id,
                        },
                    },
                    unit_amount: item.price * 100,
                },
                quantity: 1,
            };
        });
    
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            phone_number_collection: {
                enabled: true,
            },
            line_items,
            mode: "payment",
            customer: customer.id,
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/`,
        });
        res.send({ url: session.url });
    } catch (error) {
        console.log("Error",error)
    }
    // res.redirect(303, session.url);
});

export default router;
