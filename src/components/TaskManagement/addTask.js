import React, { useState } from "react";
import styles from "./task.module.css";
import { createNewTask } from "../../api/api";
import { useTasks } from "../customHooks/useTask";

function AddTask({ closeModal, status = "New Order", update, setUpdate }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = sessionStorage.getItem("userId");

  const addNewTask = async () => {
    setErrorMessage("");
    if (taskName !== "" && description !== "") {
      const body = {
        userId: userId,
        name: taskName,
        description: description,
        status: status,
      };
      try {
        const res = await createNewTask(body);
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
      <h2 className={styles.title}>Add Task</h2>
      <div style={{ marginBottom: "10px" }}>
        <p className={styles.taskTitle}>Title</p>
        <input
          type="text"
          value={taskName}
          className={styles.input}
          onChange={(e) => setTaskName(e.target.value)}
        ></input>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <p className={styles.taskTitle}>Description</p>
        <input
          type="text"
          value={description}
          className={styles.input}
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
        <button className={styles.cancelButton} onClick={addNewTask}>
          Add
        </button>
      </div>
    </div>
  );
}

export default AddTask;
