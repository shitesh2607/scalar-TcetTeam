const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user");
const flash = require('connect-flash');
const session = require('express-session');
const Appoint = require("./models/appointment");




const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/medicalDB", { useUnifiedTopology: true, useNewUrlParser: true });


// Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Use Connect Flash
app.use(flash());

// Global variables - Store success and error messages 
app.use(async (req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    await next();
});



app.get("/", function (req, res) {
    res.render("hackxsignup");
});


app.get("/login", function (req, res) {
    res.render("login");
});


app.post("/login", function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email: email }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password == password) {
                    res.redirect("/index");
                } else {
                    res.redirect("/login");
                }
            }
        }
    });
});

app.get("/signup", function (req, res) {
    res.render("hackxsignup");
});

app.post("/signup", function (req, res) {
    console.log(req.body);
    let user_name = req.body.name;
    let user_email = req.body.email;
    let user_password = req.body.password;
    if (user_password.length < 8) {
        req.flash('error', 'Password Length should be greater than 8 !!');
        return res.redirect('/');
    }

    User.findOne({ email: user_email })
        .then(user => {
            if (user) {
                req.flash('error', 'User with this email already exists !!');
                res.redirect('/');
            }
            else {
                const user = new User({
                    name: user_name,
                    email: user_email,
                    password: user_password,
                });
                user.save();
                req.flash("success", "Registration Successfull, Login with your email and Password !!");
                res.redirect("/login");
            }
        });
});


app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/appointment", (req, res) => {
    res.render("appointment");
})

app.post("/appointment", (req, res) => {
    console.log(req.body);
    const appointment = new Appoint({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        doctor: req.body.doctor,
        date: req.body.date,
        msg: req.body.msg
    })
    appointment.save();
    res.redirect("/allotment");
});

app.get("/allotment", async (req, res) => {
    let apoint = await Appoint.find();
    res.render("allotment", { apoint: apoint });
});

app.listen("3000", () => {
    console.log("server is running on port 3000");
})







// const express = require('express');
// const bodyParser = require("body-parser");
// const mongoose = require('mongoose');
// const User = require("./models/user");
// const flash = require('connect-flash');
// const session = require('express-session');
// // const passport = require("passport");
// // const passportLocalMongoose = require("passport-local-mongoose");


// const app = express()

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/medicalDB", { useUnifiedTopology: true, useNewUrlParser: true });
// // mongoose.set("useCreateIndex", true);

// // Express Session Middleware
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false
// }));

// // Passport Middleware
// // app.use(passport.initialize());
// // app.use(passport.session());

// // Use Connect Flash
// app.use(flash());

// // Global variables - Store success and error messages 
// app.use((req, res, next) => {
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// });

// // passport.use(User.createStrategy());
// // passport.serializeUser(User.serializeUser());
// // passport.deserializeUser(User.deserializeUser());



// app.get("/", (req, res) => {
//     res.render("hackxsignup");
// })

// app.get("/signup", (req, res) => {
//     res.render("hackxsignup");
// })

// app.post("/signup", function (req, res) {
//     console.log(req.body);
//     let user_name = req.body.name;
//     let user_email = req.body.email;
//     let user_password = req.body.password;

//     if (user_password.length < 8) {
//         req.flash('error', 'Password Length should be greater than 8 !!');
//         return res.redirect('/');
//     }

//     // User.register({ username: user_name }, req.body.password, (err, user) => {
//     //     if (err) {
//     //         console.log(err);
//     //         res.redirect("/signup");
//     //     } else {
//     //         passport.authenticate("local")(req, res, () => {
//     //             res.redirect("/index");
//     //         });
//     //     }
//     // });

//     User.findOne({ email: user_email })
//         .then(user => {
//             if (user) {
//                 req.flash('error', 'User with this email already exists !!');
//                 res.redirect('/');
//             }
//             else {
//                 const user = new User({
//                     name: user_name,
//                     email: user_email,
//                     password: user_password,
//                 });
//                 user.save();
//                 req.flash("success", "Registration Successfull, Login with your email and Password !!");
//                 res.redirect("/login");
//             }
//         });
// });

// app.get("/login", (req, res) => {
//     res.render("login")
// });

// app.post("/login", function (req, res) {



//     let email = req.body.email;
//     let password = req.body.password;

//     User.findOne({ email: email }, function (err, foundUser) {
//         if (err) {
//             console.log(err);
//         } else {
//             if (foundUser) {
//                 if (foundUser.password == password) {
//                     res.redirect("/index");
//                 } else {
//                     msg = "Incorrect email or password";
//                     res.redirect("/login");
//                 }
//             }
//         }
//     });
// });

// app.get("/index", (req, res) => {
//     // if (req.isAuthenticated()) {
//     //     res.render("index");
//     // } else {
//     //     res.redirect("/login");
//     // }
//     res.render("index");
// });

// app.get("/appointment", (req, res) => {
//     res.render("appointment");
// })

// app.listen("3000", () => {
//     console.log("server is running on port 3000");
// })