import React from "react";
import Tasks from "../components/Tasks";
import CreateTask from "../components/CreateTask";
const Home = () => {
  return (
    <div>
      <CreateTask />
      <hr />
      <Tasks />
    </div>
  );
};

export default Home;
