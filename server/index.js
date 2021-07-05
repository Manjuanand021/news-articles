const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/newsArticles/:country/:query', async (req, res) => {
    const query = req.params.query;
    const country = req.params.country;
    const { data } = await axios.get(`${config.API_URL}?source=${country}&apiKey=${config.API_KEY}&q=${query}`);
    console.log('articles', data);
    res.send(data);
});

app.listen(3000, () => {
    console.log('Listening on 3000');
});
