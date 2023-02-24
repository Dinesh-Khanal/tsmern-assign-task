import React, { useState, useEffect } from "react";
import taskService from "../taskService";
import EditModal from "./EditModal";
import Modal from "react-bootstrap/Modal";

const Tasks = () => {
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
  const handleDelete = (id: string) => {
    taskService.deleteTask(id).then((data) => console.log(data));
    const updatedTask = tasks.filter((t) => t._id !== id);
    setTasks(updatedTask);
  };
  const updateTask = (id: string, data: ITask) => {
    taskService.updateTask(id, data).then((result) => console.log(result));
    const updatedTask = tasks.filter((t) => t._id !== id);
    setTasks(updatedTask);
  };
  const handleEdit = (tsk: ITask) => {
    setOpen(true);
    setEdited(false);
    setTask(tsk);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <h3>Tasks</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Task Id</th>
            <th scope="col">Task Name</th>
            <th scope="col">Assignee</th>
            <th scope="col">Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((t: ITask) => (
              <tr key={t._id}>
                <td scope="row">{t._id}</td>
                <td>{t.task}</td>
                <td>{t.assignee}</td>
                <td>{t.status}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(t._id as string)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModal
            task={task as ITask}
            setOpen={setOpen}
            setEdited={setEdited}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Tasks;
