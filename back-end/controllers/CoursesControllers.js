const Course = require("../models/CourseModel");
const Homework = require("../models/Homework");
const Lecture = require("../models/lectureModel");
const Week = require("../models/WeekModel");
const AppError = require("../utils/AppError");

const addCourse = async (req, res, next) => {
  const { title, description, grade } = req.body;
  const newCourse = new Course({ title, description, grade });
  await newCourse.save();
  if (!newCourse) return next(new AppError("can not create course", 400));
  res.status(201).json(newCourse);
};

const addWeektoCourse = async (req, res, next) => {
  const { courseId } = req.params;
  const { weekNumber } = req.body;

  // Create new week
  const newWeek = new Week({ weekNumber, course: courseId });
  await newWeek.save();
  if (!newWeek) return next(new AppError("can not create week", 400));

  // Add week to course
  const course = await Course.findById(courseId);
  if (!course) return next(new AppError("can not find course", 400));

  course.weeks.push(newWeek._id);
  await course.save();

  res.status(201).json(newWeek);
};
const getAllCourses = async (req, res, next) => {
  const courses = await Course.find().populate({
    path: "weeks",
    populate: {
      path: "lectures",
      populate: {
        path: "homework",
      },
      
    },
  });
  if (!courses) return next(new AppError("can not find courses", 404));

  res.status(200).json(courses);
};
// const newCourse = async (req, res) => {
//   try {
//     const { title, description, grade, weekNumber } = req.body;

//     // Create a new course instance
//     const newCourse = new Course({
//       title,  // Required
//       description: description || "",  // Optional
//       grade,  // Required
//       weekNumber: weekNumber || null, // Optional
//       lectures: req.files.map(file => ({
//         title: file.fieldname, // You might want to modify how titles are stored
//         video: file.path,
//         homework: [], // Assuming homework can be added later
//       }))
//     });

//     await newCourse.save(); // Save the course to the database
//     res.status(201).json({ message: 'Course created successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error creating course' });
//   }
// }

// const createCourse = async (req, res) => {
//   try {
//     const { title, description, grade, weeks } = req.body;
//     if (!title || !description || !grade) {
//       return res
//         .status(400)
//         .json({ message: "Title, description, and grade are required." });
//     }
//     // Create a new course
//     const newCourse = new Course({
//       title,
//       description,
//       grade,
//     });

//     // Save the course to the database
//     const savedCourse = await newCourse.save();

//     // Use Promise.all to handle concurrent saves
//     const savedWeeks = await Promise.all(
//       weeks.map(async (week) => {
//         // Create a new week
//         const newWeek = new Week({
//           weekNumber: week.weekNumber,
//           course: savedCourse._id, // Reference to the saved course
//         });

//         // Save the week to the database
//         const savedWeek = await newWeek.save();

//         // Process each lecture for this week
//         const savedLectures = await Promise.all(
//           week.lectures.map(async (lecture) => {
//             const newLecture = new Lecture({
//               title: lecture.title,
//               videoUrl: lecture.videoUrl, // Assuming you have processed the file upload
//             });

//             // Save the lecture to the database
//             return await newLecture.save();
//           })
//         );

//         // Add the lecture references to the week
//         savedWeek.lectures.push(...savedLectures.map((l) => l._id));

//         // Save the updated week with lectures
//         await savedWeek.save();

//         // Add the week reference to the course
//         savedCourse.weeks.push(savedWeek._id);

//         return savedWeek; // Return the saved week
//       })
//     );

//     // Save the updated course with the weeks
//     await savedCourse.save();

//     res.status(201).json(savedCourse);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// const createCourse = async (req, res) => {
//   try {
//     const { title, description, grade, weeks } = req.body;

//     // Create a new course
//     const newCourse = new Course({
//       title,
//       description,
//       grade,
//     });

//     // Loop over each week in the request body and create Week and Lecture documents

//     // Save the course to the database
//     await newCourse.save();

