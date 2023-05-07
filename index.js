const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose");
const flash = require('connect-flash');
const userRoute = require("./routes/Users");
const noteRoute = require("./routes/Notes");
const viewRoute = require("./routes/Views");
const session = require('express-session')
const cookieParser = require("cookie-parser");
const MongoDBStore = require('connect-mongodb-session')(session);
const methodOverride = require('method-override');
app.use(express.urlencoded({extended: true})); // need that to read input 
app.set('view engine', 'ejs');
const store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/NotingApp',
  collection: 'mySessions'
})

app.use(
  session({
    secret:"ABCDEF",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(flash())

//for override method to request
app.use(methodOverride('_method'));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static('public'));

// cookie parser middleware
app.use(cookieParser());

/* Start connect database */
main().catch(err => console.log(err));
async function main() {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://127.0.0.1:27017/NotingApp');
  console.log("Connected to database successfully!");
};
/* End connect database */

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/notes", noteRoute);
app.use("/views", viewRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
