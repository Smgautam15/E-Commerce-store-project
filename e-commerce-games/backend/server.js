const express = require('express');
const app = express();

const stripe = require('stripe')('sk_test_51Mz2IjSHbjNjk4Phek3kw8a4F5077BOqzKyloFfXVKtGdlT6MIKUKr2fO2g1meElWkKgKzXL7JDldmOTEMLMX4PM00H3igD5zO');


app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Request-Method", "*")
  next();
});

app.get('/secret/:amt', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        currency: 'inr',
        amount: req.params.amt * 100,
        automatic_payment_methods: { enabled: true }
    });
    const intent = paymentIntent
    res.status(200).send({client_secret: intent.client_secret});
});

app.listen(8080, () => {
  console.log('Running on port 8080');
});