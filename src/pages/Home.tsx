import React from "react";
import Tasks from "../components/Tasks";
import CreateTask from "../components/CreateTask";
import TaskProvider from "../context/TaskContext";
const Home = () => {
  return (
    <TaskProvider>
      <CreateTask />
      <hr />
      <Tasks />
    </TaskProvider>
  );
};

export default Home;
