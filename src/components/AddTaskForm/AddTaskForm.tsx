import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import { TaskInterface } from '../../@types/taskData';
import './AddTaskForm.scss';

interface AddTaskFormProps {
  addNewTask: (task: TaskInterface) => void;
}

function AddTaskForm({ addNewTask }: AddTaskFormProps) {
  const [taskName, setTaskName] = useState<string>('');

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskName.trim() !== '') {
      const newTask: TaskInterface = {
        id: Date.now(),
        title: taskName,
        isComplete: false,
      };
      addNewTask(newTask);
      setTaskName(''); // reset input field
    }
  };

  return (
    <div className="add-task-form-container">
      <form className="form-container" onSubmit={handleAddTask}>
        <input
          type="text"
          className="task-name-input"
          placeholder="Enter task name..."
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <button className="btn add-task-btn" type="submit">
          + Add task
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;
