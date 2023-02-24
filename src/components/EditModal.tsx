import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import taskService from "../taskService";
interface IProps {
  setOpen: (prevState: boolean) => void;
  setEdited: (prevState: boolean) => void;
  task: ITask;
}
enum StatusEnum {
  to_be_done = "To be done",
  in_progress = "In progress",
  completed = "Completed",
}
const EditModal = ({ setOpen, task, setEdited }: IProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<Input>();
  useEffect(() => {
    if (task) {
      reset({
        task: task.task,
        assignee: task.assignee,
      });
    }
  }, [task]);
  const submit: SubmitHandler<Input> = (data) => {
    taskService.updateTask(task._id as string, data).then((result) => {
      if (result) setEdited(true);
    });
    setOpen(false);
  };
  return (
    <div>
      <form className="row g-2" onSubmit={handleSubmit(submit)}>
        <div className="col-md-6">
          {/* in bootstrap 5 there are five break point based on min-width, sm, md, lg, xl, and xxl */}
          <label className="form-label">Task</label>
          <input
            {...register("task", { required: true })}
            className="form-control"
            placeholder="Task name"
          />
          {errors.task && <span>This field is required</span>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Assignee</label>
          <input
            {...register("assignee", { required: true })}
            className="form-control"
            placeholder="Assignee"
          />
          {errors.assignee && <span>This field is required</span>}
        </div>
        <div className="col-md-12">
          <select {...register("status")} className="form-control">
            <option value={StatusEnum.to_be_done}>To be done</option>
            <option value={StatusEnum.in_progress}>In progress</option>
            <option value={StatusEnum.completed}>Completed</option>
          </select>
        </div>
        <div className="col-12">
          <input type="submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditModal;
