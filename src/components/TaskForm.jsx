import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({ setTasks }) => {
  // const [task, setTask] = useState("");
  // const [status, setStatus] = useState("Todo");
  // console.log(task);
  // console.log(status);
  // const handleTaskChange = (e) => setTask(e.target.value);
  // const handleStatusChange = (e) => setStatus(e.target.value);

  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });
  const handleChange = (e) => {
    // const name=e.target.name;
    // const value=e.target.value;
    // The above two lines can be re-written in one line by object destructuring:

    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskData);
    setTasks((prev) => {
      return [...prev, taskData];
    });
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
  };

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          name="task"
          type="text"
          value={taskData.task}
          className="task_input"
          placeholder="Enter your text here .."
          // onChange={e => (setTask(e.target.value))}              Three ways to do the same thing
          // onChange={(e) => handleTaskChange(e)}
          onChange={handleChange}
        />
        <div className="task_form_bottom_line">
          <div>
            <Tag
              tagName="HTML"
              selectTag={selectTag}
              selected={checkTag("HTML")}
            />
            <Tag
              tagName="CSS"
              selectTag={selectTag}
              selected={checkTag("CSS")}
            />
            <Tag
              tagName="JavaScript"
              selectTag={selectTag}
              selected={checkTag("JavaScript")}
            />
            <Tag
              tagName="React"
              selectTag={selectTag}
              selected={checkTag("React")}
            />
          </div>
          <div>
            <select
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
            >
              <option value="todo">To DO</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button type="submit" className="task_submit">
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
