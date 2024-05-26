import React from 'react';
import { TaskInterface } from '../../@types/taskData';
import TaskElement from '../TaskElement/TaskElement';

import './TasksList.scss';

interface TasksListProps {
  tasks: TaskInterface[];
  updateTask: (taskIndex: number, updatedTask: TaskInterface) => void;
  deleteTask: (taskIndex: number) => void;
}

function TasksList({ tasks, updateTask, deleteTask }: TasksListProps) {
  return (
    <div className="tasks-list-container">
      {tasks.map((task, index) => (
        <TaskElement
          key={task.id}
          task={task}
          onDeleteTask={() => deleteTask(index)}
          updateTask={(updatedTask: TaskInterface) =>
            updateTask(index, updatedTask)
          }
        />
      ))}
    </div>
  );
}

export default TasksList;
