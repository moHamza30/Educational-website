import React from "react";
import { useLocation } from "react-router-dom";

const SeeVideo = () => {
  const location = useLocation();
  const vidoePath = location.state;
  console.log(vidoePath);
  const BASE_URL = "http://localhost:8000";
  const fullVideoUrl = `${BASE_URL}${vidoePath}`;
  console.log(fullVideoUrl);

  return (
    <div className="mt-[90px] h-screen bg-slate-500 flex justify-center items-center">
      <video controls  className="rounded-lg max-h-full w-full">
        <source src={fullVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SeeVideo;
