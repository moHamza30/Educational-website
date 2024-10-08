import React, { useContext, useEffect, useState } from "react";
import monthBannner from "../images/monthBannner.avif";
import SBanner from "../components/SBanner";
import FBanner from "../components/FBanner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Courses_Context } from "../Contexts/CoursesContext";

const MonthsList = () => {
  const navigate = useNavigate();
  const { grade } = useParams();
  const { courses } = useContext(Courses_Context);
  const CoursesToShow = courses?.filter((course) => course.grade === grade);
  const goToCourse = (courseId) => {
    navigate(`/courseDetails/${courseId}`);
  };

  return (
    <div className="mt-[85px]">
      <FBanner />
      <SBanner />
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        { !CoursesToShow?<div>...looding</div>

        :
          CoursesToShow.map((course) => (
          <div key={course._id} className="p-2 flex-grow ">
            {/* Card 1 */}
            <div className="group hover:translate-y-2 transition duration-300 border-2 border-primary rounded-lg py-4  px-10">
              {/* Image */}
              <div className="h-[200px] text-center group-hover:scale-x-125 group-hover:scale-y-105 duration-300 ">
                <img
                  src={monthBannner}
                  alt="course-2-banner"
                  className="  h-full  rounded-md"
                />
              </div>
              {/* Content */}

              {/* title of course*/}
              <h3 className="text-lg font-bold my-2">{course.title}</h3>
              <p className="text-center">
                المحتوى {course.weeks.length} اسابيع
              </p>
              {/* weeks content */}
              <p className="text-sm text-gray-600 py-2">
                {course?.weeks?.map((week, index) => (
                  <div key={index}>{`${index + 1}-  ${week.weekContent}`}</div>
                ))}
              </p>
              {/* buttons */}
              <div className="flex gap-2">
                <Link
                  to={`/courseDetails/${course._id}`}
                  className=" px-4 py-2 hover:bg-blue-500 hover:text-white
                 rounded-full border-2 border-blue-500"
                >
                  الدخول للكورس
                </Link>
                <button
                onClick={()=>navigate("/register")}
                 className="px-4 py-2 bg-primary rounded-full hover:scale-105 duration-300 ">
                  اشترك الان{" "}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthsList;
