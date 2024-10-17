const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
require("./db");
const Stripe = require("stripe");
const cors = require("cors");
const bodyParser = require("body-parser");

const globalErrorHandler = require("./utils/glopalErrorHandler");
const userRoutes = require("./routes/userRoutes");
const CoursesRoutes = require("./routes/CoursesRoutes");
const homeworkRoutes = require("./routes/HomeworkRoutes");
const WeekRoutes = require("./routes/WeekRoutes");

const port = process.env.PORT || 8000;

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.use(express.static(path.join(__dirname, "../uploads/videos"))); 
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos')));

// heroku
// if(process.env.NODE_ENV==="production"){
//   app.use(express.static(path.join(__dirname, '../front-end/my-project/dist'))); // or '../frontend/my-project/build' if you use 'build'
//  w app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../fron-tend/my-project/dist', 'index.html'));  // or '../frontend/my-project/build' if changed
//   });
// }

//  routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", userRoutes);
app.use("/courses", CoursesRoutes);
app.use("/weeks", WeekRoutes);
app.use("/homework", homeworkRoutes);

// stripe
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // Amount in cents (e.g., $50 = 5000 cents)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use(globalErrorHandler);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
