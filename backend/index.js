const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());



app.get('/login', (req, res) => {
    res.send('login');
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})