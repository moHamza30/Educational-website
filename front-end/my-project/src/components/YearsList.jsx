import React, { useContext, useEffect, useState } from "react";
import Einstein_2 from "../images/Einstein_2.png";
import Einstein_3 from "../images/Einstein_3.png";
import { Link, useNavigate } from "react-router-dom";
import { Courses_Context } from "../Contexts/CoursesContext";
const YearsList = () => {
  const navigate = useNavigate()
  const { getCourses, courses,setChoosedGrade,choosedGrade } = useContext(Courses_Context);
  console.log(courses);
  console.log(choosedGrade);

  useEffect(() => {
    getCourses();
  }, []);
  const gradesArray = [...new Set(courses?.map(item => item.grade))];
  console.log(gradesArray)
  return (
    <div className=' container grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-8 mb-14'>
      {
        gradesArray.map((grade,index)=>(
          <div key={index}
          onClick={()=>{
            navigate(`/monthsList/${grade}`)
          }}
          className="p-4 rounded-md bg-green-500 cursor-pointer"
          >{grade}</div>
        ))
      }

    </div>

         
  );
};

export default YearsList;
