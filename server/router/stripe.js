import express from "express";
import Stripe from "stripe";
import Order from "../models/Order.js"
import Tour from "../models/TourModel.js"
import dotenv from "dotenv";




dotenv.config();
const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();
// Create order function

const createOrder = async (obj) => {

  const newOrder = new Order({
    userId: obj.userId,
    purchasedItem: obj.purchasedItem,
    totalAmount: obj.price,
    paymentStatus: obj.paymentStatus,
    paymentIntentId: obj.paymentIntentId,
  });

  const tour = await Tour.findById(obj.purchasedItem);
  tour.people.push(obj.userId);
  await tour.save();
  try {
    await newOrder.save();
  } catch (err) {
    console.log(err);
  }
};

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    let webhookSecret;
    webhookSecret = process.env.STRIPE_WEB_HOOK;


    if (webhookSecret) {
      let event;
      let signature = req.headers["stripe-signature"];
      try {
        const payload = req.body.toString();
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        console.log(`✅  Webhook signature verified: ${event.id}`)
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
      console.log(`❗️  Webhook signature is not configured.`)
    }

    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            const obj = {
              userId: customer.metadata.userId,
              purchasedItem: customer.metadata.purchasedItem,
              price: customer.metadata.price,
              paymentIntentId: data.payment_intent,
              paymentStatus: data.payment_status,
            }
            createOrder(obj);
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
);
export default router;
