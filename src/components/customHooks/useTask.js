import { useState, useEffect, useCallback } from "react";
import { getAllTask } from "../../api/api";

export const useTasks = (userId) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const fetchedTasks = await getAllTask(userId);
      setTasks(fetchedTasks.data);
    } catch (error) {}
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId, fetchTasks]);

  return {
    tasks,
    fetchTasks,
  };
};
