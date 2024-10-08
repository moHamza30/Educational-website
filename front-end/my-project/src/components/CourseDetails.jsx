import React, { useContext, useState } from "react";
import Weeks from "./Weeks";
import { Courses_Context } from "../Contexts/CoursesContext";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { courses } = useContext(Courses_Context);
  const { courseId } = useParams();
  console.log(courseId);
  const course = courses.find((course) => course._id === courseId);
  return (
    <div className="container mt-[85px] bg-[#efefef]">
      <div className="bg-cyan-600 py-10 px-4">
   
        {/* content */}
        <div className="text-white p-4">
          <h1 className="text-4xl font-bold mb-4">{course?.title}</h1>
          <p className="text-lg font-semibold mb-4">
            المحتوى : {course?.weeks.length} اسابيع
          </p>
          <p
            className="font-medium"
            dangerouslySetInnerHTML={{
              __html: course?.description.replace(/\n/g, "<br />"),
            }}
          ></p>
          <div className="mt-6 ">
            <span className="bg-red-500 px-4 py-2 font-semibold rounded-full">
              {course?.price} جنيها
            </span>
          </div>
        </div>
      </div>
      {/* weeks */}
      <Weeks weeks={course?.weeks} courseId={course?._id} />
    </div>
  );
};

export default CourseDetails;
