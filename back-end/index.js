const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path")
dotenv.config();
require("./db");
const cors = require("cors");

const port = process.env.PORT || 8000;
const app = express();
const globalErrorHandler = require("./utils/glopalErrorHandler");
const userRoutes = require("./routes/userRoutes")      
const CoursesRoutes = require("./routes/CoursesRoutes")      
const homeworkRoutes = require("./routes/HomeworkRoutes")      

const WeekRoutes = require("./routes/WeekRoutes");      
const Lecture = require("./models/lectureModel");
const AppError = require("./utils/AppError");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, '../front-end/my-project/dist'))); // or '../frontend/my-project/build' if you use 'build'
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../fron-tend/my-project/dist', 'index.html'));  // or '../frontend/my-project/build' if changed
  });
  w
}

// Catch-all to handle client-side routing (React Router)

//  routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users",userRoutes)
app.use("/courses",CoursesRoutes)
app.use("/weeks",WeekRoutes)
app.use("/homework",homeworkRoutes)




// app.post('/lectures/:lectureID/homework', async (req, res,next) => {
//   try {
//     const { lectureID } = req.params;
//     const { title, questions } = req.body;

//     // Find the lecture by ID
//     const lecture = await Lecture.findById(lectureID);

//     if (!lecture) {
//       return next(new AppError("Lecture not found", 400));
//     }

//     // Create the new homework object
//     const newHomework = {
//       title,
//       questions,
//     };

//     // Add or update the homework in the lecture
//     lecture.homework.push(newHomework);
//     await lecture.save();

//     res.status(200).json({ message: 'Homework added successfully', lecture });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding homework', error });
//   }
// });

app.use(globalErrorHandler);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
