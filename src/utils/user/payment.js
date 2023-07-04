const AppError = require("../AppError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.createCheckoutSession = async (req, res) => {
  const cart = req.body;

  const cartIds = cart.map((item) => {
    return {
      id: item._id,
    };
  });

  const customer = await stripe.customers.create({
    metadata: {
      // user_id: req.user.id,
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
          unit_amount: item.price * 100,
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
    const gamesIds = JSON.parse(customer.metadata.cart);
    // console.log(gamesIds);

    // create order and add games to library
  }
  res.status(200).json({ received: true });
};
