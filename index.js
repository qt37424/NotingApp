const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose");
const flash = require('connect-flash');
const userRoute = require("./routes/Users");
const postRoute = require("./routes/Posts");
const viewRoute = require("./routes/Views");
const session = require('express-session')
app.use(express.urlencoded({extended: true})); // need that to read input 
app.set('view engine', 'ejs');

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret:"mySecretKey",
    cookie: { secure: true, maxAge: 14400000 },
  })
);
app.use(flash())

/* Start connect database */
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/NotingApp');
  console.log("Connected to database successfully!");
};
/* End connect database */

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/views", viewRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
