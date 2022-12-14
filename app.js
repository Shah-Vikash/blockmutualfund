'use strict';

const axios = require('axios');
const express = require('express')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors({
  origin: '*'
}));
const port = process.env.PORT || 8080;
const host = '0.0.0.0';

app.get('/', (req, res) => {
  console.log(`Your port is ${process.env.PORT}`);
  res.send('Hello World from IBM Cloud Essentials!');
})


app.get('/coins', (req, res) => {
  axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/map`,{headers: {'X-CMC_PRO_API_KEY':'583eefc0-111d-4fcf-98fe-04b32beecbed'}})
  .then(response => {
    res.send(response.data)
  })
  .catch(error => {
    res.send(error)
  });
})

app.get(`/coins/:id`, (req, res) => {
  const id = req.params.id;
  axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${id}`,{headers: {'X-CMC_PRO_API_KEY':'583eefc0-111d-4fcf-98fe-04b32beecbed'}})
  .then(response => {
    res.send(response.data)
  })
  .catch(error => {
    res.send(error)
  });
})
 


app.listen(port, host);
console.log(`Running on http://${host}:${port}`);
