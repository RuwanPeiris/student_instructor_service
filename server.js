let express = require('express');
const session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');
let multer = require('multer');//handling multipart/form-data - to upload files
let GridfsStorage = require('multer-gridfs-storage');//Allows to strore more than 16MB directly in the database
let gridfsStream = require('gridfs-stream');//helps to use streams more strong and easier
let methodOverride = require('method-override');

const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');

let app = express();

//Middlewares
app.use(busboy());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Middlewares File related

app.use(busboyBodyParser());
// app.use(methodOverride('_method'));

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
require('./app/routes/user.routes.js')(app);
require('./app/routes/course.routes.js')(app);
require('./app/routes/instructor_allocation.routes.js')(app);
<<<<<<< HEAD
require('./app/routes/file.routes.js')(app);

=======
require('./app/routes/instructor.routes')(app);
>>>>>>> 4b75dda14570fedc4d1670138ac5c4ab3c1bee14


//Changing ports to accept dynamic port number when it is deploy to server in cloud or internet
let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Server is listening " + port);
});

module.exports = app;