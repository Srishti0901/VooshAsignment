import React from "react";
import styles from "./task.module.css";
import { deleteTask } from "../../api/api";
import { useTasks } from "../customHooks/useTask";

function TaskCard({ task, onDragEnd, openModal, update, setUpdate }) {
  const userId = sessionStorage.getItem("userId");
  const { fetchTasks } = useTasks(userId);
  const handleDeleteTask = async (taskid) => {
    try {
      const res = await deleteTask(taskid);
      if (res) {
        setUpdate(!update);
        fetchTasks();
      }
    } catch (e) {}
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("en-US");
    const timePart = date.toLocaleTimeString("en-US", { hour12: false });

    return `${datePart}, ${timePart}`;
  };

  const formattedDate = formatDate(task.createdAt);

  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={styles.card}
      key={task._id}
      id={task._id}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={styles.card_left}>
        <div className={styles.status}>{task.name}</div>
        <div className={styles.days}>{task.description}</div>
        <div className={styles.time}>Created at: {formattedDate}</div>
      </div>
      <div className={styles.card_right}>
        <button
          className={styles.button}
          style={{ background: "red" }}
          onClick={() => handleDeleteTask(task._id)}
        >
          Delete
        </button>
        <button
          className={styles.button}
          style={{ background: "#407dbf" }}
          onClick={() => openModal("edit", task)}
        >
          Edit
        </button>
        <button
          className={styles.button}
          style={{ background: "#0d6efd" }}
          onClick={() => openModal("view", task)}
        >
          View Detail
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
