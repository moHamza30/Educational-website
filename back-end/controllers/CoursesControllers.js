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



// const editCourse = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { title, description, grade, price } = req.body;
//     let { weeks } = req.body;
//     weeks = JSON.parse(weeks);

//     // Find the course by ID
//     const course = await Course.findById(id);
//     if (!course) return next(new AppError("Course not found", 404));

//     // Update the basic course details
//     course.title = title || course.title;
//     course.description = description || course.description;
//     course.grade = grade || course.grade;
//     course.price = price || course.price;

//     // Process the weeks array using map
//     const updatedWeeks = await Promise.all(
//       weeks?.map(async (weekData,weekIndex) => {
//         let week;

//         if (weekData._id) {
//           // If the week already exists, update it
//           week = await Week.findById(weekData._id);
//           if (!week) throw new Error(`Week with id ${weekData._id} not found`);

//           // Update the week details
//           week.weekNumber = weekData.weekNumber || week.weekNumber;
//           week.weekContent = weekData.weekContent || week.weekContent;
//         } else {
//           // Create a new week if it doesn't exist
//           week = new Week({
//             weekNumber: weekData.weekNumber,
//             weekContent: weekData.weekContent,
//             course: course._id, // Link this week to the course
//           });
//         }

//         // Process lectures for each week using map
//         const updatedLectures = await Promise.all(
//           weekData?.lectures?.map(async (lectureData,lectureIndex) => {
//             let lecture;

//             if (lectureData._id) {
//               // If the lecture already exists, update it
//               lecture = await Lecture.findById(lectureData._id);
//               if (!lecture) throw new Error(`Lecture with id ${lectureData._id} not found`);

//               // Update the lecture details
//               lecture.title = lectureData.title || lecture.title;

//               const videoFieldName = `video_${weekIndex}_${lectureIndex}`;
//               const videoFile = req.files.find(file => file.fieldname === videoFieldName);
//               console.log("hhhhhhhhhhhh")
//               console.log(videoFile)
//               if (videoFile) {
//                 const video = `/uploads/videos/${videoFile.filename}`;
//                 lecture.video = video;
//               }
//               // Update the homework and questions safely
//               lecture.homework = lecture.homework || {}; // Ensure homework exists
//               lecture.homework.title = lectureData?.homework?.title || lecture.homework?.title || '';
//               lecture.homework.questions = lectureData?.homework?.questions?.map((question, index) => {
//                 // Check if the existing lecture has questions
//                 const existingQuestion = lecture.homework?.questions?.[index];

//                 return {
//                   questionText: question.questionText || existingQuestion?.questionText || '',
//                   options: question.options.map((option, optionIndex) => {
//                     // Check if existing options are present
//                     const existingOption = existingQuestion?.options?.[optionIndex];

//                     return {
//                       text: option.text || existingOption?.text || '',
//                       isCorrect: option.isCorrect !== undefined ? option.isCorrect : existingOption?.isCorrect || false,
//                     };
//                   }),
//                 };
//               }) || [];
//             } else {
//               // Create a new lecture if it doesn't exist
//               lecture = new Lecture({
//                 title: lectureData.title,
//                 video: video,
//                 homework: {
//                   title: lectureData?.homework?.title || '',
//                   questions: lectureData?.homework?.questions?.map((question) => ({
//                     questionText: question.questionText || '',
//                     options: question.options.map((option) => ({
//                       text: option.text || '',
//                       isCorrect: option.isCorrect || false,
//                     })),
//                   })),
//                 },
//               });
//             }

//             // Save the lecture to the database
//             await lecture.save();

//             // Add the lecture to the week's lectures array (if it's a new lecture)
//             if (!week.lectures.includes(lecture._id)) {
//               week.lectures.push(lecture._id);
//             }

//             return lecture;
//           })
//         );

//         // Save the week after all lectures are processed
//         await week.save();

//         // Add the week to the course's weeks array (if it's a new week)
//         if (!course.weeks.includes(week._id)) {
//           course.weeks.push(week._id);
//         }

//         return week;
//       })
//     );

//     // Save the updated course to the database
//     await course.save();

