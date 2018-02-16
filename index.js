const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config()
const ctrl = require('./controller.js');

const app = express();
massive(process.env.connection_string).then(db => {
    app.set('db', db);
    db.new_planes().then(planes => console.log(planes)).catch(err => console.log(err));
    db.get_planes().then(planes => console.log(planes)).catch(err => console.log(err));
});

app.use(bodyParser.json());
app.use(cors());

app.get('/api/planes', ctrl.getPlanes);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`));
