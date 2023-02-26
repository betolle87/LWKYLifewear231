require("dotenv").config()

const express = require("express")
const app =  express()
app.use(express.json())
app.use(express.static("public"))


const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


const storeItems = new Map([
    [1, { name: "Blackout 1", price:"price_1MbowUBraefTvW8qbOv7J21A"}],
    [2, { name: "Blackout 2", price:"price_1McBvRBraefTvW8qbiE2VP7c"}],
    [3, { name: "Blackout 3", price:"price_1McBwDBraefTvW8qyPrZUP5Z"}],
    [4, { name: "Blackout 4", price:"price_1McaY5BraefTvW8qVbCOAMm3"}],
    [5, { name: "Blackout 5", price:"price_1McaYjBraefTvW8qgk6hJJtk"}],
    [11, { name: "Blackout 1 SMALL", price:"price_1McaafBraefTvW8qQbFVqwmA"}],
    [12, { name: "Blackout 1 MEDIUM", price:"price_1McakZBraefTvW8q5MDHFF2t"}],
    [13, { name: "Blackout 1 LARGE", price:"price_1MbowUBraefTvW8qbOv7J21A"}],
    [14, { name: "Blackout 1 X-LARGE", price:"price_1McakZBraefTvW8q5MDHFF2t"}],
])



app.post("/create-checkout-session", async (req, res) =>{
try {
    items2 = req.body.items
    items3 = []
    for(i = 0; i < items2.length; i++){
    var itemsprice = storeItems.get(items2[i].id).price
    var itemsquantity = items2[i].quantity
    items3.push ({price: itemsprice, quantity: itemsquantity, adjustable_quantity: {enabled: true, minimum: 1, maximum: 10},})
    }
    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {allowed_countries: ['US']},
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {amount: 1500, currency: 'usd'},
              display_name: 'Standard Shipping',
              delivery_estimate: {
                minimum: {unit: 'week', value: 1},
                maximum: {unit: 'week', value: 3},
              },
            },
          },
        ],
        payment_method_types: ["card"],
        mode: "payment",
        line_items: items3,
        //adjustable_quantity: {enabled: true, minimum: 1, maximum: 10},
        success_url: `${process.env.SERVER_URL}/success.html`,
        cancel_url: `${process.env.SERVER_URL}/Checkout.html`,
        phone_number_collection: { enabled: true, },
    })
    res.json({url: session.url})
} catch (e){
    res.status(500).json({ error: e.message })
}

})



app.listen(3000)