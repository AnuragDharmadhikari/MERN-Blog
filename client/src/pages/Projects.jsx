import React from "react";
import CallToAction from "../components/CallToAction";

const Projects = () => {
  return (
    <div className="  min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6">
      <h1 className=" text-3xl font-semibold p-3">Projects</h1>
      <p className=" text-md">
        Bulid fun and engaging projects while learning HTML, CSS and
        JavaScript!!
      </p>
      <CallToAction />
    </div>
  );
};

export default Projects;
