import React, { useState } from "react";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("الاول الثانوى");
  const [price, setPrice] = useState("");
  const [weeks, setWeeks] = useState([
    {
      weekNumber: "",
      weekContent: "",
      lectures: [
        {
          title: "",
          videoUrl: "",
          homework: {
            title: "",
            questions: [
              {
                questionText: "",
                options: [{ text: "", isCorrect: false }],
              },
            ],
          },
        },
      ],
    },
  ]);

  // Handle course title, description, and grade input
  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
    if (name === "grade") setGrade(value);
    if (name === "price") setPrice(value);
  };

  // Week change handler
  const handleWeekChange = (index, e) => {
    const newWeeks = [...weeks];
    newWeeks[index] = {
      ...newWeeks[index],
      [e.target.name]: e.target.value,
    };
    setWeeks(newWeeks);
  };

  // Lecture change handler
  const handleLectureChange = (weekIndex, lectureIndex, e) => {
    const newWeeks = [...weeks];
    newWeeks[weekIndex].lectures[lectureIndex][e.target.name] = e.target.value;
    setWeeks(newWeeks);
  };

  // Homework title change handler
  const handleHomeworkTitleChange = (weekIndex, lectureIndex, e) => {
    const newWeeks = [...weeks];
    newWeeks[weekIndex].lectures[lectureIndex].homework.title = e.target.value;
    setWeeks(newWeeks);
  };

  // Question change handler
  const handleQuestionChange = (weekIndex, lectureIndex, questionIndex, e) => {
    const newWeeks = [...weeks];
    newWeeks[weekIndex].lectures[lectureIndex].homework.questions[
      questionIndex
    ].questionText = e.target.value;
    setWeeks(newWeeks);
  };

  // Option change handler
  const handleOptionChange = (
    weekIndex,
    lectureIndex,
    questionIndex,
    optionIndex,
    e
  ) => {
    const newWeeks = [...weeks];
    newWeeks[weekIndex].lectures[lectureIndex].homework.questions[
      questionIndex
    ].options[optionIndex][e.target.name] =
      e.target.name === "isCorrect" ? e.target.checked : e.target.value;
    setWeeks(newWeeks);
  };

  // Add new week
  const addWeek = () => {
    setWeeks([
      ...weeks,
      {
        weekNumber: "",
        weekContent: "",
        lectures: [
          {
            title: "",
            videoUrl: "",
            homework: {
              title: "",
              questions: [
                {
                  questionText: "",
                  options: [{ text: "", isCorrect: false }],
                },
              ],
            },
          },
        ],
      },
    ]);
  };
  const removeWeek = (index) => {
    setWeeks(
      weeks.filter((week, i) => {
        return i !== index;
      })
    );
  };
  // Add new lecture
  const addLecture = (weekIndex) => {
    const newWeeks = [...weeks];
    newWeeks[weekIndex].lectures.push({
      title: "",
      videoUrl: "",
      homework: {
        title: "",
        questions: [
          { questionText: "", options: [{ text: "", isCorrect: false }] },
        ],
      },
    });
    setWeeks(newWeeks);
  };

  
  const removeLecture = (weekIndex, lecIndex) => {
    setWeeks(prevWeeks => {
      const newWeeks = [...prevWeeks];
      newWeeks[weekIndex].lectures = newWeeks[weekIndex].lectures.filter(
        (_, i) => i !== lecIndex
      );
      return newWeeks;
    });
  };
  
  // Add new question
  const addQuestion = (weekIndex, lectureIndex) => {
    const newWeeks = [...weeks];
    newWeeks[weekIndex].lectures[lectureIndex].homework.questions.push({
      questionText: "",
      options: [{ text: "", isCorrect: false }],
    });
    setWeeks(newWeeks);
  };

  const removeQuestion = (weekIndex, lectureIndex, questionIndex) => {
    setWeeks(prevWeeks => {
      const newWeeks = [...prevWeeks];
      newWeeks[weekIndex].lectures[lectureIndex].homework.questions = 
        newWeeks[weekIndex].lectures[lectureIndex].homework.questions.filter(
          (_, i) => i !== questionIndex
        );
      return newWeeks;
    });
  };
  

  // Add new option
  const addOption = (weekIndex, lectureIndex, questionIndex) => {
    const newWeeks = [...weeks];
    newWeeks[weekIndex].lectures[lectureIndex].homework.questions[
      questionIndex
    ].options.push({ text: "", isCorrect: false });
    setWeeks(newWeeks);
  };

  const removeOption = (weekIndex, lectureIndex, questionIndex, optionIndex) => {
    const newWeeks = [...weeks];
  
    // Remove the option at the given optionIndex from the options array
    newWeeks[weekIndex].lectures[lectureIndex].homework.questions[
      questionIndex
    ].options = newWeeks[weekIndex].lectures[lectureIndex].homework.questions[
      questionIndex
    ].options.filter((option, i) => i !== optionIndex);
  
    // Update the state with the modified weeks array
    setWeeks(newWeeks);
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      title,
      description,
      grade,
      price,
      weeks: weeks,
    };
    console.log(weeks);
    console.log(courseData);
    try {
      const response = await axios.post(
        "http://localhost:8000/courses",
        courseData
      );
      console.log(response);
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setGrade("الاول الثانوى");
      setWeeks([
        {
          weekNumber: "",
          weekContent: "",
          lectures: [
            {
              title: "",
              videoUrl: "",
              homework: {
                title: "",
                questions: [
                  {
                    questionText: "",
                    options: [{ text: "", isCorrect: false }],
                  },
                ],
              },
            },
          ],
        },
      ]);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 w-full text-white"
    >
      <h2 className="text-xl font-semibold mb-4">Create a New Course</h2>

      {/* Course Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Course Title
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleCourseChange}
          placeholder="Enter course title"
          className="p-3 rounded bg-gray-700 border border-gray-600 w-full"
          required
        />
      </div>

      {/* Course Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Course Description
        </label>
        <textarea
          name="description"
          value={description}
          onChange={handleCourseChange}
          placeholder="Enter course description"
          className="p-3 rounded bg-gray-700 border border-gray-600 w-full"
          required
        ></textarea>
      </div>

      {/* Grade */}
      <div className="mb-4">
        <label htmlFor="grade" className="block text-sm font-medium mb-2">
          Grade
        </label>
        <select
          name="grade"
          value={grade}
          onChange={handleCourseChange}
          className="p-3 rounded bg-gray-700 border border-gray-600 w-full"
          required
        >
          <option value="الاول الثانوى">الاول الثانوى</option>
          <option value="الثانى الثانوى">الثانى الثانوى</option>
          <option value="الثالث الثانوى">الثالث الثانوى</option>
        </select>
      </div>

      {/* Course price */}
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium mb-2">
          Course price
        </label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={handleCourseChange}
          placeholder="Enter course price"
          className="p-3 rounded bg-gray-700 border border-gray-600 w-full"
          required
        />
      </div>

      {/* Weeks */}
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="mb-6 bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold mb-4">Week {weekIndex + 1}</h3>
            <div onClick={() => removeWeek(weekIndex)}>
              <IoIosCloseCircle className="text-2xl" />
            </div>
          </div>

          {/* Week Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Week Number
            </label>
            <input
              type="text"
              name="weekNumber"
              value={week.weekNumber}
              onChange={(e) => handleWeekChange(weekIndex, e)}
              className="p-2 rounded bg-gray-600 border border-gray-500 w-full"
              //   required
            />
          </div>

          {/* week content */}
          <div className="mb-4">
            <label
              htmlFor="weekContent"
              className="block text-sm font-medium mb-2"
            >
              week content
            </label>
            <textarea
              name="weekContent"
              value={week.weekContent}
              onChange={(e) => handleWeekChange(weekIndex, e)}
              placeholder="Enter week content"
              className="p-3 rounded bg-gray-700 border border-gray-600 w-full"
            ></textarea>
          </div>

          {/* Lectures */}
          {week.lectures.map((lecture, lectureIndex) => (
            <div key={lectureIndex} className="mb-4 bg-gray-600 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold mb-2">
                  Lecture {lectureIndex + 1}
                </h4>
                <div onClick={() => removeLecture(weekIndex, lectureIndex)}>
                  <IoIosCloseCircle className="text-2xl" />
                </div>
              </div>

              {/* Lecture Title */}
              <div className="mb-2">
                <input
                  type="text"
                  name="title"
                  placeholder="Lecture Title"
                  value={lecture.title}
                  onChange={(e) =>
                    handleLectureChange(weekIndex, lectureIndex, e)
                  }
                  className="p-3 rounded bg-gray-500 border border-gray-400 w-full"
                  //   required
                />
              </div>

              {/* Lecture Video URL */}
              <div className="mb-2">
                <input
                  type="text"
                  name="videoUrl"
                  placeholder="Video URL"
                  value={lecture.videoUrl}
                  onChange={(e) =>
                    handleLectureChange(weekIndex, lectureIndex, e)
                  }
                  className="p-3 rounded bg-gray-500 border border-gray-400 w-full"
                  //   required
                />
              </div>

              {/* Homework Title */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Homework Title"
                  value={lecture.homework.title}
                  onChange={(e) =>
                    handleHomeworkTitleChange(weekIndex, lectureIndex, e)
                  }
                  className="p-3 rounded bg-gray-500 border border-gray-400 w-full"
                  //   required
                />
              </div>

              {/* Questions */}
              {lecture.homework.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="mb-4 bg-gray-500 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold mb-2">
                      Question {questionIndex + 1}
                    </h5>
                    <div
                      onClick={() =>
                        removeQuestion(weekIndex, lectureIndex, questionIndex)
                      }
                    >
                      <IoIosCloseCircle className="text-2xl" />
                    </div>
                  </div>

                  {/* Question Text */}
                  <input
                    type="text"
                    placeholder="Question Text"
                    value={question.questionText}
                    onChange={(e) =>
                      handleQuestionChange(
                        weekIndex,
                        lectureIndex,
                        questionIndex,
                        e
                      )
                    }
                    className="p-2 mb-2 rounded bg-gray-400 border border-gray-300 w-full"
                    // required
                  />

                  {/* Options */}
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center ">
                      <div  className="flex flex-1 items-center mb-2">
                      <input
                        type="text"
                        name="text"
                        placeholder="Option Text"
                        value={option.text}
                        onChange={(e) =>
                          handleOptionChange(
                            weekIndex,
                            lectureIndex,
                            questionIndex,
                            optionIndex,
                            e
                          )
                        }
                        className="p-2 rounded bg-gray-300 border border-gray-200 w-9/12 mr-2"
                        // required
                      />
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          name="isCorrect"
                          checked={option.isCorrect}
                          onChange={(e) =>
                            handleOptionChange(
                              weekIndex,
                              lectureIndex,
                              questionIndex,
                              optionIndex,
                              e
                            )
                          }
                          className="mr-2"
                        />
                        Is Correct
                      </label>
                    </div>
                    <IoIosCloseCircle
                     onClick={()=>removeOption(weekIndex,lectureIndex,questionIndex,optionIndex)} 
                     className="text-2xl" />

                    </div>
                  ))}

                  {/* Add Option */}
                  <button
                    type="button"
                    onClick={() =>
                      addOption(weekIndex, lectureIndex, questionIndex)
                    }
                    className="p-2 bg-blue-500 rounded text-white text-sm"
                  >
                    Add Option
                  </button>
                </div>
              ))}

              {/* Add Question */}
              <button
                type="button"
                onClick={() => addQuestion(weekIndex, lectureIndex)}
                className="p-2 bg-blue-500 rounded text-white text-sm mb-4"
              >
                Add Question
              </button>
            </div>
          ))}

          {/* Add Lecture */}
          <button
            type="button"
            onClick={() => addLecture(weekIndex)}
            className="p-2 bg-green-600 rounded text-white text-sm mb-4"
          >
            Add Lecture
          </button>
        </div>
      ))}

      {/* Add Week */}
      <button
        type="button"
        onClick={addWeek}
        className="p-2 bg-purple-500 rounded text-white text-sm mb-6"
      >
        Add Week
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        className="p-3 bg-blue-600 rounded w-full text-white font-semibold"
      >
        Create Course
      </button>
    </form>
  );
};

export default AddCourse;
