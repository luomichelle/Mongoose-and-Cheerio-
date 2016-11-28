// Solution 2: Add a Relationship
// ==============================

// This solutions adds a Customers model to keep track of the folks
// who eat particular burgers. The user will have an option to list 
// the name of the devourer, and that name will be associated
// with the devoured burger.


// Step 1: Created a Customer model with the sequelize CLI:
//         sequelize model:create --name Customer --attributes 'name:string'

// Step 2: Added a hasOne(Customer) association to the Burger model's classMethods.

// Step 3: edited burger controller to use setAssociates
//         to save and set the name of the devourer.

// Step 4: Edited index.handlebars to account for scenarios 
//		   when a customer is and isn't listed.

// Step 5: Minor css style changes to stop elements from bleeding into eachother.



var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')


// bring in the models
var models = require('./models')

// sync the models
models.sequelize.sync();

// Instantiate Express
var app = express();
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// bring in the routes
var routes = require('./controllers/burgers_controller.js');

// connect the routes
app.use('/', routes);
app.use('/update', routes);
app.use('/create', routes);



// listen on port 3000
var port = process.env.PORT || 3000;
app.listen(port);

console.log(module.exports)
