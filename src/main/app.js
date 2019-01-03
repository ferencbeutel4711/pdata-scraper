const express = require('express');
const scrapeRouter = require('./routes/scrape');

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

app.use('/scrape', scrapeRouter);

app.listen(3000, () => {
  console.log('server started on port 3000');
});

module.exports = app;
