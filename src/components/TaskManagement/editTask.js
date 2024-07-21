import React, { useState } from "react";
import styles from "./task.module.css";
import { updateTask } from "../../api/api";

function EditTask({ currentTask, closeModal, update, setUpdate }) {
  const [taskTitle, setTaskTitle] = useState(currentTask.name);
  const [description, setDescription] = useState(currentTask.description);
  const [errorMessage, setErrorMessage] = useState("");

  const editTask = async () => {
    setErrorMessage("");
    if (taskTitle !== "" && description !== "") {
      const body = {
        userId: currentTask.userId,
        taskId: currentTask._id,
        newName: taskTitle,
        newDescription: description,
        newStatus: currentTask.status,
      };
      try {
        const res = await updateTask(body);
        if (res) {
          setUpdate(!update);
        }
        closeModal();
      } catch (e) {}
    } else {
      setErrorMessage("Please fill all the detail");
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Edit Task</h2>
      <div style={{ marginBottom: "10px" }}>
        <p className={styles.taskTitle}>Title</p>
        <input
          type="text"
          className={styles.input}
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        ></input>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <p className={styles.taskTitle}>Description</p>
        <input
          type="text"
          className={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      </div>
      {errorMessage !== "" && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <div>
        <button className={styles.closeButton} onClick={closeModal}>
          Cancel
        </button>
        <button className={styles.cancelButton} onClick={editTask}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditTask;
