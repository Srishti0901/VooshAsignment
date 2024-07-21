import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import Modal from "react-modal";
import ViewTask from "../../components/TaskManagement/viewTask";
import EditTask from "../../components/TaskManagement/editTask";
import AddTask from "../../components/TaskManagement/addTask";
import { updateTask } from "../../api/api";
import TaskCard from "../../components/TaskManagement/taskCard";
import { useTasks } from "../../components/customHooks/useTask";

const TaskList = ({ tasks: initialTasks, update, setUpdate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentTask, setCurrentTask] = useState(null);
  const [cardStatus, setCardStatus] = useState("");
  const [tasks, setTasks] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const { fetchTasks } = useTasks(userId);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };

  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };

  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (
      newTarget &&
      (newTarget.parentNode === currentTarget || newTarget === currentTarget)
    )
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  const onDrop = (evt, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let updatedTasks = tasks.map((task) => {
      if (task._id.toString() === data.toString()) {
        task.status = status;
        updateTask({ taskId: task._id, userId: task.userId, newStatus: status })
          .then((res) => {
            setTasks(updatedTasks);
          })
          .catch((err) => {});
      }
      return task;
    });
  };

  const openModal = (type, task = null, status = null) => {
    setModalType(type);
    setCurrentTask(task);
    setModalIsOpen(true);
    setCardStatus(status);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentTask(null);
    fetchTasks();
  };

  const renderColumn = (title, status, tasks) => {
    return (
      <div
        className={`${status.toLowerCase().replace(" ", "-")} ${
          styles.smallbox
        }`}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
      >
        <section className={styles.drag_container}>
          <div className={styles.container}>
            <div className={styles.drag_column}>
              <div className={styles.drag_row}>
                <div className={styles.title}>{title}</div>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onDragEnd={onDragEnd}
                      openModal={openModal}
                      update={update}
                      setUpdate={setUpdate}
                    />
                  ))
                ) : (
                  <div
                    className={styles.add_card_message}
                    onClick={() => openModal("add", null, status)}
                  >
                    + Add Card
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const newOrder = tasks.filter((data) => data.status === "New Order");
  const pending = tasks.filter((data) => data.status === "InProgress");
  const done = tasks.filter((data) => data.status === "Completed");

  return (
    <div className={styles.container} style={{ marginTop: "40px" }}>
      {renderColumn("TODO", "New Order", newOrder)}
      {renderColumn("IN PROGRESS", "InProgress", pending)}
      {renderColumn("DONE", "Completed", done)}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Task Modal"
      >
        {modalType === "edit" && currentTask && (
          <EditTask
            currentTask={currentTask}
            closeModal={closeModal}
            update={update}
            setUpdate={setUpdate}
          />
        )}
        {modalType === "view" && currentTask && (
          <ViewTask currentTask={currentTask} closeModal={closeModal} />
        )}
        {modalType === "add" && (
          <AddTask
            closeModal={closeModal}
            status={cardStatus}
            update={update}
            setUpdate={setUpdate}
          />
        )}
      </Modal>
    </div>
  );
};

export default TaskList;