//     res
//       .status(201)
//       .json({ message: "Course created successfully", course: newCourse });
//   } catch (error) {
//     console.error("Error creating course:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
const createCourse = async (req, res) => {
  try {
    const { title, description,price , grade, weeks } = req.body;

    // Create a new course
    const newCourse = new Course({
      title,
      description,
      grade,
      price
    });

    // Loop over each week in the request body and create Week and Lecture documents
    const createdWeeks = await Promise.all(
      weeks.map(async (weekData) => {
        // Create a new Week document for each week
        const newWeek = new Week({
          weekNumber: weekData.weekNumber,
          weekContent: weekData.weekContent,
          course: newCourse._id, // Link this week to the newly created course
        });

        // Create lectures for each week
        const createdLectures = await Promise.all(
          weekData.lectures.map(async (lectureData) => {
            // Create a new Homework document for the lecture
            const newHomework = new Homework({
              title: lectureData.homework.title,
              questions: lectureData.homework.questions.map((question) => ({
                questionText: question.questionText,
                options: question.options.map((option) => ({
                  text: option.text,
                  isCorrect: option.isCorrect,
                })),
              })),
            });

            // Save the homework to the database
            await newHomework.save();

            // Create a new Lecture document and link the Homework
            const newLecture = new Lecture({
              title: lectureData.title,
              videoUrl: lectureData.videoUrl,
              homework: newHomework._id, // Reference the Homework in Lecture
            });

            // Save the lecture to the database
            await newLecture.save();

            // Add the lecture to the week's lectures array
            newWeek.lectures.push(newLecture._id);
            return newLecture;
          })
        );

        // Save the week after adding all lectures
        await newWeek.save();

        // Return the created week
        return newWeek;
      })
    );

    // Add the created weeks to the course
    newCourse.weeks = createdWeeks.map((week) => week._id);

    // Save the course to the database
    await newCourse.save();

    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const editCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, grade, price, weeks } = req.body;

    // Find the course by ID
    const course = await Course.findById(id);
    if (!course) return next(new AppError("Course not found", 404));

    // Update the basic course details
    course.title = title || course.title;
    course.description = description || course.description;
    course.grade = grade || course.grade;
    course.price = price || course.price;

    // Process the weeks array using map
    const updatedWeeks = await Promise.all(
      weeks?.map(async (weekData) => {
        let week;

        if (weekData._id) {
          // If the week already exists, update it
          week = await Week.findById(weekData._id);
          if (!week) throw new Error(`Week with id ${weekData._id} not found`);

          // Update the week details
          week.weekNumber = weekData.weekNumber || week.weekNumber;
          week.weekContent = weekData.weekContent || week.weekContent;
        } else {
          // Create a new week if it doesn't exist
          week = new Week({
            weekNumber: weekData.weekNumber,
            weekContent: weekData.weekContent,
            course: course._id, // Link this week to the course
          });
        }

        // Process lectures for each week using map
        const updatedLectures = await Promise.all(
          weekData?.lectures?.map(async (lectureData) => {
            let lecture;

            if (lectureData._id) {
              // If the lecture already exists, update it
              lecture = await Lecture.findById(lectureData._id);
              if (!lecture) throw new Error(`Lecture with id ${lectureData._id} not found`);

              // Update the lecture details
              lecture.title = lectureData.title || lecture.title;
              lecture.videoUrl = lectureData.videoUrl || lecture.videoUrl;

              // Update the homework and questions safely
              lecture.homework = lecture.homework || {}; // Ensure homework exists
              lecture.homework.title = lectureData?.homework?.title || lecture.homework?.title || '';
              lecture.homework.questions = lectureData?.homework?.questions?.map((question, index) => {
                // Check if the existing lecture has questions
                const existingQuestion = lecture.homework?.questions?.[index];

                return {
                  questionText: question.questionText || existingQuestion?.questionText || '',
                  options: question.options.map((option, optionIndex) => {
                    // Check if existing options are present
                    const existingOption = existingQuestion?.options?.[optionIndex];

                    return {
                      text: option.text || existingOption?.text || '',
                      isCorrect: option.isCorrect !== undefined ? option.isCorrect : existingOption?.isCorrect || false,
                    };
                  }),
                };
              }) || [];
            } else {
              // Create a new lecture if it doesn't exist
              lecture = new Lecture({
                title: lectureData.title,
                videoUrl: lectureData.videoUrl,
                homework: {
                  title: lectureData?.homework?.title || '',
                  questions: lectureData?.homework?.questions?.map((question) => ({
                    questionText: question.questionText || '',
                    options: question.options.map((option) => ({
                      text: option.text || '',
                      isCorrect: option.isCorrect || false,
                    })),
                  })),
                },
              });
            }

            // Save the lecture to the database
            await lecture.save();

            // Add the lecture to the week's lectures array (if it's a new lecture)
            if (!week.lectures.includes(lecture._id)) {
              week.lectures.push(lecture._id);
            }

            return lecture;
          })
        );

        // Save the week after all lectures are processed
        await week.save();

        // Add the week to the course's weeks array (if it's a new week)
        if (!course.weeks.includes(week._id)) {
          course.weeks.push(week._id);
        }

        return week;
      })
    );

    // Save the updated course to the database
    await course.save();

    res.status(200).json({
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  addCourse,
  addWeektoCourse,
  getAllCourses,
  createCourse,
  editCourse,
};
