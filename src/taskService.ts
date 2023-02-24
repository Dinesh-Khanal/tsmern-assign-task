import axios, { AxiosResponse } from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

const taskService = {
  gettasks: (): Promise<AxiosResponse<ITask[]>> => {
    return API.get("/tasks").then((result) => result.data.tasks);
  },
  deleteTask: (id: string): Promise<AxiosResponse<string>> => {
    return API.delete(`/tasks/${id}`).then((result) => result.data.message);
  },
  createTask: (task: ITask): Promise<AxiosResponse<ITask>> => {
    return API.post("/tasks/new", task).then((result) => result.data.task);
  },
  updateTask: (id: string, task: ITask): Promise<AxiosResponse<ITask>> => {
    return API.put(`/tasks/${id}`, task).then((result) => result.data.task);
  },
};
export default taskService;
