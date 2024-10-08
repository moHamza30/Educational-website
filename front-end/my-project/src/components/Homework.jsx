import React, { useState, useContext, useEffect } from 'react';
import { Courses_Context } from '../Contexts/CoursesContext';
import axios from 'axios';
import { User_Context } from '../Contexts/UserContext';
import { useParams } from 'react-router-dom';

const Homework = () => {
  const {courseId,weekId,lecId} = useParams()
  console.log(courseId)
  console.log(weekId)
  console.log(lecId)

    const {user} = useContext(User_Context)
    const [score,setScore] = useState("")
    const [maxScore,setMaxScore] = useState("")
  const { courses } = useContext(Courses_Context);

  const course = courses?.find(course => course._id === courseId);
console.log(courses)
  const week = course?.weeks?.find(week => week._id === weekId);
  console.log(week)

  const lecture = week?.lectures?.find(lec => lec._id === lecId);
  console.log(lecture)

  const {homework} = lecture

  console.log(homework)
  const [userAnswers, setUserAnswers] = useState({}); // Track user-selected answers

  const handleSelectAnswer = (questionId, optionIndex) => {
    setUserAnswers({ ...userAnswers, [questionId]: optionIndex });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/homework/submit', {
        homeworkId: homework._id,
        answers: userAnswers,
        userId: user._id
        
      });
      setScore(response.data.score)
      setMaxScore(response.data.maxScore)
    } catch (error) {
      console.error('Error submitting homework:', error);
    }
  };

  return (
    <div className="mt-[90px] p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">{homework.title}</h1>

      {homework?.questions?.map((question) => (
        <div key={question._id} className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{question.questionText}</h2>
          <ul className="list-none space-y-2">
            {question.options.map((option, index) => (
              <li
                key={option._id}
                onClick={() => handleSelectAnswer(question._id, index)}
                className={`p-4 rounded-md cursor-pointer transition-colors ${
                  userAnswers[question._id] === index ? 'bg-blue-200' : 'bg-gray-100'
                }`}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    {score && <div>you score is {score} from {maxScore}</div>}
      <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
        Submit Homework
      </button>
    </div>
  );
};

export default Homework;
