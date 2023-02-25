import React, { useState, useEffect, useContext } from "react";
import taskService from "../taskService";
import EditModal from "./EditModal";
import Modal from "react-bootstrap/Modal";
import { TaskContext } from "../context/TaskContext";

const Tasks = () => {
  const val = useContext(TaskContext);
  const handleDelete = (id: string) => {
    taskService.deleteTask(id).then((data) => console.log(data));
    const updatedTask = val?.tasks.filter((t: ITask) => t._id !== id);
    val?.setTasks(updatedTask!);
  };
  const updateTask = (id: string, data: ITask) => {
    taskService.updateTask(id, data).then((result) => console.log(result));
    const updatedTask = val?.tasks.filter((t: ITask) => t._id !== id);
    val?.setTasks(updatedTask!);
  };
  const handleEdit = (tsk: ITask) => {
    val?.setOpen(true);
    val?.setEdited(false);
    val?.setTask(tsk);
  };
  const handleClose = () => {
    val?.setOpen(false);
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
          {val?.tasks &&
            val?.tasks.map((t: ITask) => (
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
      <Modal show={val?.open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModal
            task={val?.task as ITask}
            setOpen={val!.setOpen}
            setEdited={val!.setEdited}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Tasks;
