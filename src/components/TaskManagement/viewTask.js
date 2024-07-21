import React from "react";
import styles from "./task.module.css";

function ViewTask({ currentTask, closeModal }) {
  return (
    <div>
      <h3 className={styles.title}>Task Details</h3>
      <div className={styles.taskDetails}>
        <p className={styles.taskTitle}>Title: {currentTask.name}</p>
        <p style={{ marginBottom: "0px" }}>
          Description: {currentTask.description}
        </p>
        <p>Created at: {currentTask.createdAt}</p>
      </div>
      <button className={styles.closeButton} onClick={closeModal}>
        Close
      </button>
    </div>
  );
}

export default ViewTask;
