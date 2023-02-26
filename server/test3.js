/* const http = require('http')
const port = 3000
const fs = require('fs')

const server = http.createServer(function(req,res){
res.writeHead(200,{'Content-Type': 'text/HTML'})
fs.readFile('index.html', function(error, data){
    if(error){
        res.writeHead(404)
        res.write('ERR file not found')
    }else {
        res.write(data)
    }
    res.end()
})
})

server.listen(port,function(error){
	if(error){
		console.log('something errord', error)
	}else{
		console.log('server is listening on port '+ port)
	}
}) 
// This is your test secret API key.
const stripe = require('stripe')('sk_test_51MbTAQBraefTvW8qdB0wWIFfN9WZmpm4gMatuqVQcyN74T59C5FutqSf58dQpINL15uNcr12qbgZlYA9YhEwyHoT00jYDhgSxs');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1Mbo8qBraefTvW8qBf40sVou',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    automatic_tax: {enabled: true},
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));
*/