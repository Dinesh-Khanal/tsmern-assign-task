interface ITask {
  _id?: string;
  task: string;
  assignee: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
enum StatusEnum {
  to_be_done = "To be done",
  in_progress = "In progress",
  completed = "Completed",
}
interface Input {
  task: string;
  assignee: string;
  status: StatusEnum;
}

type TaskContextType = {
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;
  open: boolean;
  setOpen: (arg: boolean) => void;
  edited: boolean;
  setEdited: (arg: boolean) => void;
  task: ITask;
  setTask: (task: ITask) => void;
};