//     res.status(200).json({
//       message: "Course updated successfully",
//       data: course,
//     });
//   } catch (error) {
//     console.error("Error updating course:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// const editCourse = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { title, description, grade, price } = req.body;
//     let { weeks } = req.body;
//     weeks = JSON.parse(weeks);

//     // Find the course by ID
//     const course = await Course.findById(id);
//     if (!course) return next(new AppError("Course not found", 404));

//     // Update the basic course details
//     course.title = title || course.title;
//     course.description = description || course.description;
//     course.grade = grade || course.grade;
//     course.price = price || course.price;

//     // Process the weeks array using map
//     const updatedWeeks = await Promise.all(
//       weeks?.map(async (weekData, weekIndex) => {
//         let week;

//         if (weekData._id) {
//           // If the week already exists, update it
//           week = await Week.findById(weekData._id);
//           if (!week) throw new Error(`Week with id ${weekData._id} not found`);

//           // Update the week details
//           week.weekNumber = weekData.weekNumber || week.weekNumber;
//           week.weekContent = weekData.weekContent || week.weekContent;
//         } else {
//           // Create a new week if it doesn't exist
//           week = new Week({
//             weekNumber: weekData.weekNumber,
//             weekContent: weekData.weekContent,
//             course: course._id, // Link this week to the course
//           });
//         }

//         // Process lectures for each week using map
//         const updatedLectures = await Promise.all(
//           weekData?.lectures?.map(async (lectureData, lectureIndex) => {
//             let lecture;

//             if (lectureData._id) {
//               // If the lecture already exists, update it
//               lecture = await Lecture.findById(lectureData._id);
//               if (!lecture) throw new Error(`Lecture with id ${lectureData._id} not found`);

//               // Update the lecture details
//               lecture.title = lectureData.title || lecture.title;

//               // Check if a new video is uploaded
//               const videoFieldName = `video_${weekIndex}_${lectureIndex}`;
//               const videoFile = req.files.find(file => file.fieldname === videoFieldName);

//               // Update the video only if a new file is uploaded, otherwise keep the existing video path
//               if (videoFile) {
//                 const video = `/uploads/videos/${videoFile.filename}`;
//                 lecture.video = video;
//                 console.log("xxxxxxxxxxxxxxxx")
//                 console.log(lecture.video)
//               }

//               // Update the homework and questions safely
//               lecture.homework = lecture.homework || {}; // Ensure homework exists
//               lecture.homework.title = lectureData?.homework?.title || lecture.homework?.title || '';
//               lecture.homework.questions = lectureData?.homework?.questions?.map((question, index) => {
//                 const existingQuestion = lecture.homework?.questions?.[index];
//                 return {
//                   questionText: question.questionText || existingQuestion?.questionText || '',
//                   options: question.options.map((option, optionIndex) => {
//                     const existingOption = existingQuestion?.options?.[optionIndex];
//                     return {
//                       text: option.text || existingOption?.text || '',
//                       isCorrect: option.isCorrect !== undefined ? option.isCorrect : existingOption?.isCorrect || false,
//                     };
//                   }),
//                 };
//               }) || [];
//             } else {
//               // Create a new lecture if it doesn't exist
//               const videoFieldName = `video_${weekIndex}_${lectureIndex}`;
//               const videoFile = req.files.find(file => file.fieldname === videoFieldName);
//               const video = videoFile ? `/uploads/videos/${videoFile.filename}` : '';

//               lecture = new Lecture({
//                 title: lectureData.title,
//                 video: video,
//                 homework: {
//                   title: lectureData?.homework?.title || '',
//                   questions: lectureData?.homework?.questions?.map((question) => ({
//                     questionText: question.questionText || '',
//                     options: question.options.map((option) => ({
//                       text: option.text || '',
//                       isCorrect: option.isCorrect || false,
//                     })),
//                   })),
//                 },
//               });
//             }

//             // Save the lecture to the database
//             await lecture.save();
//             console.log('Lecture after save:');
//             console.log(lecture);

//             // Add the lecture to the week's lectures array (if it's a new lecture)
//             if (!week.lectures.includes(lecture._id)) {
//               week.lectures.push(lecture._id);
//             }

//             return lecture;
//           })
//         );

