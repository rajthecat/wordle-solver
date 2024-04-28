const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');

const app = express();
app.use(bodyParser.urlencoded({limit: '1mb', extended:false}));
app.use(bodyParser.json({limit: '1mb'}));
app.use('/', routesHandler);

const PORT=4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});