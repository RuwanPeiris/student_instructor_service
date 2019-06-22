require('rootpath')();
let express = require('express');
const session = require('express-session');
let bodyParser = require('body-parser');

const cors = require('cors');
const errorHandler = require('_helpers/error-handler');


const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');

let app = express();

//Middlewares
app.use(busboy());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//CORS origin resolving
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-Width");
    res.header("Access-Control-Allow-Headers", 'Content- Type');
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
//Middlewares File related
app.use(busboyBodyParser());
// app.use(methodOverride('_method'));

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);


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
    res.json({ "message": "Welcome to student_info api.. " });
});

//Add your routes here
require('./app/routes/course.routes.js')(app);
require('./app/routes/instructor_allocation.routes.js')(app);
require('./app/routes/file.routes.js')(app);
require('./app/routes/instructor.routes')(app);
// require('./app/routes/auth')(app);


//Changing ports to accept dynamic port number when it is deploy to server in cloud or internet
let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Server is listening " + port);
});

module.exports = app;
