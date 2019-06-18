let express = require('express');
const session = require('express-session');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('connected to the database...');
}).catch(err => {
    console.log("Could not connect to the db ", err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to student_info api.. " + res.session.usr_name });
});

//Add your routes here
require('./app/routes/user.routes.js')(app);



//Changing ports to accept dynamic port number when it is deploy to server in cloud or internet
let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Server is listening " + port);
});

module.exports = app;