import React, { useContext, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiSolidLeftArrow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Courses_Context } from "../Contexts/CoursesContext";
import { User_Context } from "../Contexts/UserContext";

const Weeks = ({ weeks, courseId }) => {
  const { user } = useContext(User_Context);
  const navigate = useNavigate();
  const [openWeeks, setOpenWeeks] = useState([]);
  const [openLectures, setOpenLectures] = useState([]);

  const toggleLecture = (index) => {
    if (openLectures.includes(index)) {
      setOpenLectures(openLectures.filter((i) => i !== index));
    } else setOpenLectures([...openLectures, index]);
  };
  const toggleWeeks = (index) => {
    if (openWeeks.includes(index)) {
      setOpenWeeks(openWeeks.filter((i) => i !== index));
    } else setOpenWeeks([...openWeeks, index]);
  };

  return (
    <div className="py-4">
      <h1 className="text-4xl font-bold my-10">محتوى الكورس</h1>
      {/* list of courses  */}
      {!weeks ? (
        <div>....looding</div>
      ) : (
        weeks?.map((week, index) => (
          <ul key={index}>
            <li
              className=" bg-white p-4 rounded-md"
              style={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
            >
              {/* week intro */}
              <div className="flex items-center justify-between p-4 rounded-md bg-[#efefef]">
                <div>
                  <h2 className="font-bold text-2xl"> {week.weekNumber}</h2>
                  <p>{week.weekContent}</p>
                </div>
                <IoIosArrowDown
                  onClick={() => toggleWeeks(index)}
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    openWeeks.includes(index) ? "rotate-180" : ""
                  }`}
                />
              </div>
              {/*list of hidden week lectures */}
              <div
                className={`transition-[max-height] duration-500 overflow-hidden ${
                  openWeeks.includes(index) ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                {week.lectures.map((lecture, index) => (
                  <ul
                    key={index}
                    className={` rounded-md bg-[#efefef] p-4 mt-2`}
                  >
                    {/* first lecture */}
                    <li>
                      <div
                        className={` my-3 p-4 flex items-center justify-between  bg-white rounded-md shadow-md`}
                      >
                        <div className="rounded-md">
                          <h2>{lecture.title}</h2>
                        </div>
                        <IoIosArrowDown
                          onClick={() => toggleLecture(index)}
                          className={`cursor-pointer transform transition-transform duration-300 ${
                            openLectures.includes(index) ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      {/* hidden details of first class */}
                      <div
                        className={`transition-[max-height] duration-500 overflow-hidden ${
                          openLectures.includes(index)
                            ? "max-h-[1000px]"
                            : "max-h-0"
                        }`}
                      >
                        <div className={` p-4 bg-gray-300 rounded-md`}>
                          <div className="underline font-semibold flex items-center gap-3">
                            <BiSolidLeftArrow />
                            <Link> مشاهدة الفديو </Link>
                          </div>
                          <div className="underline font-semibold flex items-center gap-3">
                            <BiSolidLeftArrow />
                            {user ? (
                              <Link
                                to={`/course/${courseId}/weeks/${week._id}/lecs/${lecture._id}/homework`}
                              >
                                {" "}
                                الواجب
                              </Link>
                            ) : (
                              <Link to="/login" >الواجب</Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                    <li></li>
                  </ul>
                ))}
              </div>
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default Weeks;
