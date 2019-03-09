const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser);

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/api/transfer', (req, res) => {
    console.log("Transfer Request")
    console.log(req.body);

    const nonce = req.body.nonce;
    const signature = req.body.signature;
    const recipient = req.body.recipient;
    const amount = req.body.amount;
})
app.post('/api/withdraw', (req, res) => {
    console.log("Withdraw Request")
    console.log(req.body);

    const nonce = req.body.nonce;
    const signature = req.body.signature;
    const amount = req.body.amount;
})
app.get('/api/state', (req, res) => res.send('Current State!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))