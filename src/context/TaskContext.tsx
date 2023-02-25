import React, { createContext, useState, useEffect } from "react";
import taskService from "../taskService";

export const TaskContext = createContext<TaskContextType | null>(null);
type ContextProps = {
  children: React.ReactNode;
};
const TaskProvider = ({ children }: ContextProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState(false);
  const [task, setTask] = useState<ITask>({
    task: "",
    assignee: "",
    status: "To be done",
  });
  useEffect(() => {
    fetchTasks();
  }, [edited]);
  const fetchTasks = () => {
    taskService.gettasks().then((data: ITask[] | any) => setTasks(data));
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        open,
        setOpen,
        edited,
        setEdited,
        task,
        setTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
