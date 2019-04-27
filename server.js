let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
  console.log('connected to the database...');
}).catch(err => {
    console.log("Could not connect to the db ",err);
    process.exit();
});

app.get('/',(req,res) => {
    res.json({"message" : "Welcome to student_info api.. "});
});

require('./app/routes/user.routes.js')(app);

app.listen(3000, () => {
    console.log("Server is listening 3000");
});