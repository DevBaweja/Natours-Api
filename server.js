const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception! Shutting down...');
    console.log(err.name, err.message);
    // console.log(err);
    process.exit(1);
});

// Getting environment variables
dotenv.config({ path: './config.env' });

const app = require('./app');

// Connecting database
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((con) => {
        // console.log(con.connections);
        console.log('DB connection successful');
    });

// Start Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

/*
In mongo shell
Server - mongo "mongodb+srv://cluster0-ta2cm.mongodb.net/test"  --username dev
Local - mongod and mongo

In application
Server - mongodb+srv://dev:<PASSWORD>@cluster0-ta2cm.mongodb.net/natours?retryWrites=true&w=majority
Local - mongodb://localhost:27017/natours

In mongo compass
Server - mongodb+srv://dev:<password>@cluster0-ta2cm.mongodb.net/natours
Local - mongodb://127.0.0.1:27017

mongoose.connect(DB,{ }) - object to avoid warning
It will return promise and then method have access to connection object
con.connections
*/

/*
Deployment

Git and Github
git config --global user.name "devbaweja"
git config --get user.name

Creating local repo
git init

git status

Adding files to staging area
git add [filename] | -A

Commiting files
git commit -m "message"

git remote add origin https://github.com/DevBaweja/Natours-Api.git
git push -u origin master

git pull origin master

U Untracked
M Modified
*/

/*
Production Modification

Compression
npm i compression 
To compress all the responses

Getting rid of unnecessary logs

Also axios call can be made to relative URL since 
website and api are hosted on same platform

*/
/*
Modern Tech Stack

Nodejs
Express
MongoDb Shell/Compass/Atlas
Mongoose
Postman

Stripe
Mailtrap
Mailsac

AWS Service
Heroku
*/

/*
Heroku 
Getting started with nodejs app

heroku login
*/

/*
TODO:
API

Implement restriction that users can only review tour that they have actually booked

Implement nested bookings routes 
/tours/:id/bookings
/users/:id/bookings

Improve tour dates 
add participants and soldOut field to each date. A date then becomes like instance of the tour
Then when user books, they need to select one of the dates. A new booking will increase # of participants in the date, untill it is soldOut, so when user book you need to check if tour on selected date is available

Adding api features to bookings also


Implement advance authentication features confirm user email, keep user logged in with refresh tokens,
two factor authentication

Also in admin while delete and updating some resource
Also in booking confirm password of user

TODO:
Website

New page for booking

Filtering in website

Adding intermediate page between payment and the tour ie for selecting date

Search functionality for the tour and maybe in my-tours

Better implementation of front-end

Search by dates

Only adding scripts to the that need them

Implement signup form, similar to login form

On tours details page, if user has taken tour, allow them add a review directly
on website. Implement form for this and also check for time of tour 

Hide entire booking section on the tour details page if current user has already booked
an tour(also prevent duplicate bookings on model)

Implement like tour functionality with favourite tour page

On user account page, implement My Reviews page where all reviews are displayed, and
user can edit them

For administrators, implement all Manage pages, where they can CRUD tours, users, update, delete
*/
