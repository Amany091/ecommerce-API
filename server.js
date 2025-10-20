const path = require("path")

require('dotenv').config();
const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const session = require("express-session")
const userRoutes = require("./routes/user")
const categoriesRoutes = require("./routes/categoryRoute");
const brandsRoutes = require("./routes/brandRoute");
const authRoutes = require("./routes/authRoute")
const productsRoutes = require("./routes/productRoute")
const ordersRoutes = require("./routes/orderRoute");
const { DBConnection } = require('./configs/DB');
const MongoStore = require("connect-mongo")


const app = express()
app.set("trust proxy", 1);

app.use(
  session({
    name: "connect.sid",
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

DBConnection()
app.use(
    cors({
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    })
);

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"))
}

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "uploads")))

// Mount Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use(`/api/v1/categories`, categoriesRoutes);
app.use(`/api/v1/brands`, brandsRoutes);
app.use(`/api/v1/products`, productsRoutes);
app.use(`/api/v1/orders`, ordersRoutes);



// app.all("*", (req,res, next) => {
//     next(new ApiError(`cant't find this route ${req.originalUrl}`), 404)
// })

//Global Error Handling Middleware For Express
app.use((err, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'Error'
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
    })
    next()

})

module.exports = app;

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})