import React, { useState } from 'react';

import { TaskInterface } from '../../@types/taskData';
import './TaskElement.scss';

interface TaskElementProps {
  task: TaskInterface;
  updateTask: (updatedTask: TaskInterface) => void;
  onDeleteTask: () => void;
}

function TaskElement({ task, updateTask, onDeleteTask }: TaskElementProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<TaskInterface>(task);
  const [isChecked, setIsChecked] = useState(task.isComplete);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
    updateTask(editedTask);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTask(task);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask({ ...editedTask, title: event.target.value });
  };

  const handleCheckboxChange = () => {
    const updatedTask = { ...task, isComplete: !task.isComplete };
    setIsChecked(!isChecked);
    updateTask(updatedTask);
  };

  const handleDeleteClick = () => {
    onDeleteTask();
  };

  return (
    <div className={`task-container ${task.isComplete ? 'complete' : ''}`}>
      <fieldset className="checkbox-container">
        <input
          type="checkbox"
          id={`task-${task.id}`}
          name={`task-${task.id}`}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </fieldset>
      {/* if user is editing... */}
      {isEditing ? (
        // display input field
        <input
          type="text"
          className="task-title-input"
          value={editedTask.title}
          onChange={handleTitleChange}
        />
      ) : (
        // if user is not editing: display task title
        <p className={`task-title ${task.isComplete ? 'complete' : ''}`}>
          {task.title}
        </p>
      )}
      <div className="btns-container">
        {/* if user is NOT editing and task is NOT complete, displays "update-btn" and "delete-btn" */}
        {!isEditing && !task.isComplete && (
          <>
            <button
              type="button"
              className="btn update-btn"
              onClick={handleEditClick}
            >
              ✏️
            </button>
            <button
              type="button"
              className="btn delete-btn"
              onClick={handleDeleteClick}
            >
              🗑️
            </button>
          </>
        )}
        {/* if user is NOT editing and task is complete, displays "delete-btn" only */}
        {!isEditing && task.isComplete && (
          <button
            type="button"
            className="btn delete-btn"
            onClick={handleDeleteClick}
          >
            🗑️
          </button>
        )}
        {isEditing && ( // if user is editing, displays "validate-btn" and "cancel-btn"
          <>
            <button
              type="button"
              className="btn validate-btn"
              onClick={handleSaveClick}
            >
              ✓
            </button>
            <button
              type="button"
              className="btn cancel-btn"
              onClick={handleCancelClick}
            >
              ✗
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskElement;
