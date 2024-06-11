import { useContext, createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./auth.context";

export const TasksContext = createContext({});

export const useTasksContext = () => {
  const tasksContext = useContext(TasksContext);

  if (!tasksContext) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return tasksContext;
};

export const TasksContextProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [tasks, setTasks] = useState([]);

  const getAllUserTasks = async () => {
    try {
      const response = await axios.get(
        `https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/all/tasks/${user.uid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("All tasks response:", response.data); // Log the response

      return response.data;
    } catch (error) {
      console.log(
        "Error fetching all tasks:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getUserHabits = async () => {
    try {
      const response = await axios.get(
        `https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/habits/${user.uid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Habits response:", response.data); // Log the response
      return response.data;
    } catch (error) {
      console.log(
        "Error fetching habits:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getUserRecurrentTasks = async () => {
    try {
      const response = await axios.get(
        `https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/reccuring/${user.uid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Recurrent tasks response:", response.data); // Log the response
      return response.data;
    } catch (error) {
      console.log(
        "Error fetching recurring tasks:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getTodaysTasks = async () => {
    try {
      const response = await axios.get(
        `https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/tasks/${user.uid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Tasks response:", response.data); // Log the response
      return response.data;
    } catch (error) {
      console.log(
        "Error fetching today's tasks:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/tasks/${user.id}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Delete task response:", response.data); // Log the response
      return response.data;
    } catch (error) {
      console.log(
        "Error deleting task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const createTask = async (task) => {
    try {
      const response = await axios.post(
        `https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/tasks/${user.id}`,
        task,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Create task response:", response.data); // Log the response
      return response.data;
    } catch (error) {
      console.log(
        "Error creating task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const state = {
    tasks,
    setTasks,
    getTodaysTasks,
    deleteTask,
    createTask,
    getUserHabits,
    getUserRecurrentTasks,
    getAllUserTasks,
  };

  return (
    <TasksContext.Provider value={state}>{children}</TasksContext.Provider>
  );
};
