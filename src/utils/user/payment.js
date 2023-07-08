const Cart = require("../../models/Cart");
const Library = require("../../models/Library");
const Order = require("../../models/Order");
const AppError = require("../AppError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { cart, totalPrice } = req.body;
  // console.log(req.user.email);
  // console.log(req.user.id);
  const cartIds = cart.map((item) => {
    return {
      _id: item._id,
    };
  });

  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.user.id,
      totalPrice,
      cart: JSON.stringify(cartIds),
    },
  });

  if (cart.length < 1) return next(new AppError("cart is required", 400));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: "http://localhost:5173/payment-success",
    cancel_url: "http://localhost:5173/",
    // customer_email: req.user.email,
    // client_reference_id: req.user.id,
    customer: customer.id,
    line_items: cart.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product_name,
            metadata: {
              id: item._id,
            },
            description: item.description,
            images: [item.imgs_links[0]],
          },
          unit_amount: Math.floor(item.price * 100),
        },
        quantity: 1,
      };
    }),

    mode: "payment",
  });

  res.status(200).json({
    status: "success",
    session,
  });
};

exports.webhookCheckout = async (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_END_POINT_KEY
    );
  } catch (error) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const data = event.data.object;

    const customer = await stripe.customers.retrieve(data.customer);
    const { user_id, totalPrice } = customer.metadata;
    // const user_id = JSON.parse(customer.metadata.user_id);
    const gamesIds = JSON.parse(customer.metadata.cart);
    console.log(gamesIds, user_id, totalPrice);
    // create order and add games to library

    const newOrder = new Order({
      products: gamesIds,
      user: user_id,
      totalPrice: +totalPrice,
    });
    await newOrder.save();

    // const newLibrary = new Library({ products: gamesIds, user: user_id });
    // await newLibrary.save();
    // { $push: { tags: ['javascript'] } }
    await Library.findOneAndUpdate(
      { user: user_id },
      { $push: { products: gamesIds } }
    );
    // const cart = await Cart.findOneAndUpdate(
    //   { user: user_id },
    //   { $set: { products: [] } }
    // );
    const cart = await Cart.findOneAndUpdate(
      { user: user_id },
      { products: [] },
      { new: true }
    );
    console.log(cart);
    // const cart = await Cart.findOne({ user: user_id });
    // library.products.push(...gamesIds);
  }
  res.status(200).json({ received: true });
};
