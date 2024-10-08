import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const Courses_Context = createContext();
const CoursesContext = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    axios
      .get("http://localhost:8000/courses")
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("courses", JSON.stringify(res.data));
        setCourses(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Courses_Context.Provider
      value={{
        courses,
        getCourses,
      }}
    >
      {children}
    </Courses_Context.Provider>
  );
};

export default CoursesContext;
