import React, { useEffect, useState } from "react";
import TaskList from "./index";
import styles from "./home.module.css";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-modal";
import AddTask from "../../components/TaskManagement/addTask";
import { getAllTask } from "../../api/api";
import { useTasks } from "../../components/customHooks/useTask";

function Home() {
  const userId = sessionStorage.getItem("userId");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { tasks, fetchTasks } = useTasks(userId);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [update]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchTasks();
  };

  return (
    <div className={styles.homecard}>
      <div className={styles.topbar}>
        <Button onClick={openModal} className={styles.addTaskButton}>
          Add Task
        </Button>
      </div>
      <div className={styles.searchSortContainer}>
        <div className={styles.searchContainer}>
          Search:
          <span>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
          </span>
        </div>
        <div className={styles.sortContainer}>
          Sort By:
          <span>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                className={styles.dropdownToggle}
              >
                Recent
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Recent</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Last 3 days</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Last Month</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>
      </div>
      <TaskList tasks={tasks} update={update} setUpdate={setUpdate} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Task Modal"
      >
        <AddTask
          closeModal={closeModal}
          update={update}
          setUpdate={setUpdate}
        />
      </Modal>
    </div>
  );
}

export default Home;
