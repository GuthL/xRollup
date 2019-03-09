const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api/transfer', (req, res) => res.send('Transfer!'))
app.get('/api/withdraw', (req, res) => res.send('Withdraw!'))
app.get('/api/state', (req, res) => res.send('Current State!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))