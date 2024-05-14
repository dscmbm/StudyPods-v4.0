import React, { useState, useEffect } from "react";
import "./ToDoList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlus,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [editTaskInput, setEditTaskInput] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTask = async () => {
    if (taskInput && dateInput) {
      try {
        await axios.post(
          "http://localhost:5000/api/todos",
          { taskInput, date: dateInput },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchTodos();
        createPopup("Task added", "#eee");
        setTaskInput("");
        setDateInput("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleDoneTask = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/todos/${id}/done`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTodos();
      createPopup("Task done", "#00cc66");
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      createPopup("Task Deleted", "#ff5757");
      fetchTodos();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { taskInput: editTaskInput },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchTodos();
      createPopup("Task updated", "#00cc66");
      setEditTaskInput("");
      setEditTaskId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      await axios.delete("http://localhost:5000/api/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      createPopup("All tasks are deleted", "#ff5757");
      fetchTodos();
    } catch (error) {
      console.error("Error deleting all tasks:", error);
    }
  };

  const createPopup = (text, color) => {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = text;
    popup.style.background = color;
    document.body.insertAdjacentElement("afterbegin", popup);
    setTimeout(() => {
      popup.remove();
    }, 5000);
  };

  return (
    <div className="todobox">
      <div className="A">
        <div className="B C">
          <h1>ToDo List</h1>
        </div>
        <div className="B D">
          <input
            type="text"
            id="new-task"
            className="styled-input"
            placeholder="Add a todo..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <input
            type="date"
            id="task-date"
            className="styled-input"
            placeholder="Select date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button id="add-task-button" onClick={handleAddTask}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="B E">
          <button id="deleteButton" onClick={handleDeleteAllTasks}>
            DELETE ALL
          </button>
        </div>
        <div className="B F">
          <table>
            <thead>
              <tr>
                <th>TASK</th>
                <th>DUE DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody className="todos-list-body">
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="I">
                    {editTaskId === task._id ? (
                      <input
                        type="text"
                        value={editTaskInput}
                        onChange={(e) => setEditTaskInput(e.target.value)}
                      />
                    ) : (
                      <p className="limit-text">{task.taskInput}</p>
                    )}
                  </td>
                  <td className="I">{task.date}</td>
                  <td className="I">{task.status}</td>
                  <td className="I" style={{ display: "flex", gap: "10px" }}>
                    {editTaskId === task._id ? (
                      <>
                        <button
                          className="btn doneTask"
                          onClick={() => handleEditTask(task._id)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          className="btn deleteTask"
                          onClick={() => {
                            setEditTaskInput("");
                            setEditTaskId(null);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn editTask"
                          onClick={() => {
                            setEditTaskInput(task.taskInput);
                            setEditTaskId(task._id);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="btn doneTask"
                          onClick={() => handleDoneTask(task._id)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          className="btn deleteTask"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
