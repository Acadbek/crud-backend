const express = require('express');
const app = express()

app.get('/', (req, res) => {
  res.send('hello thinkland')
})

app.listen(4001, () => {
  console.log('server is running');
})