//         // Save the week after all lectures are processed
//         await week.save();

//         // Add the week to the course's weeks array (if it's a new week)
//         if (!course.weeks.includes(week._id)) {
//           course.weeks.push(week._id);
//         }

//         return week;
//       })
//     );

//     // Save the updated course to the database
//     await course.save();

//     res.status(200).json({
//       message: "Course updated successfully",
//       data: course,
//     });
//   } catch (error) {
//     console.error("Error updating course:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
const editCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, grade, price } = req.body;
    let { weeks } = req.body;
    weeks = JSON.parse(weeks); // Parsing the weeks to handle JSON structure

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
      weeks.map(async (weekData, weekIndex) => {
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

        // Process lectures for each week
        const updatedLectures = await Promise.all(
          weekData?.lectures?.map(async (lectureData, lectureIndex) => {
            let lecture;

            if (lectureData._id) {
              // If the lecture already exists, update it
              lecture = await Lecture.findById(lectureData._id);
              if (!lecture) throw new Error(`Lecture with id ${lectureData._id} not found`);

              // Update the lecture details
              lecture.title = lectureData.title || lecture.title;

              // Check if a new video is uploaded
              const videoFieldName = `video_${weekIndex}_${lectureIndex}`;
              const videoFile = req.files.find(file => file.fieldname === videoFieldName);

              // Update the video only if a new file is uploaded, otherwise keep the existing video path
              if (videoFile) {
                const video = `/uploads/videos/${videoFile.filename}`;
                lecture.video = video;
              }

              // Update homework by finding or creating a new one
              if (lectureData?.homework?._id) {
                // If homework exists, ensure it's just the ObjectId
                lecture.homework = lectureData.homework._id;
              } else if (lectureData?.homework) {
                // Create a new homework if it doesn't exist
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

                await newHomework.save();
                lecture.homework = newHomework._id; // Set the ObjectId reference for the homework
              }

            } else {
              // Create a new lecture if it doesn't exist
              const videoFieldName = `video_${weekIndex}_${lectureIndex}`;
              const videoFile = req.files.find(file => file.fieldname === videoFieldName);
              const video = videoFile ? `/uploads/videos/${videoFile.filename}` : '';

              // Create new homework if needed
              const newHomework = new Homework({
                title: lectureData?.homework?.title || '',
                questions: lectureData?.homework?.questions?.map((question) => ({
                  questionText: question.questionText || '',
                  options: question.options.map((option) => ({
                    text: option.text || '',
                    isCorrect: option.isCorrect || false,
                  })),
                })),
              });

              await newHomework.save();

              // Create new lecture
              lecture = new Lecture({
                title: lectureData.title,
                video: video,
                homework: newHomework._id, // Reference the newly created homework
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


const createCourse = async (req, res) => {
  try {
    const { title, description, price, grade } = req.body;  
    let { weeks } = req.body;
    weeks = JSON.parse(weeks);

    const newCourse = new Course({
      title,
      description,
      grade,
      price,
    });

    // Log files to verify uploads
    console.log(req.files);  // Shows uploaded files

    // Create the course with weeks and lectures
    const createdWeeks = await Promise.all(
      weeks.map(async (weekData, weekIndex) => {
        const newWeek = new Week({
          weekNumber: weekData.weekNumber,
          weekContent: weekData.weekContent,
          course: newCourse._id,
        });

        const createdLectures = await Promise.all(
          weekData.lectures.map(async (lectureData, lectureIndex) => {
            const videoFieldName = `video_${weekIndex}_${lectureIndex}`;
            const videoFile = req.files.find(file => file.fieldname === videoFieldName);

            const video = `/uploads/videos/${videoFile.filename}` ;

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

            await newHomework.save();

            const newLecture = new Lecture({
              title: lectureData.title,
              video: video,  
              homework: newHomework._id,
            });

            await newLecture.save();

            newWeek.lectures.push(newLecture._id);

            return newLecture;
          })
        );

        await newWeek.save();
        return newWeek;
      })
    );

    newCourse.weeks = createdWeeks.map((week) => week._id);
    await newCourse.save();

    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  addCourse,
  addWeektoCourse,
  getAllCourses,
  createCourse,
  editCourse
};
